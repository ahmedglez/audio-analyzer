"use client";

import { useEffect, useState } from "react";
import { Edit2, Eye, EyeOff, Key, Plus, Save, Trash, X } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Modificar la importación del tipo AIPlatform
import type { AIConfig, AIPlatform } from "@/app/page";

interface ConfigModalProps {
	isOpen: boolean;
	onClose: () => void;
	predefinedRequirements: Array<{
		id: string;
		text: string;
		selected: boolean;
	}>;
	setPredefinedRequirements: (
		requirements: Array<{ id: string; text: string; selected: boolean }>
	) => void;
	aiConfig: AIConfig;
	setAIConfig: (config: AIConfig) => void;
}

export default function ConfigModal({
	isOpen,
	onClose,
	predefinedRequirements,
	setPredefinedRequirements,
	aiConfig,
	setAIConfig,
}: ConfigModalProps) {
	// Estado para requisitos
	const [requirements, setRequirements] = useState<
		Array<{ id: string; text: string; selected: boolean }>
	>([]);
	const [newRequirement, setNewRequirement] = useState("");
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editingText, setEditingText] = useState("");

	// Estado para configuración de IA
	const [selectedPlatform, setSelectedPlatform] = useState<AIPlatform>(
		aiConfig.platform
	);
	// Actualizar el estado de apiKeys para incluir solo OpenAI y Replicate
	const [apiKeys, setApiKeys] = useState({
		openai: aiConfig.apiKeys.openai || "",
		replicate: aiConfig.apiKeys.replicate || "",
	});

	// Actualizar el estado de showApiKey
	const [showApiKey, setShowApiKey] = useState({
		openai: false,
		replicate: false,
	});

	const [activeTab, setActiveTab] = useState("ai-platform");

	const { toast } = useToast();

	// Cargar datos al abrir el modal
	useEffect(() => {
		if (isOpen) {
			// Cargar requisitos
			setRequirements([...predefinedRequirements]);

			// Cargar configuración de IA
			setSelectedPlatform(aiConfig.platform);
			setApiKeys({
				openai: aiConfig.apiKeys.openai || "",
				replicate: aiConfig.apiKeys.replicate || "",
			});
		}
	}, [isOpen, predefinedRequirements, aiConfig]);

	// Guardar configuración de IA
	const saveAIConfig = () => {
		const currentKey = apiKeys[selectedPlatform];

		if (!currentKey.trim()) {
			toast({
				title: "Error",
				description: `Por favor, ingresa una API Key válida para ${getPlatformName(selectedPlatform)}.`,
				variant: "destructive",
			});
			return;
		}

		const newConfig: AIConfig = {
			platform: selectedPlatform,
			apiKeys: apiKeys,
		};

		setAIConfig(newConfig);

		// Para compatibilidad con versiones anteriores
		if (selectedPlatform === "openai") {
			localStorage.setItem("openai-api-key", apiKeys.openai);
		}

		toast({
			title: "Configuración guardada",
			description: `La configuración de ${getPlatformName(selectedPlatform)} ha sido guardada correctamente.`,
		});

		if (activeTab === "ai-platform") {
			onClose();
		}
	};

	// Eliminar API Key de la plataforma seleccionada
	const deleteApiKey = () => {
		const updatedApiKeys = { ...apiKeys };
		updatedApiKeys[selectedPlatform] = "";

		setApiKeys(updatedApiKeys);

		if (selectedPlatform === "openai") {
			localStorage.removeItem("openai-api-key");
		}

		toast({
			title: "API Key eliminada",
			description: `La API Key de ${getPlatformName(selectedPlatform)} ha sido eliminada.`,
		});
	};

	// Añadir nuevo requisito
	const addRequirement = () => {
		if (!newRequirement.trim()) return;

		const newId = `req-${Date.now()}`;
		const updatedRequirements = [
			...requirements,
			{ id: newId, text: newRequirement, selected: false },
		];

		setRequirements(updatedRequirements);
		setNewRequirement("");
	};

	// Eliminar requisito
	const deleteRequirement = (id: string) => {
		const updatedRequirements = requirements.filter((req) => req.id !== id);
		setRequirements(updatedRequirements);

		if (editingId === id) {
			setEditingId(null);
			setEditingText("");
		}
	};

	// Iniciar edición de requisito
	const startEditing = (id: string, text: string) => {
		setEditingId(id);
		setEditingText(text);
	};

	// Guardar edición de requisito
	const saveEdit = () => {
		if (!editingId || !editingText.trim()) return;

		const updatedRequirements = requirements.map((req) =>
			req.id === editingId ? { ...req, text: editingText } : req
		);

		setRequirements(updatedRequirements);
		setEditingId(null);
		setEditingText("");
	};

	// Cancelar edición
	const cancelEdit = () => {
		setEditingId(null);
		setEditingText("");
	};

	// Guardar requisitos
	const saveRequirements = () => {
		setPredefinedRequirements(requirements);

		toast({
			title: "Requisitos guardados",
			description:
				"Los requisitos de análisis han sido guardados correctamente.",
		});

		if (activeTab === "requirements") {
			onClose();
		}
	};

	// Manejar cambio de pestaña
	const handleTabChange = (value: string) => {
		setActiveTab(value);
	};

	// Función para obtener el nombre legible de la plataforma
	const getPlatformName = (platform: AIPlatform): string => {
		return platform === "openai" ? "OpenAI" : "Replicate";
	};

	// Función para obtener la URL de documentación de la plataforma
	const getPlatformDocsUrl = (platform: AIPlatform): string => {
		return platform === "openai"
			? "https://platform.openai.com/api-keys"
			: "https://replicate.com/account/api-tokens";
	};

	// Función para obtener el placeholder de la API key
	const getApiKeyPlaceholder = (platform: AIPlatform): string => {
		return platform === "openai" ? "sk-..." : "r8_...";
	};

	// Función para alternar la visibilidad de la API key
	const toggleApiKeyVisibility = (platform: AIPlatform) => {
		setShowApiKey((prev) => ({
			...prev,
			[platform]: !prev[platform],
		}));
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Configuración</DialogTitle>
					<DialogDescription>
						Configura la plataforma de IA, API Keys y requisitos de análisis.
					</DialogDescription>
				</DialogHeader>

				<Tabs defaultValue="ai-platform" onValueChange={handleTabChange}>
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="ai-platform">Plataforma IA</TabsTrigger>
						<TabsTrigger value="requirements">Requisitos</TabsTrigger>
					</TabsList>

					<TabsContent value="ai-platform" className="space-y-6 py-4">
						<div className="space-y-4">
							{/* Reemplazar la sección de selección de plataforma en el TabsContent de "ai-platform" */}
							<div>
								<Label className="text-base font-medium">
									Selecciona la plataforma de IA
								</Label>
								<RadioGroup
									value={selectedPlatform}
									onValueChange={(value) =>
										setSelectedPlatform(value as AIPlatform)
									}
									className="mt-2 space-y-2"
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="openai" id="openai" />
										<Label htmlFor="openai" className="cursor-pointer">
											OpenAI (GPT-4, GPT-3.5)
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="replicate" id="replicate" />
										<Label htmlFor="replicate" className="cursor-pointer">
											Replicate (Llama, Claude, etc.)
										</Label>
									</div>
								</RadioGroup>
							</div>

							<div className="space-y-2 pt-2">
								<Label
									htmlFor={`${selectedPlatform}-api-key`}
									className="text-base font-medium"
								>
									API Key de {getPlatformName(selectedPlatform)}
								</Label>
								<div className="flex">
									<div className="relative flex-1">
										<Input
											id={`${selectedPlatform}-api-key`}
											type={showApiKey[selectedPlatform] ? "text" : "password"}
											placeholder={getApiKeyPlaceholder(selectedPlatform)}
											value={apiKeys[selectedPlatform]}
											onChange={(e) =>
												setApiKeys({
													...apiKeys,
													[selectedPlatform]: e.target.value,
												})
											}
											className="pr-10"
										/>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="absolute right-0 top-0 h-full"
											onClick={() => toggleApiKeyVisibility(selectedPlatform)}
										>
											{showApiKey[selectedPlatform] ? (
												<EyeOff className="size-4" />
											) : (
												<Eye className="size-4" />
											)}
										</Button>
									</div>
								</div>
								<p className="text-sm text-muted-foreground">
									Tu API Key se almacenará localmente en tu navegador y no será
									compartida.
								</p>
							</div>

							<div className="flex flex-col space-y-2">
								<div className="flex items-center text-sm text-muted-foreground">
									<Key className="mr-2 size-4" />
									<span>
										Puedes obtener tu API Key en{" "}
										<a
											href={getPlatformDocsUrl(selectedPlatform)}
											target="_blank"
											rel="noopener noreferrer"
											className="text-primary hover:underline"
										>
											{getPlatformDocsUrl(selectedPlatform)}
										</a>
									</span>
								</div>
							</div>
						</div>

						<DialogFooter className="flex justify-between">
							{apiKeys[selectedPlatform] && (
								<Button
									variant="outline"
									onClick={deleteApiKey}
									className="gap-1"
								>
									<Trash className="size-4" />
									Eliminar
								</Button>
							)}
							<div className="ml-auto flex gap-2">
								<Button variant="outline" onClick={onClose}>
									Cancelar
								</Button>
								<Button onClick={saveAIConfig} className="gap-1">
									<Save className="size-4" />
									Guardar
								</Button>
							</div>
						</DialogFooter>
					</TabsContent>

					<TabsContent value="requirements" className="space-y-6 py-4">
						<div className="space-y-4">
							<div>
								<Label htmlFor="new-requirement">Añadir nuevo requisito</Label>
								<div className="mt-1 flex">
									<Input
										id="new-requirement"
										placeholder="Escribe un nuevo requisito de análisis..."
										value={newRequirement}
										onChange={(e) => setNewRequirement(e.target.value)}
										className="flex-1"
									/>
									<Button
										onClick={addRequirement}
										disabled={!newRequirement.trim()}
										className="ml-2"
									>
										<Plus className="size-4" />
									</Button>
								</div>
							</div>

							<div className="space-y-2">
								<Label>Requisitos predefinidos</Label>
								{requirements.length === 0 ? (
									<p className="py-2 text-sm text-muted-foreground">
										No hay requisitos predefinidos. Añade algunos para facilitar
										tus análisis.
									</p>
								) : (
									<div className="max-h-[300px] space-y-2 overflow-y-auto pr-2">
										{requirements.map((req) => (
											<div
												key={req.id}
												className="flex items-center justify-between rounded-md border p-2"
											>
												{editingId === req.id ? (
													<div className="flex flex-1 items-center gap-2">
														<Input
															value={editingText}
															onChange={(e) => setEditingText(e.target.value)}
															className="flex-1"
															autoFocus
														/>
														<div className="flex gap-1">
															<Button
																size="sm"
																variant="ghost"
																onClick={saveEdit}
															>
																<Save className="size-4" />
															</Button>
															<Button
																size="sm"
																variant="ghost"
																onClick={cancelEdit}
															>
																<X className="size-4" />
															</Button>
														</div>
													</div>
												) : (
													<>
														<div className="flex flex-1 items-center gap-2">
															<Checkbox
																id={`config-${req.id}`}
																checked={req.selected}
																onCheckedChange={(checked) => {
																	const updatedRequirements = requirements.map(
																		(r) =>
																			r.id === req.id
																				? { ...r, selected: checked === true }
																				: r
																	);
																	setRequirements(updatedRequirements);
																}}
															/>
															<Label
																htmlFor={`config-${req.id}`}
																className="flex-1 cursor-pointer"
															>
																{req.text}
															</Label>
														</div>
														<div className="flex gap-1">
															<Button
																size="sm"
																variant="ghost"
																onClick={() => startEditing(req.id, req.text)}
															>
																<Edit2 className="size-4" />
															</Button>
															<Button
																size="sm"
																variant="ghost"
																onClick={() => deleteRequirement(req.id)}
															>
																<Trash className="size-4" />
															</Button>
														</div>
													</>
												)}
											</div>
										))}
									</div>
								)}
							</div>
						</div>

						<DialogFooter>
							<div className="ml-auto flex gap-2">
								<Button variant="outline" onClick={onClose}>
									Cancelar
								</Button>
								<Button onClick={saveRequirements} className="gap-1">
									<Save className="size-4" />
									Guardar requisitos
								</Button>
							</div>
						</DialogFooter>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
