import { ChevronRightIcon, LinkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { SimpleLayout } from "../../src/components/simplelayout";
import { GitHubIcon } from "../../src/components/social/links";
import { translate } from "../../src/components/translation";
import { ProjectService } from "../../src/lib/project.service";

export default async function Projects() {
	const projects = await ProjectService.getProjects();
	return (
		<SimpleLayout title={translate("projects.title")} description={translate("projects.description")}>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
				{projects.map(project => (
					<div key={project.slug} className="flex flex-col justify-between">
						<div>
							<div className="flex">
								<div className="rounded-full bg-white/90 p-[0.35rem] shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
									<div className="relative h-8 w-8">
										<Image src={project.meta.icon} fill className="object-cover" alt="alt" />
									</div>
								</div>
							</div>
							<h2 className="mt-4 font-semibold">{project.meta.title}</h2>
							<p className="mt-2 text-zinc-600 dark:text-zinc-400">{project.meta.description}</p>
						</div>
						<div className="mt-3 flex items-center justify-between">
							<Link href={`/projects/${encodeURIComponent(project.slug)}`}>
								<div className="inline-flex items-center text-sm font-medium text-primary-500">
									<span>{translate("home.projects.readmore")}</span>
									<ChevronRightIcon className="h-4 w-4 stroke-2" />
								</div>
							</Link>
							{project.meta.links.map(link => (
								<Link
									href={link}
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
