"use client";

import { useEffect, useState } from "react";
import {
	Brain,
	CheckCircle2,
	FileText,
	Loader2,
	AudioWaveformIcon as Waveform,
} from "lucide-react";

import { Progress } from "@/components/ui/progress";

interface ProcessingStatusProps {
	status: string;
}

export default function ProcessingStatus({ status }: ProcessingStatusProps) {
	const [transcriptionProgress, setTranscriptionProgress] = useState(0);
	const [analysisProgress, setAnalysisProgress] = useState(0);
	const [summaryProgress, setSummaryProgress] = useState(0);
	const [statusMessages, setStatusMessages] = useState<string[]>([]);
	const [elapsedTime, setElapsedTime] = useState(0);

	// Simulate realistic progress updates
	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (status === "transcribing") {
			// Reset progress when starting
			setTranscriptionProgress(0);
			setAnalysisProgress(0);
			setSummaryProgress(0);
			setStatusMessages([]);
			setElapsedTime(0);

			// Update elapsed time
			interval = setInterval(() => {
				setElapsedTime((prev) => prev + 1);
			}, 1000);

			// Simulate transcription progress (takes ~15 seconds)
			const transcriptionInterval = setInterval(() => {
				setTranscriptionProgress((prev) => {
					if (prev >= 100) {
						clearInterval(transcriptionInterval);
						return 100;
					}
					return prev + 100 / 15;
				});

				// Add status messages at specific points
				if (transcriptionProgress === 0) {
					setStatusMessages((prev) => [
						...prev,
						"Iniciando procesamiento del audio...",
					]);
				} else if (transcriptionProgress > 20 && transcriptionProgress < 25) {
					setStatusMessages((prev) => [
						...prev,
						"Convirtiendo audio a formato compatible...",
					]);
				} else if (transcriptionProgress > 50 && transcriptionProgress < 55) {
					setStatusMessages((prev) => [
						...prev,
						"Aplicando reducción de ruido...",
					]);
				} else if (transcriptionProgress > 80 && transcriptionProgress < 85) {
					setStatusMessages((prev) => [
						...prev,
						"Transcribiendo conversación...",
					]);
				}
			}, 1000);

			return () => {
				clearInterval(transcriptionInterval);
				clearInterval(interval);
			};
		} else if (status === "analyzing") {
			// Set transcription to complete
			setTranscriptionProgress(100);

			// Simulate analysis progress (takes ~20 seconds)
			const analysisInterval = setInterval(() => {
				setAnalysisProgress((prev) => {
					if (prev >= 100) {
						clearInterval(analysisInterval);
						return 100;
					}
					return prev + 100 / 20;
				});

				// Add status messages at specific points
				if (analysisProgress === 0) {
					setStatusMessages((prev) => [
						...prev,
						"Iniciando análisis de la transcripción...",
					]);
				} else if (analysisProgress > 15 && analysisProgress < 20) {
					setStatusMessages((prev) => [
						...prev,
						"Identificando entidades y palabras clave...",
					]);
				} else if (analysisProgress > 30 && analysisProgress < 35) {
					setStatusMessages((prev) => [
						...prev,
						"Analizando tono emocional de la conversación...",
					]);
				} else if (analysisProgress > 50 && analysisProgress < 55) {
					setStatusMessages((prev) => [
						...prev,
						"Evaluando cumplimiento de requisitos...",
					]);
				} else if (analysisProgress > 70 && analysisProgress < 75) {
					setStatusMessages((prev) => [
						...prev,
						"Procesando requisitos personalizados...",
					]);
				} else if (analysisProgress > 90 && analysisProgress < 95) {
					setStatusMessages((prev) => [
						...prev,
						"Finalizando análisis detallado...",
					]);
				}
			}, 1000);

			// Update elapsed time
			interval = setInterval(() => {
				setElapsedTime((prev) => prev + 1);
			}, 1000);

			return () => {
				clearInterval(analysisInterval);
				clearInterval(interval);
			};
		} else if (status === "summarizing") {
			// Set analysis to complete
			setAnalysisProgress(100);

			// Simulate summary progress (takes ~5 seconds)
			const summaryInterval = setInterval(() => {
				setSummaryProgress((prev) => {
					if (prev >= 100) {
						clearInterval(summaryInterval);
						return 100;
					}
					return prev + 100 / 5;
				});

				// Add status messages at specific points
				if (summaryProgress === 0) {
					setStatusMessages((prev) => [
						...prev,
						"Generando resumen ejecutivo...",
					]);
				} else if (summaryProgress > 40 && summaryProgress < 45) {
					setStatusMessages((prev) => [
						...prev,
						"Compilando hallazgos principales...",
					]);
				} else if (summaryProgress > 80 && summaryProgress < 85) {
					setStatusMessages((prev) => [
						...prev,
						"Preparando resultados finales...",
					]);
				}
			}, 1000);

			// Update elapsed time
			interval = setInterval(() => {
				setElapsedTime((prev) => prev + 1);
			}, 1000);

			return () => {
				clearInterval(summaryInterval);
				clearInterval(interval);
			};
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [status, transcriptionProgress, analysisProgress, summaryProgress]);

	// Format elapsed time as mm:ss
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	return (
		<div className="flex flex-col items-center justify-center py-8">
			<h2 className="mb-6 text-2xl font-semibold">Procesando audio</h2>

			<div className="w-full max-w-md space-y-8">
				{/* Transcription step */}
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							{transcriptionProgress < 100 && status === "transcribing" ? (
								<div className="relative">
									<Waveform className="size-5 animate-pulse text-primary" />
									<span className="absolute -right-1 -top-1 size-2 animate-ping rounded-full bg-primary" />
								</div>
							) : transcriptionProgress === 100 ? (
								<CheckCircle2 className="size-5 text-green-500" />
							) : (
								<div className="size-5 rounded-full border-2 border-muted" />
							)}
							<span className="font-medium">Transcribiendo audio</span>
						</div>
						{transcriptionProgress > 0 && (
							<span className="text-sm text-muted-foreground">
								{transcriptionProgress < 100
									? `${Math.round(transcriptionProgress)}%`
									: "Completado"}
							</span>
						)}
					</div>
					{transcriptionProgress > 0 && (
						<Progress value={transcriptionProgress} className="h-2" />
					)}
				</div>

				{/* Analysis step */}
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							{analysisProgress < 100 && status === "analyzing" ? (
								<div className="relative">
									<Brain className="size-5 animate-pulse text-primary" />
									<span className="absolute -right-1 -top-1 size-2 animate-ping rounded-full bg-primary" />
								</div>
							) : analysisProgress === 100 ? (
								<CheckCircle2 className="size-5 text-green-500" />
							) : (
								<div className="size-5 rounded-full border-2 border-muted" />
							)}
							<span className="font-medium">Analizando requisitos</span>
						</div>
						{analysisProgress > 0 && (
							<span className="text-sm text-muted-foreground">
								{analysisProgress < 100
									? `${Math.round(analysisProgress)}%`
									: "Completado"}
							</span>
						)}
					</div>
					{analysisProgress > 0 && (
						<Progress value={analysisProgress} className="h-2" />
					)}
				</div>

				{/* Summary step */}
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							{summaryProgress < 100 && status === "summarizing" ? (
								<div className="relative">
									<FileText className="size-5 animate-pulse text-primary" />
									<span className="absolute -right-1 -top-1 size-2 animate-ping rounded-full bg-primary" />
								</div>
							) : summaryProgress === 100 ? (
								<CheckCircle2 className="size-5 text-green-500" />
							) : (
								<div className="size-5 rounded-full border-2 border-muted" />
							)}
							<span className="font-medium">Generando resumen</span>
						</div>
						{summaryProgress > 0 && (
							<span className="text-sm text-muted-foreground">
								{summaryProgress < 100
									? `${Math.round(summaryProgress)}%`
									: "Completado"}
							</span>
						)}
					</div>
					{summaryProgress > 0 && (
						<Progress value={summaryProgress} className="h-2" />
					)}
				</div>
			</div>

			{/* Status log */}
			<div className="mt-8 w-full max-w-md">
				<div className="mb-2 flex items-center justify-between">
					<h3 className="text-sm font-medium">Registro de actividad</h3>
					<div className="flex items-center gap-1.5">
						<Loader2 className="size-3 animate-spin text-primary" />
						<span className="text-xs text-muted-foreground">
							Tiempo transcurrido: {formatTime(elapsedTime)}
						</span>
					</div>
				</div>
				<div className="h-[180px] overflow-y-auto rounded-md bg-muted p-3 text-sm">
					<div className="space-y-2">
						{statusMessages.map((message, index) => (
							<div key={index} className="flex items-start gap-2">
								<span className="mt-0.5 text-xs text-muted-foreground">
									{formatTime(Math.min(index * 3 + 2, elapsedTime))}
								</span>
								<span>{message}</span>
							</div>
						))}
						{statusMessages.length === 0 && (
							<div className="italic text-muted-foreground">
								Iniciando procesamiento...
							</div>
						)}
						{status === "analyzing" && analysisProgress > 50 && (
							<div className="mt-4 text-xs text-muted-foreground">
								El análisis de requisitos personalizados puede tomar más tiempo
								dependiendo de la complejidad.
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="mt-8 max-w-md text-center">
				<p className="text-sm text-muted-foreground">
					El procesamiento completo toma aproximadamente 40 segundos. Por favor,
					no cierres esta ventana.
				</p>
			</div>
		</div>
	);
}
