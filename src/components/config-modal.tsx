"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Key, Save, Trash } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ConfigModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ConfigModal({ isOpen, onClose }: ConfigModalProps) {
	const [apiKey, setApiKey] = useState("");
	const [showApiKey, setShowApiKey] = useState(false);
	const [hasExistingKey, setHasExistingKey] = useState(false);
	const { toast } = useToast();

	useEffect(() => {
		const storedKey = localStorage.getItem("openai-api-key");
		if (storedKey) {
			setApiKey(storedKey);
			setHasExistingKey(true);
		}
	}, []);

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

		onClose();
	};

	const deleteApiKey = () => {
		localStorage.removeItem("openai-api-key");
		setApiKey("");
		setHasExistingKey(false);

		toast({
			title: "API Key eliminada",
			description: "Tu API Key de OpenAI ha sido eliminada.",
		});
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Configuración de API Key</DialogTitle>
					<DialogDescription>
						Ingresa tu API Key de OpenAI para utilizar el servicio de análisis
						de audio.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6 py-4">
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
				</div>

				<div className="flex justify-between">
					{hasExistingKey && (
						<Button variant="outline" onClick={deleteApiKey} className="gap-1">
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
				</div>
			</DialogContent>
		</Dialog>
	);
}
