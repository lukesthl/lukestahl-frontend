import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { Header } from "../src/components/header/header";
import { Footer } from "../src/components/layout/footer";
import { Breakpoints } from "../src/components/utils/breakpoints";
import "./globals.css";

export const metadata: Metadata = {
	title: "Luke Stahl - Frontend Entwickler",
	description: "Frontend Entwickler aus Bamberg",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="de" className="antialiased">
			<head>
				<script
					defer
					id="theme-script"
					dangerouslySetInnerHTML={{
						__html: `
							let darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
							let isSystemDarkMode = darkModeMediaQuery.matches;
							let isDarkMode =
								window.localStorage.theme === "dark" || (!("theme" in window.localStorage) && isSystemDarkMode);
							window.localStorage.theme = isDarkMode ? "dark" : "light";
							if (isDarkMode) {
								document.documentElement.classList.add("dark");
							} else {
								document.documentElement.classList.remove("dark");
							}
					`,
					}}
				></script>
			</head>
			<body className="flex h-full flex-col bg-zinc-50 dark:bg-black">
				<div className="fixed inset-0 flex justify-center sm:px-8">
					<div className="flex w-full max-w-7xl lg:px-8">
						<div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
					</div>
				</div>
				<div className="relative">
					<Header />
					<main>{children}</main>
					<Footer />
					<Breakpoints />
					<Analytics />
				</div>
			</body>
		</html>
	);
}
