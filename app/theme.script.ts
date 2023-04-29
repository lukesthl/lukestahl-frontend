export const initTheme = function () {
	let darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	let isSystemDarkMode = darkModeMediaQuery.matches;
	let isDarkMode = window.localStorage.theme === "dark" || (!("theme" in window.localStorage) && isSystemDarkMode);
	window.localStorage.theme = isDarkMode ? "dark" : "light";
	if (isDarkMode) {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
	}
};
