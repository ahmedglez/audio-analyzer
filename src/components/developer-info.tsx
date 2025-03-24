/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Coffee, Github, Globe, Linkedin, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function DeveloperInfo() {
	return (
		<Card className="border-primary/20">
			<CardHeader className="pb-3">
				<CardTitle className="text-xl">Acerca del desarrollador</CardTitle>
				<CardDescription>
					Conoce más sobre quién está detrás de esta herramienta
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
					<div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
						<img
							src="https://avatars.githubusercontent.com/u/69789480?v=4"
							alt="Ahmed González"
							className="rounded-full"
							width="64"
							height="64"
						/>
					</div>
					<div>
						<h3 className="text-lg font-medium">Ahmed González</h3>
						<p className="text-sm text-muted-foreground">
							Desarrollador Full Stack
						</p>
						<div className="mt-2 flex flex-wrap gap-2">
							<Badge variant="outline">React</Badge>
							<Badge variant="outline">Next.js</Badge>
							<Badge variant="outline">IA</Badge>
							<Badge variant="outline">UX/UI</Badge>
						</div>
					</div>
				</div>

				<div className="text-sm text-muted-foreground">
					<p>
						Soy un desarrollador apasionado por crear herramientas que combinen
						la potencia de la IA con interfaces intuitivas. Esta herramienta
						nació como un proyecto para resolver necesidades reales de análisis
						de conversaciones, y ha evolucionado para ser una herramienta
						versátil para cualquier tipo de contenido de audio.
					</p>
				</div>

				<div className="flex flex-wrap gap-2 pt-2">
					<Button variant="outline" size="sm" asChild className="gap-1">
						<Link
							href="https://github.com/ahmedglez"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Github className="mr-1 size-4" />
							GitHub
						</Link>
					</Button>
					<Button variant="outline" size="sm" asChild className="gap-1">
						<Link
							href="https://www.linkedin.com/in/ahmedglez/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Linkedin className="mr-1 size-4" />
							LinkedIn
						</Link>
					</Button>
					<Button variant="outline" size="sm" asChild className="gap-1">
						<Link
							href="https://www.ahmedglez.com/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Globe className="mr-1 size-4" />
							Portfolio
						</Link>
					</Button>
					<Button variant="outline" size="sm" asChild className="gap-1">
						<Link href="mailto:ahmediglez@gmail.com">
							<Mail className="mr-1 size-4" />
							Contacto
						</Link>
					</Button>
				</div>

				<div className="mt-4 border-t pt-4">
					<Button variant="default" asChild className="w-full gap-2">
						<Link
							href="https://ko-fi.com/ahmedglez"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Coffee className="size-4" />
							<span>Invítame a un café</span>
						</Link>
					</Button>
					<p className="mt-2 text-center text-xs text-muted-foreground">
						Si encuentras útil esta herramienta, considera apoyar su desarrollo
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
