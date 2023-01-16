import { Breakpoints } from "../src/components/utils/breakpoints";
import { Footer } from "../src/components/layout/footer";
import { Header } from "../src/components/header/header";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="de" className="antialiased">
			<head>
				<title>Luke Stahl</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width" />
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
				</div>
			</body>
		</html>
	);
}
