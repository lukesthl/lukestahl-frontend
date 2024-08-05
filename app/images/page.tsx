import { Metadata } from "next";
import { ImageGallery } from "../../components/images/image.gallery";
import { translate } from "../../components/utils/translation";
import { ImageService } from "../../services/image.service";
import { Suspense } from "react";

const url = new URL(`${process.env.PUBLIC_URL}`);
const images = [
	{
		url: `${url.toString()}og?title=${encodeURIComponent(translate("photos.title"))}&description=${encodeURIComponent(
			translate("photos.description")
		)}`,
		width: 1200,
		height: 630,
	},
];

export const metadata: Metadata = {
	title: translate("photos.title"),
	description: translate("photos.description"),
	openGraph: {
		images,
	},
	twitter: {
		title: translate("photos.title"),
		images,
	},
};

export default async function Images() {
	const images = await ImageService.getImages();
	return (
		<Suspense>
			<ImageGallery images={images} sort="new" />
		</Suspense>
	);
}
