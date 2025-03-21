"use client";

import { AlertTriangle, Loader2 } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ProcessingStatusProps {
	isLoading: boolean;
	error: string | null;
	onBack: () => void;
}

export default function ProcessingStatus({
	isLoading,
	error,
	onBack,
}: ProcessingStatusProps) {
	// Si hay un error, mostrar estado de error
	if (error) {
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

				<div className="mt-6 flex justify-center">
					<Button variant="outline" onClick={onBack}>
						Volver
					</Button>
				</div>
			</div>
		);
	}

	// Estado de carga
	return (
		<div className="flex flex-col items-center justify-center py-12">
			<Loader2 className="mb-6 size-12 animate-spin text-primary" />
			<h2 className="mb-4 text-2xl font-semibold">Procesando audio</h2>
			<p className="max-w-md text-center text-muted-foreground">
				El procesamiento puede tomar aproximadamente 40 segundos. Por favor, no
				cierres esta ventana.
			</p>
		</div>
	);
}
