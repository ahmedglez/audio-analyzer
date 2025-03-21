"use client";

import {
	AlertTriangle,
	Brain,
	CheckCircle2,
	FileText,
	Loader2,
	AudioWaveformIcon as Waveform,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ProcessingStatusProps {
	status: string;
	error?: string | null;
	progress: {
		transcription: number;
		analysis: number;
		summary: number;
	};
	statusMessages: string[];
	elapsedTime: number;
	onRetry?: () => void;
	onCancel?: () => void;
}

export default function ProcessingStatus({
	status,
	error,
	progress,
	statusMessages,
	elapsedTime,
	onRetry,
	onCancel,
}: ProcessingStatusProps) {
	// Format elapsed time as mm:ss
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	// If there's an error, show error state
	if (status === "error") {
		return (
			<div className="flex flex-col items-center justify-center py-8">
				<h2 className="mb-6 text-2xl font-semibold">Error de procesamiento</h2>

				<Alert variant="destructive" className="mb-6 max-w-md">
					<AlertTriangle className="size-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						{error ||
							"Ha ocurrido un error durante el procesamiento del audio."}
					</AlertDescription>
				</Alert>

				<div className="w-full max-w-md space-y-8">
					{/* Status log with error information */}
					<div className="mt-4 w-full">
						<h3 className="mb-2 text-sm font-medium">Registro de actividad</h3>
						<div className="h-[180px] overflow-y-auto rounded-md bg-muted p-3 text-sm">
							<div className="space-y-2">
								{statusMessages.map((message, index) => (
									<div key={index} className="flex items-start gap-2">
										<span className="mt-0.5 text-xs text-muted-foreground">
											{formatTime(Math.min(index * 3 + 2, elapsedTime))}
										</span>
										<span
											className={
												message.startsWith("Error") ? "text-destructive" : ""
											}
										>
											{message}
										</span>
									</div>
								))}
								{statusMessages.length === 0 && (
									<div className="italic text-muted-foreground">
										No hay información disponible
									</div>
								)}
							</div>
						</div>
					</div>

					<div className="mt-6 flex justify-center gap-4">
						{onRetry && (
							<Button onClick={onRetry} className="gap-2">
								<Loader2 className="mr-2 size-4" />
								Reintentar
							</Button>
						)}
						{onCancel && (
							<Button variant="outline" onClick={onCancel}>
								Volver
							</Button>
						)}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center py-8">
			<h2 className="mb-6 text-2xl font-semibold">Procesando audio</h2>

			<div className="w-full max-w-md space-y-8">
				{/* Transcription step */}
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							{progress.transcription < 100 && status === "transcribing" ? (
								<div className="relative">
									<Waveform className="size-5 animate-pulse text-primary" />
									<span className="absolute -right-1 -top-1 size-2 animate-ping rounded-full bg-primary" />
								</div>
							) : progress.transcription === 100 ? (
								<CheckCircle2 className="size-5 text-green-500" />
							) : (
								<div className="size-5 rounded-full border-2 border-muted" />
							)}
							<span className="font-medium">Transcribiendo audio</span>
						</div>
						{progress.transcription > 0 && (
							<span className="text-sm text-muted-foreground">
								{progress.transcription < 100
									? `${Math.round(progress.transcription)}%`
									: "Completado"}
							</span>
						)}
					</div>
					{progress.transcription > 0 && (
						<Progress value={progress.transcription} className="h-2" />
					)}
				</div>

				{/* Analysis step */}
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							{progress.analysis < 100 && status === "analyzing" ? (
								<div className="relative">
									<Brain className="size-5 animate-pulse text-primary" />
									<span className="absolute -right-1 -top-1 size-2 animate-ping rounded-full bg-primary" />
								</div>
							) : progress.analysis === 100 ? (
								<CheckCircle2 className="size-5 text-green-500" />
							) : (
								<div className="size-5 rounded-full border-2 border-muted" />
							)}
							<span className="font-medium">Analizando requisitos</span>
						</div>
						{progress.analysis > 0 && (
							<span className="text-sm text-muted-foreground">
								{progress.analysis < 100
									? `${Math.round(progress.analysis)}%`
									: "Completado"}
							</span>
						)}
					</div>
					{progress.analysis > 0 && (
						<Progress value={progress.analysis} className="h-2" />
					)}
				</div>

				{/* Summary step */}
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							{progress.summary < 100 && status === "summarizing" ? (
								<div className="relative">
									<FileText className="size-5 animate-pulse text-primary" />
									<span className="absolute -right-1 -top-1 size-2 animate-ping rounded-full bg-primary" />
								</div>
							) : progress.summary === 100 ? (
								<CheckCircle2 className="size-5 text-green-500" />
							) : (
								<div className="size-5 rounded-full border-2 border-muted" />
							)}
							<span className="font-medium">Generando resumen</span>
						</div>
						{progress.summary > 0 && (
							<span className="text-sm text-muted-foreground">
								{progress.summary < 100
									? `${Math.round(progress.summary)}%`
									: "Completado"}
							</span>
						)}
					</div>
					{progress.summary > 0 && (
						<Progress value={progress.summary} className="h-2" />
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
						{status === "analyzing" && progress.analysis > 50 && (
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
