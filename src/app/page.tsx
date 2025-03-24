/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HelpCircle, Settings } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import AnalysisRequirements from "@/components/analysis-requirements";
import AudioUploader from "@/components/audio-uploader";
import ConfigModal from "@/components/config-modal";
import Logo from "@/components/logo-component";
import ProcessingStatus from "@/components/processing-status";
import ResultsDisplay from "@/components/results-display";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

// Modificar los tipos para limitar a solo OpenAI y Replicate
export type AIPlatform = "openai" | "replicate";

export interface AIConfig {
	platform: AIPlatform;
	apiKeys: {
		openai: string;
		replicate: string;
	};
}

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

export default function AudioAnalyzer() {
	const [step, setStep] = useState(1);
	const [audioFile, setAudioFile] = useState<File | null>(null);
	const [customRequirements, setCustomRequirements] = useState<string[]>([]);
	const [predefinedRequirements, setPredefinedRequirements] = useState<
		Array<{ id: string; text: string; selected: boolean }>
	>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [results, setResults] = useState<AnalysisResults | null>(null);
	const [isConfigOpen, setIsConfigOpen] = useState(false);

	const [aiConfig, setAIConfig] = useState<AIConfig>({
		platform: "openai",
		apiKeys: {
			openai: "",
			replicate: "",
		},
	});
	const { toast } = useToast();

	// Cargar requisitos predefinidos desde localStorage al iniciar
	// Cargar requisitos predefinidos y configuración de IA desde localStorage al iniciar
	useEffect(() => {
		// Cargar requisitos predefinidos
		const savedRequirements = localStorage.getItem("predefined-requirements");
		if (savedRequirements) {
			try {
				const parsedRequirements = JSON.parse(savedRequirements);
				setPredefinedRequirements(parsedRequirements);
			} catch (e) {
				console.error("Error al cargar requisitos predefinidos:", e);
				initializeDefaultRequirements();
			}
		} else {
			initializeDefaultRequirements();
		}

		// Cargar configuración de IA
		const savedAIConfig = localStorage.getItem("ai-config");
		if (savedAIConfig) {
			try {
				const parsedConfig = JSON.parse(savedAIConfig);
				setAIConfig(parsedConfig);
			} catch (e) {
				console.error("Error al cargar configuración de IA:", e);
			}
		}

		// Cargar API keys (para compatibilidad con versiones anteriores)
		const openaiKey = localStorage.getItem("openai-api-key");
		if (openaiKey && !savedAIConfig) {
			setAIConfig((prev) => ({
				...prev,
				apiKeys: {
					...prev.apiKeys,
					openai: openaiKey,
				},
			}));
		}
	}, []);

	const initializeDefaultRequirements = () => {
		const defaultRequirements = [
			{
				id: "prohibited",
				text: "Identificar palabras prohibidas",
				selected: false,
			},
			{
				id: "clientName",
				text: "Detectar si el agente mencionó el nombre del cliente",
				selected: false,
			},
			{
				id: "objections",
				text: "Verificar si el cliente presentó objeciones",
				selected: false,
			},
			{
				id: "discount",
				text: "Identificar si el agente ofreció un descuento",
				selected: false,
			},
			{
				id: "tone",
				text: "Analizar el tono emocional de la llamada",
				selected: false,
			},
		];
		setPredefinedRequirements(defaultRequirements);
		localStorage.setItem(
			"predefined-requirements",
			JSON.stringify(defaultRequirements)
		);
	};

	const saveRequirements = (
		requirements: Array<{ id: string; text: string; selected: boolean }>
	) => {
		setPredefinedRequirements(requirements);
		localStorage.setItem(
			"predefined-requirements",
			JSON.stringify(requirements)
		);
	};

	const saveAIConfig = (config: AIConfig) => {
		setAIConfig(config);
		localStorage.setItem("ai-config", JSON.stringify(config));
	};

	const handleFileAccepted = (file: File) => {
		setAudioFile(file);
		setStep(2);
	};

	const handleRequirementsSubmit = () => {
		const currentPlatform = aiConfig.platform;
		const apiKey = aiConfig.apiKeys[currentPlatform];

		if (!apiKey) {
			toast({
				title: `API Key de ${getPlatformName(currentPlatform)} no configurada`,
				description: `Por favor, configura tu API Key de ${getPlatformName(currentPlatform)} antes de continuar.`,
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

	const getPlatformName = (platform: AIPlatform): string => {
		return platform === "openai" ? "OpenAI" : "Replicate";
	};

	const processAudio = async (userApiKey: string) => {
		try {
			setIsLoading(true);

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
			formData.append("platform", aiConfig.platform);

			//print all the form data attributes
			console.info("form data attributes: ", formData);

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
			setError((error as Error).message);
			toast({
				title: "Error",
				description: (error as Error).message,
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleReset = () => {
		setAudioFile(null);
		setStep(1);
		setResults(null);
		setIsLoading(false);
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

	const handleBack = () => {
		if (step === 1) return;
		if (step === 4) {
			setResults(null);
			setStep(2);
		} else {
			setStep(step - 1);
		}
		setError(null);
		setIsLoading(false);
	};

	return (
		<main className="container mx-auto max-w-4xl px-4 py-8">
			<div className="mb-8 flex items-center justify-between">
				<Logo />
				<div className="flex items-center gap-2">
					<Link href="/help">
						<Button variant="outline" size="icon" aria-label="Ayuda">
							<HelpCircle className="size-5" />
						</Button>
					</Link>
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
						isLoading={isLoading}
						error={error}
						onBack={handleBack}
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
				aiConfig={aiConfig}
				setAIConfig={saveAIConfig}
				isOpen={isConfigOpen}
				onClose={() => setIsConfigOpen(false)}
				predefinedRequirements={predefinedRequirements}
				setPredefinedRequirements={saveRequirements}
			/>
		</main>
	);
}
