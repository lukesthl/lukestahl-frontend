import Link from "next/link";
import { Container } from "../../src/components/container";
import { ProjectService } from "../../src/lib/project.service";

export default async function Projects() {
	const projects = await ProjectService.getProjects();
	return (
		<div className="mt-28">
			<Container>
				<h1>Projects</h1>
				{projects.map(project => (
					<div key={project.slug} className="dark:text-zinc-200">
						<Link href={`/projects/${encodeURIComponent(project.slug)}`}>
							<div>{project.meta.title}</div>
							<div>{project.meta.description}</div>
							<div>{project.meta.author}</div>
						</Link>
					</div>
				))}
			</Container>
		</div>
	);
}
