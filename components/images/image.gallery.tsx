"use client";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IImage } from "../../services/image.service";
import { Container } from "../layout/container";
import { wrap } from "popmotion";
import { SortSelection } from "./sort.selection";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SortSelection = "new" | "old";

export const ImageGallery = ({ images, sort }: { images: IImage[]; sort: SortSelection }) => {
	const selectedSortingOption = sort;
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
	const [imageAnimIndex, setAnimImageIndex] = useState<number | null>(null);
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
							layoutId={`card-image-container-${imageIndex}`}
							key={`imagecontainer-${imageIndex}`}
							whileHover={{ scale: 0.95 }}
							className={clsx(
								"relative aspect-[9/10] w-full h-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-xl cursor-pointer",
								{
									"md:col-span-2 md:row-span-2 row-span-2 col-span-2": largeImage,
									"md:col-span-2": twoColumns,
									"col-span-2 md:col-span-1": firstTwoColumns && !twoColumns,
								}
							)}
							animate={{ zIndex: imageAnimIndex === imageIndex ? 40 : 0 }}
							onClick={() => {
								setSelectedImageIndex(imageIndex);
								setAnimImageIndex(imageIndex);
							}}
							onAnimationEnd={() => setAnimImageIndex(null)}
							initial={{ zIndex: 0 }}
						>
							<div className="w-full h-full absolute top-0 left-0 bg-gradient-to-t from-black/50 to-transparent" />
							<Image
								src={image.url}
								blurDataURL={image.blurUrl}
								key={`image-${imageIndex}`}
								placeholder="blur"
								alt={`Bild in Galerie ${imageIndex + 1}`}
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
						setSelectedImageIndex={index => {
							setSelectedImageIndex(index);
							if (index !== null) {
								setAnimImageIndex(index);
							}
						}}
						images={images}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
	center: {
		zIndex: 60,
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => {
		return {
			zIndex: 59,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
	return Math.abs(offset) * velocity;
};

const ImageModal = ({
	image,
	setSelectedImageIndex,
	selectedImageIndex,
	images,
}: {
	image: IImage;
	images: IImage[];
	setSelectedImageIndex: (index: number | null) => void;
	selectedImageIndex: number;
}) => {
	const [[page, direction], setPage] = useState([0, 0]);
	const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
	const [calculatedImageSize, setCalculatedImageSize] = useState({ width: 0, height: 0 });
	const [imageLoaded, setImageLoaded] = useState(false);

	const paginate = useCallback(
		(newDirection: number) => {
			setPage([page + newDirection, newDirection]);
			setSelectedImageIndex(wrap(0, images.length, selectedImageIndex + newDirection));
			setImageLoaded(false);
		},
		[images.length, page, selectedImageIndex, setSelectedImageIndex]
	);

	const [padding, setPadding] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const updatePadding = () => {
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;

			const paddingX = Math.max(20, windowWidth * 0.05); // minimum 20px or 5% of width
			const paddingY = Math.max(20, windowHeight * 0.05); // minimum 20px or 5% of height

			setPadding({ x: paddingX, y: paddingY });
			setWindowSize({ width: windowWidth, height: windowHeight });
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setSelectedImageIndex(null);
			}
			if (e.key === "ArrowLeft") {
				paginate(-1);
			}
			if (e.key === "ArrowRight") {
				paginate(1);
			}
		};

		updatePadding();

		window.addEventListener("resize", updatePadding);
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("resize", updatePadding);
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [paginate, setSelectedImageIndex]);

	useEffect(() => {
		const imageHeight = image.exifData["Image Height"]?.value || 0;
		const imageWidth = image.exifData["Image Width"]?.value || 0;
		const aspectRatio = imageWidth / imageHeight;
		const maxWidth = windowSize.width - padding.x * 2;
		const maxHeight = windowSize.height - padding.y * 2;

		let width, height;

		if (maxWidth / aspectRatio <= maxHeight) {
			// Width is the limiting factor
			width = maxWidth;
			height = maxWidth / aspectRatio;
		} else {
			// Height is the limiting factor
			height = maxHeight;
			width = maxHeight * aspectRatio;
		}

		setCalculatedImageSize({ width, height });
	}, [selectedImageIndex, windowSize, padding, image.exifData]);
	return (
		<div>
			<motion.div
				initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
				animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2, delay: 0.1 }}
				style={{ pointerEvents: "auto" }}
				className="z-40 fixed inset-0 bg-black/50 backdrop-blur cursor-pointer"
				onClick={() => setSelectedImageIndex(null)}
			/>
			<AnimatePresence initial={false} custom={direction}>
				<motion.img
					key={page}
					custom={direction}
					layoutId={`card-image-container-${selectedImageIndex}`}
					className="fixed m-auto max-w-full max-h-full rounded-xl inset-0"
					style={{
						maxWidth: `calc(100% - ${padding.x * 2}px)`,
						maxHeight: `calc(100% - ${padding.y * 2}px)`,
						inset: `${padding.y}px ${padding.x}px`,
					}}
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{
						x: { type: "spring", stiffness: 300, damping: 30 },
						opacity: { duration: 0.2 },
					}}
					drag="x"
					dragConstraints={{ left: 0, right: 0 }}
					dragElastic={1}
					onDragEnd={(e, { offset, velocity }) => {
						const swipe = swipePower(offset.x, velocity.x);

						if (swipe < -swipeConfidenceThreshold) {
							paginate(1);
						} else if (swipe > swipeConfidenceThreshold) {
							paginate(-1);
						}
					}}
					onLoad={() => setImageLoaded(true)}
					src={images[selectedImageIndex].url}
				/>
				<div className="fixed top-4 right-4 z-50 p-4 bg-black/70 rounded-xl text-gray-300 h-screen overflow-y-scroll">
					{images[selectedImageIndex]?.exifData && window.location.hostname === "localhost" && (
						<motion.div
							key={`exif-${selectedImageIndex}`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							{Object.entries(images[selectedImageIndex]?.exifData || {})
								.filter(([_, value]) => value?.value?.toString() !== "0")
								.map(([key, value]) => (
									<div key={key} className="flex justify-between">
										<p className="text-sm">{key?.toString()}</p>
										<p className="text-sm">{value?.value?.toString()}</p>
									</div>
								))}
						</motion.div>
					)}
				</div>
				{!imageLoaded && (
					<motion.img
						key={`blur-${selectedImageIndex}`}
						src={images[selectedImageIndex].blurUrl}
						className="fixed m-auto rounded-xl z-50 bg-black/50"
						style={{
							maxWidth: `calc(100% - ${padding.x * 2}px)`,
							maxHeight: `calc(100% - ${padding.y * 2}px)`,
							inset: `${padding.y}px ${padding.x}px`,
							width: `${calculatedImageSize.width}px`,
							height: `${calculatedImageSize.height}px`,
							objectFit: "cover",
							objectPosition: "center",
						}}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					/>
				)}
			</AnimatePresence>
			<div
				onClick={() => paginate(-1)}
				className="fixed top-1/2 left-0 z-50 flex items-center justify-center w-12 h-12 bg-black/70 rounded-full cursor-pointer text-gray-300 hover:bg-black/80 hover:text-gray-500 hover:scale-95 ml-4 transition duration-200 ease-in-out"
			>
				<ChevronLeft size={24} />
			</div>
			<div
				onClick={() => paginate(1)}
				className="fixed top-1/2 right-0 z-50 flex items-center justify-center w-12 h-12 bg-black/70 rounded-full cursor-pointer text-gray-300 hover:bg-black/80 hover:text-gray-500 hover:scale-95 mr-4 transition duration-200 ease-in-out"
			>
				<ChevronRight size={24} />
			</div>
		</div>
	);
};
