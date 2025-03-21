"use client";

import type React from "react";
import { useState } from "react";
import { FileAudio, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AnalysisRequirementsProps {
	predefinedRequirements: Array<{
		id: string;
		text: string;
		selected: boolean;
	}>;
	setPredefinedRequirements: (
		reqs: Array<{ id: string; text: string; selected: boolean }>
	) => void;
	customRequirements: string[];
	setCustomRequirements: (reqs: string[]) => void;
	onSubmit: () => void;
	fileName: string;
}

export default function AnalysisRequirements({
	predefinedRequirements,
	setPredefinedRequirements,
	customRequirements,
	setCustomRequirements,
	onSubmit,
	fileName,
}: AnalysisRequirementsProps) {
	const [newRequirement, setNewRequirement] = useState("");
	const [suggestedRequirements, setSuggestedRequirements] = useState([
		"Verificar si el agente siguió el guión establecido",
		"Analizar si se resolvió el problema del cliente",
		"Detectar si el agente ofreció productos adicionales",
		"Evaluar la claridad de la comunicación",
		"Identificar si se siguió el protocolo de despedida",
	]);

	const togglePredefinedRequirement = (id: string) => {
		setPredefinedRequirements(
			predefinedRequirements.map((req) =>
				req.id === id ? { ...req, selected: !req.selected } : req
			)
		);
	};

	const addCustomRequirement = () => {
		if (newRequirement.trim() === "") return;

		setCustomRequirements([...customRequirements, newRequirement]);
		setNewRequirement("");
	};

	const addSuggestedRequirement = (requirement: string) => {
		if (customRequirements.includes(requirement)) return;

		setCustomRequirements([...customRequirements, requirement]);
		setSuggestedRequirements(
			suggestedRequirements.filter((req) => req !== requirement)
		);
	};

	const removeCustomRequirement = (index: number) => {
		const updated = [...customRequirements];
		updated.splice(index, 1);
		setCustomRequirements(updated);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && e.ctrlKey) {
			e.preventDefault();
			addCustomRequirement();
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-3 text-muted-foreground">
				<FileAudio className="size-5" />
				<span className="font-medium">{fileName}</span>
			</div>

			<div>
				<h2 className="mb-4 text-2xl font-semibold">
					Selecciona los requisitos de análisis
				</h2>

				<div className="mb-6 space-y-3">
					{predefinedRequirements.map((req) => (
						<div key={req.id} className="flex items-start space-x-2">
							<Checkbox
								id={`req-${req.id}`}
								checked={req.selected}
								onCheckedChange={() => togglePredefinedRequirement(req.id)}
							/>
							<Label
								htmlFor={`req-${req.id}`}
								className="cursor-pointer text-base leading-relaxed"
							>
								{req.text}
							</Label>
						</div>
					))}
				</div>

				<div className="space-y-4">
					<h3 className="text-lg font-medium">Requisitos personalizados</h3>

					<div className="space-y-2">
						<Label htmlFor="custom-requirement">
							Describe en detalle lo que deseas analizar:
						</Label>
						<Textarea
							id="custom-requirement"
							placeholder="Escribe requisitos personalizados detallados para el análisis..."
							value={newRequirement}
							onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
								setNewRequirement(e.target.value)
							}
							onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) =>
								handleKeyDown(e)
							}
							className="min-h-[120px] resize-y"
						/>
						<p className="mt-1 text-xs text-muted-foreground">
							Presiona Ctrl+Enter para añadir o usa el botón de abajo
						</p>
						<Button
							onClick={addCustomRequirement}
							variant="outline"
							className="mt-2"
							disabled={newRequirement.trim() === ""}
						>
							<Plus className="mr-2 size-4" />
							Añadir requisito personalizado
						</Button>
					</div>

					{customRequirements.length > 0 && (
						<div className="mt-4 space-y-3">
							<h4 className="text-sm font-medium">Requisitos añadidos:</h4>
							<div className="space-y-2">
								{customRequirements.map((req, index) => (
									<div
										key={index}
										className="flex items-start justify-between rounded-md bg-muted p-3"
									>
										<div className="whitespace-pre-line pr-2 text-sm">
											{req}
										</div>
										<Button
											variant="ghost"
											size="icon"
											className="mt-0.5 size-7 shrink-0"
											onClick={() => removeCustomRequirement(index)}
										>
											<X className="size-4" />
										</Button>
									</div>
								))}
							</div>
						</div>
					)}

					{suggestedRequirements.length > 0 && (
						<div className="mt-4">
							<h4 className="mb-2 text-sm font-medium">
								Sugerencias de requisitos
							</h4>
							<div className="flex flex-wrap gap-2">
								{suggestedRequirements.map((req, index) => (
									<Button
										key={index}
										variant="outline"
										size="sm"
										className="text-xs"
										onClick={() => addSuggestedRequirement(req)}
									>
										<Plus className="mr-1 size-3" />
										{req}
									</Button>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="flex justify-end pt-4">
				<Button onClick={onSubmit}>Analizar audio</Button>
			</div>
		</div>
	);
}
