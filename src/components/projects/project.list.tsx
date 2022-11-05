import Link from "next/link";
import { IProject, ProjectService } from "../../lib/project.service";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

export const ProjectList = ({ projects }: { projects: IProject[] }) => {
	return (
		<div className="flex flex-col gap-12">
			{projects.map(project => (
				<div key={project.slug}>
					<ProjectCard project={project} />
				</div>
			))}
		</div>
	);
};

const ProjectCard = ({ project }: { project: IProject }) => (
	<Link href={`/projects/${encodeURIComponent(project.slug)}`}>
		<div className="group relative">
			<div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
			<div className="relative z-10">
				<p className="relative pl-3 text-xs text-zinc-500 dark:text-zinc-400">
					<span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
						<span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
					</span>
					{project.meta.tags.join(", ")}
				</p>
				<h2 className="mt-3 font-semibold text-zinc-800 dark:text-zinc-100">{project.meta.title}</h2>
				<p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{project.meta.description}</p>
				<div className="mt-3 inline-flex items-center text-sm font-medium text-primary-500">
					<span>mehr erfahren</span>
					<ChevronRightIcon className="h-4 w-4 stroke-2" />
				</div>
			</div>
		</div>
	</Link>
);