"use client";

import { useCallback, useState } from "react";
import { AlertCircle, Upload } from "lucide-react";
import type { FileRejection } from "react-dropzone";
import { useDropzone } from "react-dropzone";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface AudioUploaderProps {
	onFileAccepted: (file: File) => void;
}

export default function AudioUploader({ onFileAccepted }: AudioUploaderProps) {
	const [error, setError] = useState<string | null>(null);

	const onDrop = useCallback(
		(acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
			if (rejectedFiles.length > 0) {
				setError("Por favor, sube un archivo de audio válido (MP3, WAV, MP4).");
				return;
			}

			if (acceptedFiles.length === 0) {
				return;
			}

			const file = acceptedFiles[0];

			// Check file size (max 20MB)
			if (file.size > 20 * 1024 * 1024) {
				setError("El archivo es demasiado grande. El tamaño máximo es 20MB.");
				return;
			}

			setError(null);
			onFileAccepted(file);
		},
		[onFileAccepted]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"audio/*": [".mp3", ".wav", ".m4a", ".mp4", ".ogg"],
		},
		maxFiles: 1,
	});

	return (
		<div className="space-y-6">
			<div className="text-center">
				<h2 className="mb-2 text-2xl font-semibold">
					Carga tu archivo de audio
				</h2>
				<p className="text-muted-foreground">
					Arrastra y suelta tu archivo o haz clic para seleccionarlo
				</p>
			</div>

			<div
				{...getRootProps()}
				className={`cursor-pointer rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
					isDragActive
						? "border-primary bg-primary/5"
						: "border-muted-foreground/20 hover:border-primary/50"
				}`}
			>
				<input {...getInputProps()} />
				<Upload className="mx-auto mb-4 size-12 text-muted-foreground" />
				<p className="text-lg font-medium">
					{isDragActive
						? "Suelta el archivo aquí"
						: "Arrastra un archivo de audio o haz clic"}
				</p>
				<p className="mt-2 text-sm text-muted-foreground">
					Formatos soportados: MP3, WAV, MP4, M4A, OGG (máx. 20MB)
				</p>
			</div>

			{error && (
				<Alert variant="destructive">
					<AlertCircle className="size-4" />
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			<div className="text-center">
				<Button
					onClick={() =>
						document
							.querySelector<HTMLInputElement>('input[type="file"]')
							?.click()
					}
					variant="outline"
				>
					Seleccionar archivo
				</Button>
			</div>
		</div>
	);
}
