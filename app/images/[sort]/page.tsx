import { notFound } from "next/navigation";
import { ImageGallery } from "../../../components/images/image.gallery";
import { ImageService } from "../../../services/image.service";
import { Suspense } from "react";

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

export default async function ImageFilterPage({ params }: { params: Promise<{ sort: "new" | "old" }> }) {
	const { sort } = await params;
	if (!sort || (sort !== "new" && sort !== "old")) {
		notFound();
	}
	const images = await ImageService.getImages({
		sort,
	});
	return (
		<Suspense>
			<ImageGallery images={images} sort={sort} />
		</Suspense>
	);
}
