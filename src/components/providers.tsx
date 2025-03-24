"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

interface ProviderProps {
	children: ReactNode;
}

export function Providers({ children }: ProviderProps) {
	return (
		<ThemeProvider enableSystem defaultTheme="system" attribute="class">
			<TooltipProvider>
				{children}
				<Toaster />
			</TooltipProvider>
		</ThemeProvider>
	);
}
