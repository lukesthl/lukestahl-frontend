"use client";
import clsx from "clsx";
import Image from "next/image";
import { IImage } from "../../services/image.service";
import { Container } from "../layout/container";
import { SortSelection } from "./sort.selection";
import { animate, AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "lucide-react";
import { title } from "process";

type SortSelection = "new" | "old";

export const ImageGallery = ({ images, sort }: { images: IImage[]; sort: SortSelection }) => {
	const selectedSortingOption = sort;
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
	return (
		<div>
			<Container>
				<SortSelection value={selectedSortingOption} />
			</Container>
			<div className="2xl:max-w-[1440px] 2xl:mx-auto mx-4 mt-8 grid grid-cols-2 gap-2 md:mx-12 md:grid-cols-5 z-10">
				{images.map((image, imageIndex) => {
					const largeImage = imageIndex % 5 === 0 && imageIndex !== 0;
					const twoColumns = imageIndex % 15 === 4 && imageIndex !== 4;
					const firstTwoColumns = imageIndex % 15 === 4;
					return (
						<motion.div
							//initial={{ opacity: 0, scale: 0.5 }}
							//whileInView={{ opacity: 1, scale: 1 }}
							// transition={{ duration: 5 }}
							layoutId={`card-image-container-${imageIndex}`}
							key={`${imageIndex}`}
							className={clsx(
								"relative aspect-[9/10] w-full h-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-xl transition-transform duration-200 ease-in-out transform hover:scale-95 cursor-pointer",
								{
									"md:col-span-2 md:row-span-2 row-span-2 col-span-2": largeImage,
									"md:col-span-2": twoColumns,
									"col-span-2 md:col-span-1": firstTwoColumns && !twoColumns,
								}
							)}
							onClick={() => {
								setSelectedImageIndex(imageIndex);
							}}
						>
							<Image
								src={image.url}
								blurDataURL={image.blurUrl}
								key={`image-${imageIndex}`}
								placeholder="blur"
								alt={`Bild in Galerie ${imageIndex + 1}`}
								quality={100}
								sizes={largeImage || twoColumns || firstTwoColumns ? "100vw" : "(min-width: 640px) 18rem, 11rem"}
								fill
								className="object-cover"
							/>
						</motion.div>
					);
				})}
			</div>
			<AnimatePresence>
				{selectedImageIndex !== null && (
					<ImageModal
						selectedImageIndex={selectedImageIndex}
						image={images[selectedImageIndex]}
						setSelectedImageIndex={setSelectedImageIndex}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

const ImageModal = ({
	image,
	setSelectedImageIndex,
	selectedImageIndex,
}: {
	image: IImage;
	setSelectedImageIndex: (index: number | null) => void;
	selectedImageIndex: number;
}) => {
	console.log(image);
	const imageHeight = image.exifData["Image Height"]?.value || 0;
	const imageWidth = image.exifData["Image Width"]?.value || 0;
	const rotation = imageHeight > imageWidth ? "horizontal" : "vertical";
	return (
		<div>
			<motion.div
				initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
				animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2, delay: 0.1 }}
				style={{ pointerEvents: "auto" }}
				className="z-50 fixed inset-0 bg-black/50 backdrop-blur cursor-pointer"
				onClick={() => setSelectedImageIndex(null)}
			/>
			<motion.div
				className={`mx-auto top-0 my-12 bottom-0 left-1/2 right-0 fixed z-50 overflow-hidden -translate-x-1/2 ${rotation === "horizontal" ? "flex" : "grid self-center"} justify-center align-middle`}
				layoutId={`card-image-container-${selectedImageIndex}`}
				transformTemplate={({ x, rotate }) => `rotate(${rotate}deg) translateX(${x}px)`}
			>
				<Image
					src={image.url}
					blurDataURL={image.blurUrl}
					placeholder="blur"
					key={`image-${selectedImageIndex}`}
					alt={`Bild in Galerie ${selectedImageIndex + 1}`}
					quality={100}
					className="object-contain rounded-xl !h-auto !w-auto max-w-full max-h-full !relative z-50"
					fill
				/>
				{/* <motion.div className="title-container">
					<span className="category">{image.exifData.ISO}</span>
					<h2>{title}</h2>
				</motion.div> */}
			</motion.div>
		</div>
	);
};
