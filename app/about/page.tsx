import Image from "next/image";
import { Container } from "../../src/components/layout/container";
import { translate } from "../../src/components/utils/translation";
import AvatarPicture from "../../public/assets/images/darkmode/image-1.jpg";
import { SocialLinks } from "../../src/components/social/links";
import { SocialLink } from "../../src/components/social/social.link";

export default function About() {
	return (
		<Container className="mt-16 md:mt-32">
			<div className="grid gap-8 md:grid-cols-2 md:gap-24">
				<div>
					<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
						{translate("about.title")}
					</h1>
					{/* TODO cleaner without doubling image and links */}
					<div className="block md:hidden">
						<div className="mt-6  aspect-[9/10] w-full flex-none rotate-1 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl">
							<Image src={AvatarPicture} alt="me" />
						</div>
						<div className="mt-6 space-y-1">
							{SocialLinks.map(socialLink => (
								<SocialLink {...socialLink} key={socialLink.href} />
							))}
						</div>
					</div>
					<p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">{translate("about.description")}</p>
				</div>
				<div className="hidden md:block">
					<div className="aspect-[9/10] w-full flex-none rotate-2 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl">
						<Image src={AvatarPicture} alt="me" />
					</div>
					<div className="mt-6 space-y-1">
						{SocialLinks.map(socialLink => (
							<SocialLink {...socialLink} key={socialLink.href} />
						))}
					</div>
				</div>
			</div>
		</Container>
	);
}
