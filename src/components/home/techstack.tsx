"use client";
import clsx from "clsx";
import React from "react";
import { Tooltip } from "react-tooltip";
import LightroomLogo from "../../../public/assets/logos/adobe-lightroom.svg";
import PhotoshopLogo from "../../../public/assets/logos/adobe-photoshop.svg";
import PremiereLogo from "../../../public/assets/logos/adobe-premiere.svg";
import AdobeXDLogo from "../../../public/assets/logos/adobe-xd.svg";
import DockerLogo from "../../../public/assets/logos/docker-icon.svg";
import MobXLogo from "../../../public/assets/logos/mobx.svg";
import NextJSLogo from "../../../public/assets/logos/nextjs-icon.svg";
import NodeJSLogo from "../../../public/assets/logos/nodejs-icon.svg";
import ReactLogo from "../../../public/assets/logos/react.svg";
import TailwindCSSLogo from "../../../public/assets/logos/tailwindcss-icon.svg";
import TypescriptLogo from "../../../public/assets/logos/typescript-icon-round.svg";
import { translate } from "../translation";
import "react-tooltip/dist/react-tooltip.css";

const stack = [
	{
		key: 1,
		name: "Next.js",
		logo: NextJSLogo,
		square: false,
	},
	{
		key: 2,
		name: "React",
		logo: ReactLogo,
		square: false,
	},
	{
		key: 3,
		name: "Tailwind CSS",
		logo: TailwindCSSLogo,
		square: false,
	},
	{
		key: 4,
		name: "Node.js",
		logo: NodeJSLogo,
		square: false,
	},
	{
		key: 5,
		name: "Typescript",
		logo: TypescriptLogo,
		square: false,
	},
	{
		key: 6,
		name: "Docker",
		logo: DockerLogo,
		square: false,
	},
	{
		key: 7,
		name: "MobX",
		logo: MobXLogo,
		square: true,
	},
	{
		key: 8,
		name: "Adobe Lightroom",
		logo: LightroomLogo,
		square: true,
	},
	{
		key: 9,
		name: "Adobe XD",
		logo: AdobeXDLogo,
		square: true,
	},
	{
		key: 10,
		name: "Adobe Premiere",
		logo: PremiereLogo,
		square: true,
	},
	{
		key: 11,
		name: "Adobe Photoshop",
		logo: PhotoshopLogo,
		square: true,
	},
];

export const TechStack = () => (
	<div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
		<div className="flex items-center gap-2">
			<StackIcon className="h-[1.65rem] w-[1.65rem]" />
			<p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{translate("home.resume.techstack")}</p>
		</div>
		<div className="mt-5 flex flex-wrap justify-center gap-2 sm:gap-4">
			{stack.map(({ logo: Logo, ...stackItem }) => (
				<div
					className="rounded-full bg-white/90 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
					data-padding={"6px"}
					id={`stack-tooltip-${stackItem.key}`}
					key={stackItem.key}
				>
					<Logo
						className={clsx({
							"m-[8px] h-7 w-7": stackItem.square,
							"m-[6px] h-8 w-8": !stackItem.square,
						})}
						alt={stackItem.name}
					/>
					<Tooltip place="top" content={stackItem.name} anchorId={`stack-tooltip-${stackItem.key}`} />
				</div>
			))}
		</div>
	</div>
);

const StackIcon = (props: React.ComponentProps<"svg">) => (
	<svg viewBox="0 0 22.073 21.896" {...props}>
		<g transform="translate(-1030.501 -975.711)">
			<path
				d="M0,0,4.074.586,3.083-2.9l3.554.326-1.224-2.8L13.629-4.36l2.6,7.454L13.694,2.7l.759,3.834-3.334-.654.807,3.774L10.646,9.62,3.692,7.912Z"
				transform="translate(1033.884 990.102) rotate(-39)"
				className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
			/>
			<path
				d="M5.786,8.6,2.25,10.5l3.536,1.9m0-3.808,1.607.865L10.5,11.135,15.214,8.6m-9.428,0L2.25,6.692,10.5,2.25l8.25,4.442L15.214,8.6m0,0,3.536,1.9-3.536,1.9m0,0,3.536,1.9L10.5,18.75,2.25,14.308l3.536-1.9m9.428,0L10.5,14.942,5.786,12.4"
				transform="translate(1031.25 975.5)"
				fill="none"
				className="stroke-zinc-400 dark:stroke-zinc-500"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
			/>
		</g>
	</svg>
);
