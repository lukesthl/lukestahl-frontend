import React from "react";
import { translate } from "../utils/translation";
import marcapoLogo from "../../public/assets/logos/marcapo.jpeg";
import Image from "next/image";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

const resume = [
	{
		company: "marcapo",
		logo: marcapoLogo,
		name: "Frontend-Entwickler",
		start: new Date("2021").toISOString(),
		end: new Date().toISOString(),
		type: "job",
		key: 1,
	},
	{
		company: "marcapo",
		logo: marcapoLogo,
		name: "Ausbildung zum Fachinformatiker für Anwendungsentwicklung ",
		start: new Date("2018").toISOString(),
		end: new Date("2021").toISOString(),
		type: "apprenticeship",
		key: 2,
	},
];

const getYear = (date: Date) =>
	date.getFullYear() === new Date().getFullYear() ? translate("home.resume.today") : date.getFullYear();

export const Resume = () => (
	<div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
		<div className="flex items-center gap-2">
			<BriefCaseIcon className="h-6 w-6" />
			<p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
				{translate("home.resume.workexperience")}
			</p>
		</div>
		<div className="mt-5 flex flex-col gap-4">
			{resume
				.filter(resumeItem => resumeItem.type === "job")
				.map(resumeItem => (
					<ResumeItem resumeItem={resumeItem} key={resumeItem.key} />
				))}
		</div>
		<div className="border-zink-100 my-6 mx-2 border-t dark:border-zinc-700/40" />
		<div className="flex items-center gap-2">
			<BriefCaseIcon className="h-6 w-6" />
			<p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
				{translate("home.resume.apprenticeship")}
			</p>
		</div>
		<div className="mt-5 flex flex-col gap-4">
			{resume
				.filter(resumeItem => resumeItem.type === "apprenticeship")
				.map(resumeItem => (
					<ResumeItem resumeItem={resumeItem} key={resumeItem.key} />
				))}
		</div>
		{/* <div className="mx-2 mt-6">
			<button className="group relative w-full rounded-md bg-zinc-100/75 py-3 text-sm font-semibold dark:bg-zinc-800/75 dark:text-zinc-200">
				<div className="relative z-10 flex items-center justify-center gap-2">
					{translate("home.resume.download")}
					<ArrowDownTrayIcon className="h-4 w-4" />
				</div>
				<div className="absolute inset-0 z-0 scale-0 rounded-md bg-zinc-200/50 opacity-0 transition duration-200 group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-700/30" />
			</button>
		</div> */}
	</div>
);

const ResumeItem = ({ resumeItem }: { resumeItem: (typeof resume)[0] }) => (
	<div className="flex items-center gap-4">
		<div className="rounded-full bg-white/90 p-[6px] shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
			<Image src={resumeItem.logo} className="h-8 w-8 rounded-full" alt={resumeItem.company} />
		</div>
		<div className="flex-1">
			<p className="font-semibold text-zinc-800 dark:text-zinc-200">{resumeItem.company}</p>
			<p
				style={{ WebkitLineClamp: 2, WebkitBoxOrient: "vertical", display: "-webkit-box" }}
				className="mt-[1px] max-w-[13rem] overflow-hidden text-sm text-zinc-600 dark:text-zinc-200"
			>
				{resumeItem.name}
			</p>
		</div>
		<span className="text-sm text-zinc-500 dark:text-zinc-400" aria-hidden="true">
			{getYear(new Date(resumeItem.start))} - {getYear(new Date(resumeItem.end))}
		</span>
	</div>
);

const BriefCaseIcon = (props: React.ComponentProps<"svg">) => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		strokeWidth="1.5"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		{...props}
	>
		<path
			d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
			className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
		/>
		<path
			d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
			className="stroke-zinc-400 dark:stroke-zinc-500"
		/>
	</svg>
);
