import clsx from "clsx";
import Link from "next/link";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { translate } from "../utils/translation";
import { navItems } from "./navitems";
import { useState } from "react";

export const DesktopNavigation = ({
	className,
	currentPath,
	...props
}: React.ComponentProps<typeof motion.nav> & { currentPath: string }) => {
	const { scrollYProgress } = useScroll();

	const [visible, setVisible] = useState(true);

	useMotionValueEvent(scrollYProgress, "change", current => {
		// Check if current is not undefined and is a number
		if (typeof current === "number") {
			let direction = current! - scrollYProgress.getPrevious()!;

			if (scrollYProgress.get() < 0.1) {
				setVisible(false);
			} else {
				setVisible(true);
			}
		}
	});

	return (
		<AnimatePresence mode="wait">
			<motion.nav
				className={clsx("flex justify-center z-50", className)}
				layout
				style={{
					position: visible ? "fixed" : "relative",
				}}
				transition={{
					duration: 0.2,
				}}
				{...props}
			>
				<ul className="text-zinc-800 flex rounded-full bg-white/80 px-3 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/40 dark:text-zinc-200 dark:ring-white/10">
					{navItems
						.filter(navItem => !navItem.footerOnly)
						.map(item => (
							<li className="px-4 py-2.5" key={item.href}>
								<Link
									href={item.href}
									className={clsx("transition", {
										"text-primary-500 hover:text-primary-500/80": currentPath === item.href,
										"hover:text-primary-500": currentPath !== item.href,
									})}
								>
									{translate(item.key)}
								</Link>
							</li>
						))}
				</ul>
			</motion.nav>
		</AnimatePresence>
	);
};
