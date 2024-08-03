import { Popover, PopoverButton, PopoverOverlay, PopoverPanel, Transition, TransitionChild } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { translate } from "../utils/translation";
import { navItems } from "./navitems";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import clsx from "clsx";

export const MobileNavigation = ({ className }: { className: string }) => {
	const { scrollYProgress } = useScroll();

	const [visible, setVisible] = useState(false);

	useMotionValueEvent(scrollYProgress, "change", () => {
		setVisible(scrollYProgress.get() > 0.1);
	});

	return (
		<Popover className={className}>
			<AnimatePresence mode="wait">
				<motion.div
					layout
					style={{
						position: visible ? "fixed" : "relative",
					}}
					className={clsx({
						"right-1/2 left-1/2 justify-self-center transform -translate-x-1/2 z-50": visible,
					})}
					transition={{
						duration: 0.2,
					}}
				>
					<PopoverButton className="group flex h-full items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
						Menu
						<ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
					</PopoverButton>
				</motion.div>
			</AnimatePresence>
			<Transition>
				<TransitionChild
					as={Fragment}
					enter="duration-150 ease-out"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="duration-150 ease-in"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<PopoverOverlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
				</TransitionChild>
				<TransitionChild
					as={Fragment}
					enter="duration-150 ease-out"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="duration-150 ease-in"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<PopoverPanel
						focus
						className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
					>
						<div className="flex flex-row-reverse items-center justify-between">
							<PopoverButton aria-label="Close menu" className="rounded-full -m-1 p-1">
								<CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
							</PopoverButton>
							<h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Navigation</h2>
						</div>
						<nav className="mt-6">
							<ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
								{navItems
									.filter(navItem => !navItem.footerOnly)
									.map(navItem => (
										<li key={navItem.key}>
											<PopoverButton as={Link} href={navItem.href} className="block py-2">
												{translate(navItem.key)}
											</PopoverButton>
										</li>
									))}
							</ul>
						</nav>
					</PopoverPanel>
				</TransitionChild>
			</Transition>
		</Popover>
	);
};

const CloseIcon = (props: React.ComponentProps<"svg">) => {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
			<path
				d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
