import Image from "next/image";
import { Container } from "../../components/layout/container";
import { translate } from "../../components/utils/translation";
import AvatarPicture from "../../public/assets/me.png";
import { SocialLinks } from "../../components/social/links";
import { SocialLink } from "../../components/social/social.link";
import { Metadata } from "next";

const url = new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `${process.env.PUBLIC_URL}`);
const images = [
	{
		url: `${url.toString()}/og?title=${encodeURIComponent(translate("about.meta.title"))}`,
		width: 1200,
		height: 630,
	},
];

export const metadata: Metadata = {
	title: translate("about.meta.title"),
	openGraph: {
		images,
	},
	twitter: {
		title: translate("about.meta.title"),
		images,
	},
};

const calculateAge = (birthday: string): number => {
	var currentDate = new Date();
	var birthDate = new Date(birthday);
	var age = currentDate.getFullYear() - birthDate.getFullYear();
	var month = currentDate.getMonth() - birthDate.getMonth();
	if (month < 0 || (month === 0 && currentDate.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
};

export default function About() {
	return (
		<Container className="mt-16 md:mt-32">
			<div className="grid gap-8 md:grid-cols-2 md:gap-8 xl:gap-24">
				<div>
					<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
						{translate("about.title")}
					</h1>
					{/* TODO cleaner without duplicating image and links */}
					<div className="block md:hidden">
						<div className="mt-6 aspect-[9/10] w-full flex-none rotate-1 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl">
							<Image
								src={AvatarPicture}
								quality={50}
								alt="Luke Stahl"
								className="object-cover"
								fill
								placeholder="blur"
							/>
						</div>
						<div className="mt-6 space-y-1">
							{SocialLinks.map(socialLink => (
								<SocialLink target="_blank" {...socialLink} key={socialLink.href.toString()} />
							))}
						</div>
					</div>
					<p className="mt-6 text-base text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
						{translate("about.description", {
							context: { age: calculateAge("2002-08-10") },
						})}
					</p>
				</div>
				<div className="hidden md:block">
					<div className="aspect-[9/10] w-full flex-none rotate-2 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl">
						<Image src={AvatarPicture} quality={50} alt="Luke Stahl" className="object-cover" fill />
					</div>
					<div className="mt-6 md:space-y-1 space-y-2">
						{SocialLinks.map(socialLink => (
							<SocialLink target="_blank" {...socialLink} key={socialLink.href.toString()} />
						))}
					</div>
				</div>
			</div>
		</Container>
	);
}
