import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { Header } from "./header";
import { Footer } from "./footer";
import { Breakpoints } from "./breakpoints";
import "./globals.css";
import { initTheme } from "./theme.script";

const url = new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `${process.env.PUBLIC_URL}`);
const images = [
	{
		url: `${url.toString()}/og?title=${encodeURIComponent(
			"Frontend / App Entwickler, Video- und Hobby-Fotograf."
		)}&description=${encodeURIComponent("Ich bin Luke, Frontend Entwickler für Web und Mobile Apps")}`,
		width: 1200,
		height: 630,
		alt: "Luke Stahl Website",
	},
];
export const metadata: Metadata = {
	title: {
		template: "%s | Luke Stahl",
		default: "Luke Stahl",
	},
	description: "Frontend Entwickler aus Bamberg",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
		{ media: "(prefers-color-scheme: dark)", color: "#000" },
	],
	openGraph: {
		title: "Luke Stahl",
		description: "Frontend Entwickler aus Bamberg",
		url: `${url.toString()}`,
		siteName: "Luke Stahl Website",
		locale: "de_DE",
		type: "website",
		images,
	},
	twitter: {
		title: "Luke Stahl",
		card: "summary_large_image",
		creator: "@lukesthl",
		images,
		description: "Frontend Entwickler aus Bamberg",
	},
	alternates: {
		types: {
			// See the RSS Feed section for more details
			"application/rss+xml": `${url.toString()}/feed.xml`,
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
				</div>
			</body>
		</html>
	);
}
