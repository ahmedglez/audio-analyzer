import colors from "tailwindcss/colors";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export const shadcnPlugin = plugin(
	({ addBase, addUtilities, addComponents }) => {
		addBase({
			":root": {
				"--background": "0 0% 99.2%",
				"--foreground": "201 50% 10%",
				"--muted": "210 40% 96.1%",
				"--muted-foreground": "215.4 16.3% 46.9%",
				"--popover": "0 0% 100%",
				"--popover-foreground": "222.2 47.4% 11.2%",
				"--border": "214.3 31.8% 91.4%",
				"--input": "214.3 31.8% 88%",
				"--card": "0 0% 100%",
				"--card-foreground": "222.2 47.4% 11.2%",
				"--secondary": "210 40% 96.1%",
				"--secondary-foreground": "222 47% 11.2%",
				"--accent": "210 40% 90%",
				"--accent-foreground": "222.2 47.4% 11.2%",
				"--destructive": "0 100% 40%",
				"--ring": "215 20.2% 65.1%",
				"--radius": "0.5rem",
			},
			".dark": {
				"--background": "215 50% 8%",
				"--foreground": "213 31% 91%",
				"--muted": "223 47% 11%",
				"--muted-foreground": "215.4 16.3% 56.9%",
				"--accent": "216 34% 17%",
				"--accent-foreground": "210 40% 98%",
				"--popover": "224 71% 4%",
				"--popover-foreground": "215 20.2% 65.1%",
				"--secondary": "222.2 47.4% 11.2%",
				"--secondary-foreground": "210 40% 98%",
				"--border": "216 34% 17%",
				"--input": "216 34% 35%",
				"--card": "224 71% 4%",
				"--card-foreground": "213 31% 91%",
				"--destructive": "0 80% 40%",
				"--ring": "216 34% 25%",
				"--radius": "0.5rem",
			},
		});

		addBase({
			"*": {
				"@apply border-border": {},
			},
			body: {
				"@apply bg-background text-foreground": {},
				"font-feature-settings": `"rlig" ${1}, "calt" 1`, // This ${1} to make prettier happy
			},
		});

		addComponents({
			".flex-center": {
				display: "flex",
				"align-items": "center",
				"justify-content": "center",
			},
		});

		addUtilities({
			".text-wrap": { "text-wrap": "wrap" },
			".text-nowrap": { "text-wrap": "nowrap" },
			".text-balance": { "text-wrap": "balance" },
		});
	},
	{
		theme: {
			container: {
				center: true,
				padding: "2rem",
				screens: {
					"2xl": "1400px",
				},
			},
			extend: {
				colors: {
					border: "hsl(var(--border))",
					input: "hsl(var(--input))",
					ring: "hsl(var(--ring))",
					background: "hsl(var(--background))",
					foreground: "hsl(var(--foreground))",
					primary: {
						DEFAULT: colors.sky["600"],
						foreground: colors.sky["100"],
						...colors.sky,
					},
					secondary: {
						DEFAULT: "hsl(var(--secondary))",
						foreground: "hsl(var(--secondary-foreground))",
					},
					destructive: {
						DEFAULT: "hsl(var(--destructive))",
						foreground: colors.white,
					},
					muted: {
						DEFAULT: "hsl(var(--muted))",
						foreground: "hsl(var(--muted-foreground))",
					},
					accent: {
						DEFAULT: "hsl(var(--accent))",
						foreground: "hsl(var(--accent-foreground))",
					},
					popover: {
						DEFAULT: "hsl(var(--popover))",
						foreground: "hsl(var(--popover-foreground))",
					},
					card: {
						DEFAULT: "hsl(var(--card))",
						foreground: "hsl(var(--card-foreground))",
					},
				},
				borderRadius: {
					lg: "var(--radius)",
					md: "calc(var(--radius) - 2px)",
					sm: "calc(var(--radius) - 4px)",
				},
				fontFamily: {
					sans: ["var(--font-sans)", ...fontFamily.sans],
				},
				keyframes: {
					"accordion-down": {
						from: { height: "0" },
						to: { height: "var(--radix-accordion-content-height)" },
					},
					"accordion-up": {
						from: { height: "var(--radix-accordion-content-height)" },
						to: { height: "0" },
					},
				},
				animation: {
					"accordion-down": "accordion-down 0.2s ease-out",
					"accordion-up": "accordion-up 0.2s ease-out",
				},
			},
		},
	}
);
