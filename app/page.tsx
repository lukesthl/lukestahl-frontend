import { Container } from "../components/layout/container";
import { Avatar } from "../components/header/avatar";
import { HorizontalImageList } from "../components/home/horizontal.imagelist";
import { ProjectList } from "../components/home/project.list";
import { Resume } from "../components/home/resume";
import { SocialLinks } from "../components/social/links";
import { SocialLink } from "../components/social/social.link";
import { TechStack } from "../components/home/techstack";
import { translate } from "../components/utils/translation";
import { LocationMap } from "../components/home/location.map";
import Balancer from "react-wrap-balancer";

export default async function Home() {
	return (
		<div className="mt-14 sm:mt-28">
			<Container>
				<div className="max-w-2xl">
					<Avatar size="large" />
					<h1 className="mt-6 text-4xl font-bold !leading-[1.1] text-zinc-800 dark:text-zinc-100 sm:text-5xl">
						<Balancer>{translate("home.title")}</Balancer>
					</h1>
					<p className="mt-6 text-zinc-600 dark:text-zinc-400">
						<Balancer>{translate("home.description")}</Balancer>
					</p>
					<div className="mt-6 flex gap-7">
						{SocialLinks.map(({ title: _, ...socialLink }) => (
							<SocialLink target="_blank" {...socialLink} key={socialLink.href.toString()} />
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
						<ProjectList />
					</div>
					<div className="space-y-8 md:pl-24">
						<Resume />
						<TechStack />
						<LocationMap />
					</div>
				</div>
			</Container>
		</div>
	);
}
