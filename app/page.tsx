import Image from "next/image";
import { Container } from "../src/components/container";
import { Avatar } from "../src/components/header/avatar";
import { Photos } from "../src/components/photos";
import { ProjectList } from "../src/components/projects/project.list";
import { Resume } from "../src/components/resume";
import { SocialLinks } from "../src/components/social/links";
import { SocialLink } from "../src/components/social/social.link";
import { TechStack } from "../src/components/techstack";
import { translate } from "../src/components/translation";
import { ProjectService } from "../src/lib/project.service";

export default async function Home() {
	const projects = await ProjectService.getProjects();
	return (
		<div className="mt-14 sm:mt-28">
			<Container>
				<div className="max-w-2xl">
					<Avatar size="large" />
					<h1 className="mt-6 text-4xl font-bold !leading-[1.1] text-zinc-800 dark:text-zinc-100 sm:text-5xl">
						{translate("home.title")}
					</h1>
					<p className="mt-6 text-zinc-600 dark:text-zinc-400">{translate("home.description")}</p>
					<div className="mt-6 flex gap-7">
						{SocialLinks.map(({ title: _, ...socialLink }) => (
							<SocialLink {...socialLink} key={socialLink.href} />
						))}
					</div>
				</div>
			</Container>
			<div className="mt-16">
				<Photos />
			</div>
			<Container className="mt-16 sm:mt-24">
				<div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-y-20">
					<div>
						<ProjectList projects={projects} />
					</div>
					<div className="space-y-8 md:pl-24">
						<Resume />
						<TechStack />
					</div>
				</div>
			</Container>
		</div>
	);
}
