"use client";

import { useState } from "react";
import Link from "next/link";
import {
	AlertTriangle,
	CheckCircle,
	ChevronLeft,
	Info,
	Settings,
	Zap,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HelpPage() {
	const [activeTab, setActiveTab] = useState("inicio");

	return (
		<main className="container mx-auto max-w-4xl px-4 py-8">
			<div className="mb-8 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Link href="/">
						<Button variant="outline" size="icon" className="mr-2">
							<ChevronLeft className="size-5" />
						</Button>
					</Link>
					<h1 className="text-3xl font-bold">Guía de Uso</h1>
				</div>
				<ThemeToggle />
			</div>

			<Card className="mb-6">
				<CardHeader className="pb-3">
					<CardTitle className="flex items-center gap-2">
						<Info className="size-5 text-primary" />
						Acerca de la herramienta
					</CardTitle>
					<CardDescription>
						El Analizador de Calidad de Audio es una herramienta diseñada para
						evaluar conversaciones de servicio al cliente
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">
						Esta aplicación utiliza inteligencia artificial para transcribir y
						analizar archivos de audio, identificando aspectos clave como el
						tono emocional, objeciones del cliente, menciones de nombres, y
						otros requisitos personalizados que definas. Puedes elegir entre
						OpenAI o Replicate como motor de IA.
					</p>
				</CardContent>
			</Card>

			<Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
				<TabsList className="mb-4 grid grid-cols-4">
					<TabsTrigger value="inicio">Inicio rápido</TabsTrigger>
					<TabsTrigger value="configuracion">Configuración</TabsTrigger>
					<TabsTrigger value="analisis">Análisis</TabsTrigger>
					<TabsTrigger value="faq">Preguntas frecuentes</TabsTrigger>
				</TabsList>

				<TabsContent value="inicio" className="space-y-6">
					<h2 className="mb-4 text-2xl font-semibold">Guía de inicio rápido</h2>

					<div className="space-y-6">
						<div className="flex items-start gap-4">
							<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
								1
							</div>
							<div>
								<h3 className="mb-1 text-lg font-medium">Configurar API Key</h3>
								<p className="mb-2 text-muted-foreground">
									Haz clic en el ícono de configuración{" "}
									<Settings className="inline size-4" /> y configura tu API Key
									de OpenAI o Replicate.
								</p>
								<Card className="bg-muted/50">
									<CardContent className="p-4">
										<p className="text-sm">
											Para OpenAI: Obtén tu API Key en{" "}
											<a
												href="https://platform.openai.com/api-keys"
												target="_blank"
												rel="noopener noreferrer"
												className="text-primary hover:underline"
											>
												platform.openai.com/api-keys
											</a>
											<br />
											Para Replicate: Obtén tu API Key en{" "}
											<a
												href="https://replicate.com/account/api-tokens"
												target="_blank"
												rel="noopener noreferrer"
												className="text-primary hover:underline"
											>
												replicate.com/account/api-tokens
											</a>
										</p>
									</CardContent>
								</Card>
							</div>
						</div>

						<div className="flex items-start gap-4">
							<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
								2
							</div>
							<div>
								<h3 className="mb-1 text-lg font-medium">
									Subir archivo de audio
								</h3>
								<p className="text-muted-foreground">
									Arrastra y suelta un archivo de audio o haz clic para
									seleccionarlo. Formatos soportados: MP3, WAV, MP4, M4A, OGG
									(máx. 20MB).
								</p>
							</div>
						</div>

						<div className="flex items-start gap-4">
							<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
								3
							</div>
							<div>
								<h3 className="mb-1 text-lg font-medium">
									Seleccionar requisitos de análisis
								</h3>
								<p className="text-muted-foreground">
									Marca los requisitos predefinidos que deseas analizar y/o
									añade requisitos personalizados específicos.
								</p>
							</div>
						</div>

						<div className="flex items-start gap-4">
							<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
								4
							</div>
							<div>
								<h3 className="mb-1 text-lg font-medium">Revisar resultados</h3>
								<p className="text-muted-foreground">
									Una vez completado el análisis, revisa la transcripción, el
									análisis detallado y el resumen. Puedes descargar un reporte
									completo.
								</p>
							</div>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="configuracion" className="space-y-6">
					<h2 className="mb-4 text-2xl font-semibold">
						Configuración de la herramienta
					</h2>

					<Card className="mb-6">
						<CardHeader className="pb-3">
							<CardTitle className="text-lg">
								Plataformas de IA disponibles
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="rounded-md border p-4">
								<h3 className="mb-2 font-medium">OpenAI (Predeterminado)</h3>
								<p className="mb-2 text-sm text-muted-foreground">
									Utiliza los modelos GPT de OpenAI para el análisis. Ofrece
									excelentes resultados para análisis de conversaciones y
									detección de patrones.
								</p>
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<CheckCircle className="size-4 text-green-500" />
									<span>Recomendado para análisis detallados y precisos</span>
								</div>
							</div>

							<div className="rounded-md border p-4">
								<h3 className="mb-2 font-medium">Replicate</h3>
								<p className="mb-2 text-sm text-muted-foreground">
									Permite utilizar modelos como Llama, Claude y otros
									disponibles en Replicate. Puede ser una alternativa más
									económica.
								</p>
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<CheckCircle className="size-4 text-green-500" />
									<span>
										Útil si necesitas modelos específicos o alternativas a
										OpenAI
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<h3 className="mb-3 text-xl font-medium">
						Configuración de requisitos predefinidos
					</h3>
					<p className="mb-4 text-muted-foreground">
						Puedes personalizar los requisitos predefinidos que aparecerán en la
						pantalla de análisis. Para hacerlo:
					</p>

					<div className="mb-6 space-y-4 border-l-2 border-muted pl-4">
						<p>
							1. Haz clic en el ícono de configuración{" "}
							<Settings className="inline size-4" />
						</p>
						<p>2. Selecciona la pestaña &quot;Requisitos&quot;</p>
						<p>
							3. Añade, edita o elimina los requisitos predefinidos según tus
							necesidades
						</p>
						<p>
							4. Marca los requisitos que deseas que aparezcan seleccionados por
							defecto
						</p>
						<p>5. Haz clic en &quot;Guardar requisitos&quot;</p>
					</div>

					<div className="flex items-start gap-3 rounded-md bg-muted/50 p-4">
						<Info className="mt-0.5 size-5 shrink-0 text-blue-500" />
						<p className="text-sm">
							Los requisitos predefinidos y la configuración de la plataforma de
							IA se guardan en tu navegador. Si cambias de dispositivo o
							navegador, deberás configurarlos nuevamente.
						</p>
					</div>
				</TabsContent>

				<TabsContent value="analisis" className="space-y-6">
					<h2 className="mb-4 text-2xl font-semibold">Análisis de audio</h2>

					<h3 className="mb-3 text-xl font-medium">Requisitos de análisis</h3>
					<p className="mb-4 text-muted-foreground">
						Los requisitos de análisis determinan qué aspectos de la
						conversación serán evaluados por la IA.
					</p>

					<Card className="mb-6">
						<CardHeader className="pb-3">
							<CardTitle className="text-lg">Requisitos predefinidos</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex items-start gap-2">
								<CheckCircle className="mt-0.5 size-5 text-green-500" />
								<div>
									<p className="font-medium">Identificar palabras prohibidas</p>
									<p className="text-sm text-muted-foreground">
										Detecta si se utilizaron palabras o frases que no deberían
										usarse en conversaciones con clientes.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-2">
								<CheckCircle className="mt-0.5 size-5 text-green-500" />
								<div>
									<p className="font-medium">
										Detectar si el agente mencionó el nombre del cliente
									</p>
									<p className="text-sm text-muted-foreground">
										Verifica si el agente se dirigió al cliente por su nombre
										durante la conversación.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-2">
								<CheckCircle className="mt-0.5 size-5 text-green-500" />
								<div>
									<p className="font-medium">
										Verificar si el cliente presentó objeciones
									</p>
									<p className="text-sm text-muted-foreground">
										Identifica las objeciones o preocupaciones expresadas por el
										cliente durante la llamada.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-2">
								<CheckCircle className="mt-0.5 size-5 text-green-500" />
								<div>
									<p className="font-medium">
										Identificar si el agente ofreció un descuento
									</p>
									<p className="text-sm text-muted-foreground">
										Detecta si se ofreció algún tipo de descuento o compensación
										al cliente.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-2">
								<CheckCircle className="mt-0.5 size-5 text-green-500" />
								<div>
									<p className="font-medium">
										Analizar el tono emocional de la llamada
									</p>
									<p className="text-sm text-muted-foreground">
										Evalúa el tono emocional general de la conversación y cómo
										evolucionó durante la llamada.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<h3 className="mb-3 text-xl font-medium">
						Requisitos personalizados
					</h3>
					<p className="mb-4 text-muted-foreground">
						Además de los requisitos predefinidos, puedes añadir requisitos
						personalizados específicos para tu caso de uso.
					</p>

					<div className="mb-6 space-y-4">
						<div className="rounded-md bg-muted/50 p-4">
							<h4 className="mb-2 font-medium">
								Ejemplos de requisitos personalizados efectivos:
							</h4>
							<ul className="list-disc space-y-2 pl-5 text-sm">
								<li>
									Verificar si el agente siguió el guión establecido para este
									tipo de casos
								</li>
								<li>
									Analizar si se resolvió el problema principal del cliente al
									final de la llamada
								</li>
								<li>
									Detectar si el agente ofreció productos adicionales o
									servicios complementarios
								</li>
								<li>
									Evaluar la claridad de la comunicación y el uso de lenguaje
									técnico
								</li>
								<li>
									Identificar si se siguió el protocolo de despedida
									correctamente
								</li>
							</ul>
						</div>

						<div className="flex items-start gap-3 rounded-md border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950/30">
							<AlertTriangle className="size-5 shrink-0 text-yellow-600 dark:text-yellow-500" />
							<div>
								<p className="font-medium text-yellow-800 dark:text-yellow-400">
									Recomendaciones:
								</p>
								<p className="text-sm text-yellow-700 dark:text-yellow-500">
									Sé específico en tus requisitos personalizados. Cuanto más
									claro y detallado sea el requisito, mejores resultados
									obtendrás del análisis. Evita requisitos demasiado amplios o
									ambiguos.
								</p>
							</div>
						</div>
					</div>

					<h3 className="mb-3 text-xl font-medium">
						Interpretación de resultados
					</h3>
					<p className="mb-4 text-muted-foreground">
						Una vez completado el análisis, podrás revisar:
					</p>

					<div className="mb-4 space-y-3 border-l-2 border-muted pl-4">
						<p>
							<strong>Transcripción completa:</strong> El texto completo de la
							conversación.
						</p>
						<p>
							<strong>Análisis detallado:</strong> Resultados específicos para
							cada requisito seleccionado.
						</p>
						<p>
							<strong>Resumen:</strong> Un resumen ejecutivo de los hallazgos
							principales.
						</p>
					</div>

					<div className="flex items-start gap-3 rounded-md bg-muted/50 p-4">
						<Zap className="mt-0.5 size-5 shrink-0 text-amber-500" />
						<p className="text-sm">
							Puedes descargar un reporte completo en formato de texto que
							incluye toda la información del análisis, útil para compartir con
							tu equipo o para mantener un registro histórico.
						</p>
					</div>
				</TabsContent>

				<TabsContent value="faq" className="space-y-6">
					<h2 className="mb-4 text-2xl font-semibold">Preguntas frecuentes</h2>

					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="item-1">
							<AccordionTrigger>
								¿Qué formatos de audio son compatibles?
							</AccordionTrigger>
							<AccordionContent>
								La herramienta admite los formatos de audio más comunes: MP3,
								WAV, MP4, M4A y OGG. El tamaño máximo permitido es de 20MB. Para
								archivos más grandes, considera comprimirlos o convertirlos a un
								formato más eficiente antes de subirlos.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-2">
							<AccordionTrigger>
								¿Qué plataforma de IA es mejor para mi caso?
							</AccordionTrigger>
							<AccordionContent>
								<p className="mb-2">
									La elección depende de tus necesidades específicas:
								</p>
								<ul className="list-disc space-y-1 pl-5">
									<li>
										<strong>OpenAI (GPT):</strong> Ofrece excelentes resultados
										para análisis detallados de conversaciones en español y es
										la opción predeterminada recomendada.
									</li>
									<li>
										<strong>Replicate:</strong> Proporciona acceso a modelos
										alternativos como Llama o Claude, que pueden ser útiles para
										casos específicos o si buscas una alternativa a OpenAI.
									</li>
								</ul>
								<p className="mt-2">
									Si no estás seguro, comienza con OpenAI que es la opción
									predeterminada.
								</p>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-3">
							<AccordionTrigger>
								¿Dónde se almacenan mis datos?
							</AccordionTrigger>
							<AccordionContent>
								Tus archivos de audio se procesan en el servidor pero no se
								almacenan permanentemente. Las transcripciones y análisis se
								muestran en tu navegador y puedes descargarlos como reportes. La
								configuración (API Keys, requisitos predefinidos) se guarda
								localmente en tu navegador mediante localStorage y no se
								comparte con terceros.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-4">
							<AccordionTrigger>
								¿Cuánto tiempo tarda el análisis?
							</AccordionTrigger>
							<AccordionContent>
								El tiempo de procesamiento depende de la duración del audio y la
								complejidad del análisis. En promedio, un archivo de 3-5 minutos
								tarda aproximadamente 40 segundos en procesarse completamente.
								Archivos más largos o con más requisitos personalizados pueden
								tardar más tiempo.
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-5">
							<AccordionTrigger>
								¿Puedo analizar audios en otros idiomas?
							</AccordionTrigger>
							<AccordionContent>
								Sí, la herramienta puede procesar audios en varios idiomas,
								aunque está optimizada para español. Para obtener mejores
								resultados con otros idiomas, considera especificar el idioma en
								tus requisitos personalizados (por ejemplo: &quot;Analizar esta
								conversación en inglés&quot;).
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-6">
							<AccordionTrigger>
								¿Cómo puedo mejorar la precisión del análisis?
							</AccordionTrigger>
							<AccordionContent>
								<ul className="list-disc space-y-1 pl-5">
									<li>
										Utiliza archivos de audio con buena calidad y poco ruido de
										fondo
									</li>
									<li>Sé específico en tus requisitos personalizados</li>
									<li>
										Combina requisitos predefinidos y personalizados para un
										análisis más completo
									</li>
									<li>
										Para conversaciones técnicas o con terminología específica,
										considera añadir contexto en los requisitos personalizados
									</li>
									<li>
										Experimenta con diferentes plataformas de IA para ver cuál
										funciona mejor para tu caso específico
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-7">
							<AccordionTrigger>
								¿Qué hago si obtengo un error durante el procesamiento?
							</AccordionTrigger>
							<AccordionContent>
								Si encuentras un error durante el procesamiento, prueba lo
								siguiente:
								<ul className="mt-2 list-disc space-y-1 pl-5">
									<li>
										Verifica que tu API Key sea válida y esté correctamente
										configurada
									</li>
									<li>
										Comprueba que el archivo de audio no exceda los 20MB y esté
										en un formato compatible
									</li>
									<li>
										Reduce el número de requisitos personalizados si has añadido
										muchos
									</li>
									<li>
										Intenta con un archivo de audio diferente para descartar
										problemas con el archivo específico
									</li>
									<li>Actualiza la página y vuelve a intentarlo</li>
								</ul>
								Si el problema persiste, podría haber un problema con el
								servicio de IA seleccionado.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</TabsContent>
			</Tabs>
		</main>
	);
}
