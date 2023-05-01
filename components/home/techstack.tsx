import clsx from "clsx";
import React from "react";
import LightroomLogo from "../../public/assets/logos/adobe-lightroom.svg";
import VSCodeLogo from "../../public/assets/logos/vscode.svg";
import PremiereLogo from "../../public/assets/logos/adobe-premiere.svg";
import AdobeXDLogo from "../../public/assets/logos/adobe-xd.svg";
import DockerLogo from "../../public/assets/logos/docker-icon.svg";
import MobXLogo from "../../public/assets/logos/mobx.svg";
import NextJSLogo from "../../public/assets/logos/nextjs-icon.svg";
import NodeJSLogo from "../../public/assets/logos/nodejs-icon.svg";
import ReactLogo from "../../public/assets/logos/react.svg";
import TailwindCSSLogo from "../../public/assets/logos/tailwindcss-icon.svg";
import TypescriptLogo from "../../public/assets/logos/typescript-icon-round.svg";
import { translate } from "../utils/translation";
import "react-tooltip/dist/react-tooltip.css";
import { StackIcon } from "../icons/stack.icon";
import Image from "next/image";
import { Tooltip } from "../ui/tooltip";

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
		name: "Typescript",
		logo: TypescriptLogo,
		square: false,
	},
	{
		key: 5,
		name: "Node.js",
		logo: NodeJSLogo,
		square: false,
	},
	{
		key: 6,
		name: "Visual Studio Code",
		logo: VSCodeLogo,
		square: true,
	},
	{
		key: 7,
		name: "Docker",
		logo: DockerLogo,
		square: false,
	},
	{
		key: 8,
		name: "MobX",
		logo: MobXLogo,
		square: true,
	},
	{
		key: 9,
		name: "Adobe Lightroom",
		logo: LightroomLogo,
		square: true,
	},
	{
		key: 10,
		name: "Adobe XD",
		logo: AdobeXDLogo,
		square: true,
	},
	{
		key: 11,
		name: "Adobe Premiere",
		logo: PremiereLogo,
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
					<Image
						src={Logo}
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
