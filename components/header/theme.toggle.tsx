"use client";
import React from "react";
import { Button } from "../ui/button";
import { MoonIcon } from "../icons/moon.icon";
import { SunIcon } from "../icons/sun.icon";

export const ThemeToggle = () => {
	const toggleTheme = () => {
		let isDarkMode = document.documentElement.classList.toggle("dark");
		window.localStorage.setItem("theme", isDarkMode ? "dark" : "light");
		window.dispatchEvent(new Event("storage"));
	};
	return (
		<Button aria-label="Toggle dark mode" onClick={() => toggleTheme()}>
			<SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-primary-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-primary-600" />
			<MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-primary-500" />
		</Button>
	);
};
