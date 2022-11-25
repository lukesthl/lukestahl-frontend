import { Container } from "../../src/components/container";
import { SocialLinks } from "../../src/components/social/links";
import { SocialLink } from "../../src/components/social/social.link";
import { translate } from "../../src/components/translation";
import AvatarPicture from "../../public/assets/images/darkmode/image-1.jpg";
import Image from "next/image";
import { PhotoGallery } from "../../src/components/photo.gallery";

export default function Photos() {
	return (
		<>
			<Container className="mt-16 md:mt-32">
				<div className="grid gap-8 md:grid-cols-5 md:gap-24">
					<div className="col-span-3">
						<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
							{translate("photos.title")}
						</h1>
						<p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">{translate("photos.description")}</p>
					</div>
					<div className="col-span-2">
						<div className="aspect-square w-full rotate-2 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl">
							<Image src={AvatarPicture} alt="me" />
						</div>
					</div>
				</div>
			</Container>

			<div className="mt-8">
				<PhotoGallery />
			</div>
		</>
	);
}
