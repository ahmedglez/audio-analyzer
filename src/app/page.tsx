"use client";

import { useState } from "react";
import { Settings } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import AnalysisRequirements from "@/components/analysis-requirements";
import AudioUploader from "@/components/audio-uploader";
import ConfigModal from "@/components/config-modal";
import ProcessingStatus from "@/components/processing-status";
import ResultsDisplay from "@/components/results-display";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function AudioAnalyzer() {
	const [step, setStep] = useState(1);
	const [audioFile, setAudioFile] = useState<File | null>(null);
	const [predefinedRequirements, setPredefinedRequirements] = useState<
		Array<{ id: string; text: string; selected: boolean }>
	>([
		{
			id: "prohibited",
			text: "Identificar palabras prohibidas",
			selected: true,
		},
		{
			id: "clientName",
			text: "Detectar si el agente mencionó el nombre del cliente",
			selected: true,
		},
		{
			id: "objections",
			text: "Verificar si el cliente presentó objeciones",
			selected: true,
		},
		{
			id: "discount",
			text: "Identificar si el agente ofreció un descuento",
			selected: true,
		},
		{
			id: "tone",
			text: "Analizar el tono emocional de la llamada",
			selected: true,
		},
	]);
	const [customRequirements, setCustomRequirements] = useState<string[]>([]);
	const [processingStatus, setProcessingStatus] = useState<string>("");
	interface AnalysisResults {
		transcription: string;
		analysis: {
			prohibitedWords: string[];
			mentionedClientName: boolean;
			clientObjections: string[];
			offeredDiscount: boolean;
			emotionalTone: string;
			customAnalysis: Array<{
				requirement: string;
				result: string;
			}>;
		};
		summary: string;
	}

	const [results, setResults] = useState<AnalysisResults | null>(null);
	const [isConfigOpen, setIsConfigOpen] = useState(false);
	const { toast } = useToast();

	const handleFileAccepted = (file: File) => {
		setAudioFile(file);
		setStep(2);
	};

	const handleRequirementsSubmit = () => {
		const apiKey = localStorage.getItem("openai-api-key");

		if (!apiKey) {
			toast({
				title: "API Key no configurada",
				description:
					"Por favor, configura tu API Key de OpenAI antes de continuar.",
				variant: "destructive",
			});
			setIsConfigOpen(true);
			return;
		}

		// Check if at least one requirement is selected
		const hasSelectedRequirement =
			predefinedRequirements.some((req) => req.selected) ||
			customRequirements.length > 0;

		if (!hasSelectedRequirement) {
			toast({
				title: "Sin requisitos seleccionados",
				description:
					"Por favor, selecciona al menos un requisito para analizar.",
				variant: "destructive",
			});
			return;
		}

		setStep(3);
		processAudio(apiKey);
	};

	const processAudio = async (userApiKey: string) => {
		try {
			setProcessingStatus("transcribing");

			const formData = new FormData();
			if (audioFile) formData.append("audio", audioFile);
			formData.append("apiKey", userApiKey);
			formData.append(
				"requirements",
				JSON.stringify([
					...predefinedRequirements
						.filter((req) => req.selected)
						.map((req) => req.text),
					...customRequirements,
				])
			);

			const response = await fetch("/api/analyze-audio", {
				method: "POST",
				body: formData,
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Error al procesar el audio");
			}

			setResults(data);
			setStep(4);
		} catch (error) {
			setProcessingStatus("error");
			toast({
				title: "Error",
				description: (error as Error).message,
				variant: "destructive",
			});
		}
	};

	const handleReset = () => {
		setAudioFile(null);
		setStep(1);
		setResults(null);
		setProcessingStatus("");
	};

	const downloadReport = () => {
		if (!results) return;

		const reportContent = `
REPORTE DE ANÁLISIS DE AUDIO
============================
Fecha: ${new Date().toLocaleDateString()}

TRANSCRIPCIÓN:
${results.transcription}

ANÁLISIS:
- Palabras prohibidas: ${results.analysis.prohibitedWords.join(", ")}
- Mención del nombre del cliente: ${results.analysis.mentionedClientName ? "Sí" : "No"}
- Objeciones del cliente: ${results.analysis.clientObjections.join(", ")}
- Ofrecimiento de descuento: ${results.analysis.offeredDiscount ? "Sí" : "No"}
- Tono emocional: ${results.analysis.emotionalTone}

RESUMEN:
${results.summary}
    `;

		const blob = new Blob([reportContent], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `analisis-audio-${new Date().getTime()}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);

		toast({
			title: "Reporte descargado",
			description: "El reporte ha sido descargado exitosamente.",
		});
	};

	return (
		<main className="container mx-auto max-w-4xl px-4 py-8">
			<div className="mb-8 flex items-center justify-between">
				<h1 className="text-3xl font-bold">Analizador de Calidad de Audio</h1>
				<div className="flex items-center gap-2">
					<ThemeToggle />
					<Button
						variant="outline"
						size="icon"
						onClick={() => setIsConfigOpen(true)}
						aria-label="Configuración"
					>
						<Settings className="size-5" />
					</Button>
				</div>
			</div>

			<div className="rounded-lg border bg-background p-6 shadow-sm">
				{step === 1 && <AudioUploader onFileAccepted={handleFileAccepted} />}

				{step === 2 && (
					<AnalysisRequirements
						predefinedRequirements={predefinedRequirements}
						setPredefinedRequirements={setPredefinedRequirements}
						customRequirements={customRequirements}
						setCustomRequirements={setCustomRequirements}
						onSubmit={handleRequirementsSubmit}
						fileName={audioFile?.name || ""}
					/>
				)}

				{step === 3 && (
					<ProcessingStatus
						status={processingStatus}
						error={processingError}
						progress={progress}
						statusMessages={statusMessages}
						elapsedTime={elapsedTime}
						onRetry={handleRetry}
						onCancel={handleReset}
					/>
				)}

				{step === 4 && results && (
					<ResultsDisplay
						results={results}
						onReset={handleReset}
						onDownload={downloadReport}
					/>
				)}
			</div>

			<ConfigModal
				isOpen={isConfigOpen}
				onClose={() => setIsConfigOpen(false)}
			/>
		</main>
	);
}
