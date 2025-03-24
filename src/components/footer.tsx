import Link from "next/link";
import { Github, Globe, Linkedin, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Footer() {
	return (
		<footer className="border-t py-6 md:py-8">
			<div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
				<div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-2">
					<p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
						&copy; {new Date().getFullYear()}. Made with{" "}
						<span role="img" aria-label="love">
							❤️
						</span>{" "}
						by{" "}
						<Link
							href="https://ahmedglez.com/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Ahmed González
						</Link>
					</p>
				</div>
				<div className="flex gap-2">
					<Button variant="ghost" size="icon" asChild aria-label="GitHub">
						<Link
							href="https://github.com/ahmedglez"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Github className="size-4" />
						</Link>
					</Button>
					<Button variant="ghost" size="icon" asChild aria-label="LinkedIn">
						<Link
							href="https://www.linkedin.com/in/ahmedglez/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Linkedin className="size-4" />
						</Link>
					</Button>
					<Button variant="ghost" size="icon" asChild aria-label="Sitio web">
						<Link
							href="https://ahmedglez.com/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Globe className="size-4" />
						</Link>
					</Button>
					<Button variant="ghost" size="icon" asChild aria-label="Email">
						<Link href="mailto:ahmediglez@gmail.com">
							<Mail className="size-4" />
						</Link>
					</Button>
				</div>
			</div>
		</footer>
	);
}
