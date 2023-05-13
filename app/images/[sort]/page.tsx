import { notFound } from "next/navigation";
import { ImageGallery } from "../../../components/images/image.gallery";
import { ImageService } from "../../../services/image.service";

export async function generateStaticParams() {
	return [
		{
			sort: "new",
		},
		{
			sort: "old",
		},
	];
}

export default async function ImageFilterPage({ params }: { params: { sort: "new" | "old" } }) {
	if (!params.sort || (params.sort !== "new" && params.sort !== "old")) {
		notFound();
	}
	const images = JSON.parse(
		await ImageService.getImages({
			sort:
				params.sort === "new"
					? (imageA, imageB) =>
							new Date(imageB.exifData?.DateTimeOriginal || 0).getTime() -
							new Date(imageA.exifData?.DateTimeOriginal || 0).getTime()
					: (imageA, imageB) =>
							new Date(imageA.exifData?.DateTimeOriginal || 0).getTime() -
							new Date(imageB.exifData?.DateTimeOriginal || 0).getTime(),
		})
	);
	return <ImageGallery images={images} sort={params.sort} />;
}
