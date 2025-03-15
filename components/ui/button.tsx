import clsx from "clsx";
import React from "react";

export const Button = ({ className, children, ...props }: React.ComponentProps<"button">) => (
	<button
		type="button"
		className={clsx(
			"group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20",
			className
		)}
		{...props}
	>
		{children}
	</button>
);
