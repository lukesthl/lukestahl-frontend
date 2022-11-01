import Image from "next/image";
import { Container } from "../src/components/container";
import { Avatar } from "../src/components/header/avatar";
import { Photos } from "../src/components/photos";
import { SocialLinks } from "../src/components/social/links";
import { SocialLink } from "../src/components/social/social.link";
import { translate } from "../src/components/translation";

export default function Home() {
	return (
		<div className="mt-28">
			<Container>
				<div className="max-w-2xl">
					<Avatar size="large" />
					<h1 className="mt-6 text-4xl font-bold !leading-[1.1] text-zinc-800 dark:text-zinc-100 sm:text-5xl">
						{translate("home.title")}
					</h1>
					<p className="mt-6 text-zinc-600 dark:text-zinc-400">{translate("home.description")}</p>
					<div className="mt-6 flex gap-7">
						{SocialLinks.map(socialLink => (
							<SocialLink {...socialLink} key={socialLink.href} />
						))}
					</div>
				</div>
			</Container>
			<div className="mt-16 sm:mt-20">
				<Photos />
			</div>
		</div>
	);
}
