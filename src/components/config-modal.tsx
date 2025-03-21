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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
}

export default function ConfigModal({
	isOpen,
	onClose,
	predefinedRequirements,
	setPredefinedRequirements,
}: ConfigModalProps) {
	const [apiKey, setApiKey] = useState("");
	const [showApiKey, setShowApiKey] = useState(false);
	const [hasExistingKey, setHasExistingKey] = useState(false);
	const [activeTab, setActiveTab] = useState("api-key");

	// Estado para edición de requisitos
	const [requirements, setRequirements] = useState<
		Array<{ id: string; text: string; selected: boolean }>
	>([]);
	const [newRequirement, setNewRequirement] = useState("");
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editingText, setEditingText] = useState("");

	const { toast } = useToast();

	// Cargar datos al abrir el modal
	useEffect(() => {
		if (isOpen) {
			// Cargar API Key
			const storedKey = localStorage.getItem("openai-api-key");
			if (storedKey) {
				setApiKey(storedKey);
				setHasExistingKey(true);
			}

			// Cargar requisitos
			setRequirements([...predefinedRequirements]);
		}
	}, [isOpen, predefinedRequirements]);

	// Guardar API Key
	const saveApiKey = () => {
		if (!apiKey.trim()) {
			toast({
				title: "Error",
				description: "Por favor, ingresa una API Key válida.",
				variant: "destructive",
			});
			return;
		}

		localStorage.setItem("openai-api-key", apiKey);
		setHasExistingKey(true);

		toast({
			title: "API Key guardada",
			description: "Tu API Key de OpenAI ha sido guardada correctamente.",
		});

		if (activeTab === "api-key") {
			onClose();
		}
	};

	// Eliminar API Key
	const deleteApiKey = () => {
		localStorage.removeItem("openai-api-key");
		setApiKey("");
		setHasExistingKey(false);

		toast({
			title: "API Key eliminada",
			description: "Tu API Key de OpenAI ha sido eliminada.",
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

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Configuración</DialogTitle>
					<DialogDescription>
						Configura tu API Key y requisitos de análisis predefinidos.
					</DialogDescription>
				</DialogHeader>

				<Tabs defaultValue="api-key" onValueChange={handleTabChange}>
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="api-key">API Key</TabsTrigger>
						<TabsTrigger value="requirements">Requisitos</TabsTrigger>
					</TabsList>

					<TabsContent value="api-key" className="space-y-6 py-4">
						<div className="space-y-2">
							<Label htmlFor="api-key">API Key de OpenAI</Label>
							<div className="flex">
								<div className="relative flex-1">
									<Input
										id="api-key"
										type={showApiKey ? "text" : "password"}
										placeholder="sk-..."
										value={apiKey}
										onChange={(e) => setApiKey(e.target.value)}
										className="pr-10"
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="absolute right-0 top-0 h-full"
										onClick={() => setShowApiKey(!showApiKey)}
									>
										{showApiKey ? (
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
										href="https://platform.openai.com/api-keys"
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary hover:underline"
									>
										platform.openai.com/api-keys
									</a>
								</span>
							</div>
						</div>

						<DialogFooter className="flex justify-between">
							{hasExistingKey && (
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
								<Button onClick={saveApiKey} className="gap-1">
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
