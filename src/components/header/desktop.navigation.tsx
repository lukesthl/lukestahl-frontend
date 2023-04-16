import clsx from "clsx";
import Link from "next/link";
import { translate } from "../utils/translation";
import { navItems } from "./navitems";

export const DesktopNavigation = ({
	className,
	currentPath,
	...props
}: React.ComponentProps<"nav"> & { currentPath: string }) => (
	<nav className={clsx("flex justify-center", className)} {...props}>
		<ul className="text-zinc800 flex rounded-full bg-white/90 px-3 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
			{navItems
				.filter(navItem => !navItem.footerOnly)
				.map(item => (
					<Link
						key={item.href}
						href={item.href}
						className={clsx("px-4 py-2.5 transition", {
							"text-primary-500 hover:text-primary-500/80": currentPath === item.href,
							"hover:text-primary-500": currentPath !== item.href,
						})}
					>
						{translate(item.key)}
					</Link>
				))}
		</ul>
	</nav>
);
