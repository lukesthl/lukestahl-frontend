import clsx from "clsx";
import Image from "next/image";
import { IImage } from "../../services/image.service";
import { Container } from "../layout/container";
import { SortSelection } from "./sort.selection";

type SortSelection = "new" | "old";

export const ImageGallery = ({ images, sort }: { images: IImage[]; sort: SortSelection }) => {
	const selectedSortingOption = sort;
	return (
		<div>
			<Container>
				<SortSelection value={selectedSortingOption} />
			</Container>
			<div className="2xl:max-w-8xl relative mx-4 mt-8 grid grid-cols-2 gap-5 sm:gap-6 md:mx-12 md:grid-cols-5">
				{images.map((image, imageIndex) => (
					<div
						key={imageIndex}
						className={clsx(
							"relative aspect-[9/10] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl"
						)}
					>
						<Image
							src={image.url}
							blurDataURL={image.blurUrl}
							placeholder="blur"
							alt={`Bild in Galerie ${imageIndex + 1}`}
							quality={30}
							sizes="(min-width: 640px) 18rem, 11rem"
							fill
							className="object-cover"
						/>
					</div>
				))}
			</div>
		</div>
	);
};
