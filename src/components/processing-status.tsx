"use client";

import { CheckCircle2 } from "lucide-react";

interface ProcessingStatusProps {
	status: string;
}

export default function ProcessingStatus({ status }: ProcessingStatusProps) {
	return (
		<div className="flex flex-col items-center justify-center py-12">
			<h2 className="mb-8 text-2xl font-semibold">Procesando audio</h2>

			<div className="w-full max-w-md space-y-6">
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<span className="font-medium">Transcribiendo audio</span>
						{status === "transcribing" ? (
							<div className="size-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
						) : status === "analyzing" || status === "summarizing" ? (
							<CheckCircle2 className="size-5 text-green-500" />
						) : null}
					</div>
					{status === "transcribing" && (
						<div className="h-2 w-full rounded-full bg-muted">
							<div
								className="h-2 animate-pulse rounded-full bg-primary"
								style={{ width: "30%" }}
							/>
						</div>
					)}
				</div>

				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<span className="font-medium">Analizando requisitos</span>
						{status === "analyzing" ? (
							<div className="size-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
						) : status === "summarizing" ? (
							<CheckCircle2 className="size-5 text-green-500" />
						) : null}
					</div>
					{status === "analyzing" && (
						<div className="h-2 w-full rounded-full bg-muted">
							<div
								className="h-2 animate-pulse rounded-full bg-primary"
								style={{ width: "60%" }}
							/>
						</div>
					)}
				</div>

				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<span className="font-medium">Generando resumen</span>
						{status === "summarizing" ? (
							<div className="size-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
						) : null}
					</div>
					{status === "summarizing" && (
						<div className="h-2 w-full rounded-full bg-muted">
							<div
								className="h-2 animate-pulse rounded-full bg-primary"
								style={{ width: "90%" }}
							/>
						</div>
					)}
				</div>
			</div>

			<p className="mt-8 text-muted-foreground">
				Este proceso puede tomar unos minutos dependiendo del tamaño del archivo
			</p>
		</div>
	);
}
