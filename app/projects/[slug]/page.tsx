import Link from "next/link";
import { Container } from "../../../src/components/container";
import { ProjectService } from "../../../src/lib/project.service";

export default async function Projects({ params: { slug } }: { params: { slug: string } }) {
	const project = await ProjectService.getProjectByFileName(`${slug}.md`);
	return (
		<div className="mt-28">
			<Container className="dark:text-zinc-200">
				<h1>Project</h1>
				<div key={project.slug}>
					<div>{project.meta.title}</div>
					<div>{project.meta.description}</div>
					<div>{project.meta.author}</div>
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
