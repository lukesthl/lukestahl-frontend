import { Container } from "../src/components/layout/container";
import { Avatar } from "../src/components/header/avatar";
import { HorizontalImageList } from "../src/components/home/horizontal.imagelist";
import { ProjectList } from "../src/components/home/project.list";
import { Resume } from "../src/components/home/resume";
import { SocialLinks } from "../src/components/social/links";
import { SocialLink } from "../src/components/social/social.link";
import { TechStack } from "../src/components/home/techstack";
import { translate } from "../src/components/utils/translation";

export default async function Home() {
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
				<HorizontalImageList />
			</div>
			<Container className="mt-16 sm:mt-24">
				<div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-y-20">
					<div>
						{/* @ts-expect-error Server Component */}
						<ProjectList />
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
