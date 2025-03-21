"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/toaster";

interface ProviderProps {
	children: ReactNode;
}

export function Providers({ children }: ProviderProps) {
	return (
		<ThemeProvider enableSystem defaultTheme="system" attribute="class">
			{children}
			<Toaster />
		</ThemeProvider>
	);
}
