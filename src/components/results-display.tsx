"use client";

import { Copy, Download, RefreshCw } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResultsDisplayProps {
	results: {
		transcription: string;
		analysis: {
			prohibitedWords: string[];
			mentionedClientName: boolean;
			clientObjections: string[];
			offeredDiscount: boolean;
			emotionalTone: string;
			customAnalysis?: Array<{
				requirement: string;
				result: string;
			}>;
		};
		summary: string;
	};
	onReset: () => void;
	onDownload: () => void;
}

export default function ResultsDisplay({
	results,
	onReset,
	onDownload,
}: ResultsDisplayProps) {
	const { toast } = useToast();

	const copyTranscription = () => {
		navigator.clipboard.writeText(results.transcription);
		toast({
			title: "Copiado al portapapeles",
			description: "La transcripción ha sido copiada al portapapeles.",
		});
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col items-center justify-between space-y-3 md:flex-row md:space-y-0">
				<h2 className="text-2xl font-semibold">Resultados del análisis</h2>
				<div className="flex gap-2">
					<Button variant="outline" onClick={onReset}>
						<RefreshCw className="mr-2 size-4" />
						Nuevo análisis
					</Button>
					<Button onClick={onDownload}>
						<Download className="mr-2 size-4" />
						Descargar reporte
					</Button>
				</div>
			</div>

			<Card className="bg-card">
				<CardHeader className="pb-3">
					<CardTitle>Resumen</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-base leading-relaxed">{results.summary}</p>
				</CardContent>
			</Card>

			<Tabs defaultValue="analysis">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="analysis">Análisis detallado</TabsTrigger>
					<TabsTrigger value="transcription">Transcripción</TabsTrigger>
				</TabsList>

				<TabsContent value="analysis" className="mt-4">
					<Card className="bg-card">
						<CardContent className="space-y-6 pt-6">
							{results.analysis.customAnalysis &&
								results.analysis.customAnalysis.length > 0 && (
									<div>
										<h3 className="mb-3 mt-6 text-lg font-medium">
											Análisis personalizados
										</h3>
										<div className="space-y-4">
											{results.analysis.customAnalysis.map((item, index) => (
												<div key={index} className="rounded-md border p-4">
													<h4 className="mb-2 text-sm font-medium text-primary">
														{item.requirement}
													</h4>
													<div className="whitespace-pre-line text-sm">
														{item.result}
													</div>
												</div>
											))}
										</div>
									</div>
								)}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="transcription" className="mt-4">
					<Card className="bg-card">
						<CardHeader className="flex flex-row items-center justify-between pb-3">
							<CardTitle>Transcripción completa</CardTitle>
							<Button
								variant="ghost"
								size="sm"
								className="h-8 gap-1"
								onClick={copyTranscription}
							>
								<Copy className="mr-1 size-4" />
								<span className="text-xs">Copiar</span>
							</Button>
						</CardHeader>
						<CardContent>
							<div className="max-h-96 overflow-y-auto whitespace-pre-line rounded-md bg-muted p-4">
								<ReactMarkdown>{results.transcription}</ReactMarkdown>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
