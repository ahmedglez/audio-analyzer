"use client";

import { useState } from "react";
import Link from "next/link";
import {
	AlertTriangle,
	CheckCircle,
	ChevronLeft,
	Code,
	Info,
	Mail,
	Settings,
	Zap,
} from "lucide-react";

import { DeveloperInfo } from "@/components/developer-info";
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
						Esta es una herramienta versátil diseñada para procesar y analizar
						cualquier tipo de grabación de audio
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">
						Esta aplicación utiliza inteligencia artificial para transcribir y
						analizar archivos de audio según los requisitos específicos que
						definas. Aunque surgió como una necesidad para evaluar llamadas de
						atención al cliente, se ha desarrollado para ser una herramienta
						flexible que puede analizar cualquier tipo de audio y responder a
						preguntas personalizadas. Puedes elegir entre OpenAI o Replicate
						como motor de IA.
					</p>
				</CardContent>
			</Card>

			<Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
				<TabsList className="mb-4 flex w-full  justify-start overflow-x-auto whitespace-nowrap">
					<TabsTrigger value="inicio" className="shrink-0">
						Inicio rápido
					</TabsTrigger>
					<TabsTrigger value="configuracion" className="shrink-0">
						Configuración
					</TabsTrigger>
					<TabsTrigger value="analisis" className="shrink-0">
						Análisis
					</TabsTrigger>
					<TabsTrigger value="faq" className="shrink-0">
						Preguntas frecuentes
					</TabsTrigger>
					<TabsTrigger value="desarrollador" className="shrink-0">
						Desarrollador
					</TabsTrigger>
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
										Detecta si se utilizaron palabras o frases específicas que
										podrías querer monitorear.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-2">
								<CheckCircle className="mt-0.5 size-5 text-green-500" />
								<div>
									<p className="font-medium">Detectar menciones de nombres</p>
									<p className="text-sm text-muted-foreground">
										Verifica si se mencionaron nombres específicos durante la
										grabación.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-2">
								<CheckCircle className="mt-0.5 size-5 text-green-500" />
								<div>
									<p className="font-medium">
										Verificar objeciones o preocupaciones
									</p>
									<p className="text-sm text-muted-foreground">
										Identifica objeciones, preocupaciones o puntos de fricción
										expresados durante la conversación.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-2">
								<CheckCircle className="mt-0.5 size-5 text-green-500" />
								<div>
									<p className="font-medium">
										Identificar ofertas o propuestas
									</p>
									<p className="text-sm text-muted-foreground">
										Detecta si se ofrecieron descuentos, propuestas o soluciones
										específicas.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-2">
								<CheckCircle className="mt-0.5 size-5 text-green-500" />
								<div>
									<p className="font-medium">Analizar el tono emocional</p>
									<p className="text-sm text-muted-foreground">
										Evalúa el tono emocional general y cómo evolucionó durante
										la grabación.
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
									Analiza los principales temas tratados en esta entrevista y
									resúmelos
								</li>
								<li>
									Identifica las ideas clave presentadas en esta conferencia
								</li>
								<li>
									Evalúa la claridad de la explicación y el uso de lenguaje
									técnico
								</li>
								<li>
									Extrae las preguntas realizadas durante la sesión y cómo
									fueron respondidas
								</li>
								<li>
									Analiza si el orador siguió una estructura lógica en su
									presentación
								</li>
								<li>
									Identifica las emociones predominantes expresadas por los
									participantes
								</li>
								<li>
									Para llamadas de servicio: Verifica si se siguió el protocolo
									establecido
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
										para análisis detallados de conversaciones y contenido
										general en español. Es la opción predeterminada recomendada
										para la mayoría de los casos.
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

						<AccordionItem value="item-8">
							<AccordionTrigger>
								¿Para qué otros usos puedo utilizar esta herramienta?
							</AccordionTrigger>
							<AccordionContent>
								<p className="mb-2">
									Aunque la herramienta se desarrolló inicialmente para evaluar
									llamadas de atención al cliente, puede utilizarse para
									diversos propósitos:
								</p>
								<ul className="list-disc space-y-1 pl-5">
									<li>
										Análisis de entrevistas (periodísticas, de trabajo,
										académicas)
									</li>
									<li>Evaluación de presentaciones y conferencias</li>
									<li>Análisis de podcasts y contenido de audio</li>
									<li>Transcripción y análisis de reuniones</li>
									<li>Estudio de discursos y debates</li>
									<li>Evaluación de material educativo en formato audio</li>
									<li>Análisis de testimonios o relatos personales</li>
								</ul>
								<p className="mt-2">
									La clave está en definir requisitos personalizados relevantes
									para tu caso específico.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</TabsContent>

				<TabsContent value="desarrollador" className="space-y-6">
					<h2 className="mb-4 text-2xl font-semibold">
						Sobre el desarrollador
					</h2>

					<DeveloperInfo />

					<div className="mt-8 space-y-4">
						<h3 className="text-xl font-medium">Historia del proyecto</h3>
						<p className="text-muted-foreground">
							Esta heramienta comenzó como un proyecto para resolver una
							necesidad específica: evaluar la calidad de las llamadas de
							atención al cliente de manera eficiente y objetiva. Con el tiempo,
							me di cuenta de que la misma tecnología podía aplicarse a una
							variedad mucho más amplia de casos de uso.
						</p>

						<p className="text-muted-foreground">
							La herramienta ha evolucionado para ser una solución versátil que
							puede analizar cualquier tipo de contenido de audio, desde
							entrevistas y podcasts hasta conferencias y material educativo. El
							enfoque en requisitos personalizables permite que cada usuario
							adapte el análisis a sus necesidades específicas.
						</p>

						<div className="mt-4 flex items-start gap-3 rounded-md bg-muted/50 p-4">
							<Code className="mt-0.5 size-5 shrink-0 text-blue-500" />
							<div>
								<p className="font-medium">Tecnologías utilizadas</p>
								<p className="text-sm text-muted-foreground">
									Esta aplicación está construida con Next.js, React, Tailwind
									CSS y shadcn/ui para el frontend. Para el procesamiento de
									audio y análisis de IA, se integra con las APIs de OpenAI y
									Replicate.
								</p>
							</div>
						</div>
					</div>

					<div className="mt-6 border-t pt-6">
						<h3 className="mb-4 text-xl font-medium">
							Contratación y servicios
						</h3>
						<p className="mb-4 text-muted-foreground">
							¿Necesitas una solución personalizada para el análisis de audio o
							contenido? ¿O quizás estás buscando un desarrollador para tu
							próximo proyecto? Estoy disponible para:
						</p>

						<ul className="mb-6 list-disc space-y-2 pl-5 text-muted-foreground">
							<li>Desarrollo de aplicaciones web y móviles</li>
							<li>Integración de soluciones de IA en productos existentes</li>
							<li>
								Consultoría en proyectos de análisis de datos y procesamiento de
								lenguaje natural
							</li>
							<li>
								Personalización de esta herramienta para necesidades específicas
								de tu empresa
							</li>
						</ul>

						<div className="flex justify-center">
							<Button asChild className="gap-2">
								<Link href="mailto:tu@email.com">
									<Mail className="size-4" />
									<span>Contactar para servicios profesionales</span>
								</Link>
							</Button>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</main>
	);
}
