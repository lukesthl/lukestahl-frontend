import { useEffect, useState } from "react";

export const useTheme = () => {
	const [theme, setTheme] = useState<"dark" | "light" | null>(null);
	useEffect(() => {
		const updateTheme = () => {
			const themeStorage =
				typeof window !== "undefined" && (window.localStorage.getItem("theme") as "dark" | "light" | null);
			const theme = themeStorage ? themeStorage : "light";
			setTheme(theme);
		};
		window.addEventListener("storage", () => {
			updateTheme();
		});
		updateTheme();

		return () => {
			window.removeEventListener("storage", () => {
				updateTheme();
			});
		};
	}, []);

	return { theme };
};
