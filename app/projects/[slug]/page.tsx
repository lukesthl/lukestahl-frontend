import Image from "next/image";
import { Container } from "../../../src/components/layout/container";
import { GoBackButton } from "../../../src/components/ui/goback.button";
import { ProjectService } from "../../../src/services/project.service";

export default async function Projects({ params }: { params: { slug: string } }) {
	const project = await ProjectService.getProjectByFileName(`${params.slug}.md`);
	return (
		<div key={project.slug} className="mt-16 md:mt-28">
			<Container className="dark:text-zinc-200">
				<div className="relative">
					<div className="left-0 top-0 xl:absolute">
						<GoBackButton />
					</div>
					<article className="mx-auto mt-6 max-w-2xl xl:mt-0">
						<header className="space-y-6">
							<p className="relative pl-3 text-zinc-500 dark:text-zinc-400">
								<span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
									<span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
								</span>
								{project.meta.tags.join(", ")}
							</p>
							<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
								{project.meta.title}
							</h1>
							<div className="relative aspect-video">
								<Image
									src={project.meta.bannerImage}
									alt="alt"
									fill
									className="rounded-2xl object-cover"
									{...(project.meta.bannerImageBlur
										? {
												placeholder: "blur",
												blurDataURL: project.meta.bannerImageBlur,
										  }
										: {})}
								/>
							</div>
							<p className="text-base text-zinc-600 dark:text-zinc-400">{project.meta.description}</p>
						</header>
						<div className="prose mt-8 dark:prose-invert" dangerouslySetInnerHTML={{ __html: project.content }} />
					</article>
				</div>
			</Container>
		</div>
	);
}

export async function generateStaticParams() {
	const projects = await ProjectService.getProjects();

	return projects.map(post => ({
		slug: post.slug,
	}));
}
