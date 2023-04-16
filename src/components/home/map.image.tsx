"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export const MapImage = () => {
	const [theme, setTheme] = useState<string | null>(null);

	useEffect(() => {
		const updateImages = () => {
			const themeStorage = typeof window !== "undefined" && window.localStorage.getItem("theme");
			const theme = themeStorage ? themeStorage : "light";
			setTheme(theme);
		};
		window.addEventListener("storage", () => {
			updateImages();
		});
		updateImages();

		return () => {
			window.removeEventListener("storage", () => {
				updateImages();
			});
		};
	}, []);
	return !theme ? (
		<div className="absolute inset-0 h-full w-full object-cover bg-zinc-100 dark:bg-zinc-800"></div>
	) : (
		<Image
			src={`/map/snapshot.png?theme=${theme}`}
			className="h-full w-full bg-black object-cover object-center"
			alt="TODO"
			width={680}
			height={400}
		/>
	);
};
