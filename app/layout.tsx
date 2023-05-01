import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { translate } from "../components/utils/translation";
import { Breakpoints } from "./breakpoints";
import { Footer } from "./footer";
import "./globals.css";
import { Header } from "./header";
import { initTheme } from "./theme.script";
import Script from "next/script";

const url = new URL(`${process.env.PUBLIC_URL}`);
const images = [
	{
		url: `${url.toString()}og?title=${encodeURIComponent(translate("home.title"))}&description=${encodeURIComponent(
			translate("home.description")
		)}`,
		width: 1200,
		height: 630,
	},
];
export const metadata: Metadata = {
	title: {
		template: "%s | Luke Stahl",
		default: translate("home.meta.title"),
	},
	description: translate("home.meta.description"),
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
		{ media: "(prefers-color-scheme: dark)", color: "#000" },
	],
	openGraph: {
		title: translate("home.meta.title"),
		description: translate("home.meta.description"),
		url: `${url.toString()}`,
		siteName: "Luke Stahl Website",
		locale: "de_DE",
		type: "website",
		images,
	},
	twitter: {
		title: translate("home.meta.title"),
		card: "summary_large_image",
		creator: "@lukesthl",
		images,
		description: translate("home.meta.description"),
	},
	alternates: {
		types: {
			// See the RSS Feed section for more details
			"application/rss+xml": `${url.toString()}feed.xml`,
		},
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="de" className="antialiased" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `(${initTheme.toString()})();`,
					}}
				/>
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
					<Script data-domain="lukestahl.de" src="https://an.lukestahl.de/js/script.js" strategy="afterInteractive" />
				</div>
			</body>
		</html>
	);
}
