import { ChevronRightIcon, LinkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { SimpleLayout } from "../../components/layout/simplelayout";
import { translate } from "../../components/utils/translation";
import { ProjectService } from "../../services/project.service";
import { GitHubIcon } from "../../components/icons/github.icon";
import { Metadata, Route } from "next";
import { IProject } from "../../services/project.service";
import clsx from "clsx";

export const metadata: Metadata = {
	title: "Projekte",
};

export default async function Projects() {
	const projects = await ProjectService.getProjects();
	return (
		<SimpleLayout title={translate("projects.title")} description={translate("projects.description")}>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
				{projects.map(project => (
					<div key={project.slug} className="flex flex-col justify-between">
						<div>
							{project.content ? (
								<Link href={`/projects/${encodeURIComponent(project.slug)}`} className="group transition">
									<ProjectContent project={project} />
								</Link>
							) : (
								<ProjectContent project={project} />
							)}
						</div>
						<div className="mt-3 flex items-center justify-between">
							{project.content && (
								<Link href={`/projects/${encodeURIComponent(project.slug)}`}>
									<div className="inline-flex items-center text-sm font-medium hover:text-primary-500/50 transition text-primary-500">
										<span>{translate("home.projects.readmore")}</span>
										<ChevronRightIcon className="h-4 w-4 stroke-2" />
									</div>
								</Link>
							)}
							{project.meta.links.map(link => (
								<Link
									href={link as Route}
									key={link}
									target="_blank"
									rel="noopener noreferrer"
									className="group -m-1 flex items-center p-1 text-sm font-medium text-zinc-500"
								>
									{link.includes("github.com") ? (
										<GitHubIcon className="mr-2 h-4 w-4 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
									) : (
										<LinkIcon className="mr-2 h-4 w-4 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
									)}
									{new URL(link).hostname}
								</Link>
							))}
						</div>
					</div>
				))}
			</div>
		</SimpleLayout>
	);
}

const ProjectContent = ({ project }: { project: IProject }) => (
	<>
		<div className="flex">
			<div className="rounded-full bg-white/90 p-[0.35rem] shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
				<div className="relative h-8 w-8">
					<Image
						src={project.meta.icon}
						fill
						className="object-cover rounded-full"
						alt={`icon ${project.meta.title}`}
					/>
				</div>
			</div>
		</div>
		<h2
			className={clsx("mt-4 font-semibold transition dark:text-zinc-100", {
				"dark:group-hover:text-zinc-300 group-hover:text-zinc-500": !!project.content,
			})}
		>
			{project.meta.title}
		</h2>
		<p
			className={clsx("mt-2 text-zinc-600 transition dark:text-zinc-400", {
				"dark:group-hover:text-zinc-500 group-hover:text-zinc-400": !!project.content,
			})}
		>
			{project.meta.description}
		</p>
	</>
);
