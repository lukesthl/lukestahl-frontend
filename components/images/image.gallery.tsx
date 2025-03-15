"use client";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
	ApertureIcon,
	CameraIcon,
	ChevronLeft,
	ChevronRight,
	Divide,
	LocateIcon,
	MapIcon,
	MapPinnedIcon,
	XIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { wrap } from "popmotion";
import { useCallback, useEffect, useState } from "react";
import { IImage } from "../../services/image.service";
import { Container } from "../layout/container";
import { SortSelection } from "./sort.selection";

type SortSelection = "new" | "old";

export const ImageGallery = ({ images, sort }: { images: IImage[]; sort: SortSelection }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const selectedImageFileUrl = searchParams.get("image");
	const preselectedImageIndex = images.findIndex(image => image.url === selectedImageFileUrl);
	if (preselectedImageIndex === -1 && selectedImageFileUrl) {
		router.push("/images");
	}
	const selectedSortingOption = sort;
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
		preselectedImageIndex !== -1 ? preselectedImageIndex : null
	);
	const [imageAnimIndex, setAnimImageIndex] = useState<number | null>(
		preselectedImageIndex !== -1 ? preselectedImageIndex : null
	);
	useEffect(() => {
		const newPreselectedImageIndex = images.findIndex(image => image.url === selectedImageFileUrl);
		if (newPreselectedImageIndex !== -1) {
			setSelectedImageIndex(newPreselectedImageIndex);
			setAnimImageIndex(newPreselectedImageIndex);
		}
	}, [images, searchParams, selectedImageFileUrl]);
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
								"relative aspect-9/10 w-full h-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-xl cursor-pointer",
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
								router.push(`?image=${image.url}`);
							}}
							onAnimationEnd={() => setAnimImageIndex(null)}
							initial={{ zIndex: 0 }}
						>
							<div className="w-full h-full absolute top-0 left-0 bg-linear-to-t from-black/50 to-transparent" />
							<Image
								src={image.url}
								blurDataURL={image.blurUrl}
								key={`image-${imageIndex}`}
								placeholder="blur-sm"
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
								router.push(`?image=${images[index].url}`);
								setAnimImageIndex(index);
							} else {
								router.push(`/images/${sort}`);
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
const exifInfoHeight = 100;

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
		const maxHeight = windowSize.height - padding.y * 2 - exifInfoHeight;

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
				transition={{ duration: 0.2 }}
				style={{ pointerEvents: "auto" }}
				className="z-40 fixed inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
				onClick={() => setSelectedImageIndex(null)}
			/>
			<AnimatePresence initial={false} custom={direction}>
				<motion.div
					key={page}
					custom={direction}
					layoutId={`card-image-container-${selectedImageIndex}`}
					className="fixed m-auto inset-0"
					style={{
						maxWidth: `calc(100% - ${2 * padding.x}px)`,
						maxHeight: `calc(100% - ${2 * padding.y}px)`,
						width: `${calculatedImageSize.width}px`,
						height: `${calculatedImageSize.height}px`,
						top: padding.y - exifInfoHeight,
						left: padding.x,
						right: padding.x,
						bottom: padding.y,
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
					onDragEnd={(_e, { offset, velocity }) => {
						const swipe = swipePower(offset.x, velocity.x);

						if (swipe < -swipeConfidenceThreshold) {
							paginate(1);
						} else if (swipe > swipeConfidenceThreshold) {
							paginate(-1);
						}
					}}
				>
					{windowSize.width && windowSize.height && (
						<motion.img
							onLoad={() => {
								setImageLoaded(true);
							}}
							style={{
								inset: `${padding.y}px ${padding.x}px`,
							}}
							src={images[selectedImageIndex].url}
							className="w-full h-full object-contain inset-0 rounded-t-xl"
							draggable="false"
						/>
					)}
					{!imageLoaded && (
						<motion.img
							key={`blur-${selectedImageIndex}`}
							src={images[selectedImageIndex].blurUrl}
							className="fixed m-auto z-50 bg-black/50 rounded-t-xl inset-0"
							style={{
								width: `${calculatedImageSize.width}px`,
								height: `${calculatedImageSize.height}px`,
								objectFit: "cover",
								objectPosition: "center",
							}}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							draggable="false"
						/>
					)}
					{windowSize.width && windowSize.height && (
						<div
							style={{
								maxWidth: calculatedImageSize.width,
								height: exifInfoHeight,
							}}
							className="m-auto rounded-b-xl"
						>
							<ExifInfo image={images[selectedImageIndex]} />
						</div>
					)}
				</motion.div>
			</AnimatePresence>
			<div
				onClick={() => paginate(-1)}
				className="fixed top-1/2 transform -translate-y-1/2 left-0 z-60 flex items-center justify-center w-12 h-12 bg-black/70 rounded-full cursor-pointer text-gray-300 hover:bg-black/80 hover:text-gray-500 hover:scale-95 md:ml-4 ml-1 transition duration-200 ease-in-out"
			>
				<ChevronLeft size={24} />
			</div>
			<div
				onClick={() => paginate(1)}
				className="fixed top-1/2 transform -translate-y-1/2 right-0 z-60 flex items-center justify-center w-12 h-12 bg-black/70 rounded-full cursor-pointer text-gray-300 hover:bg-black/80 hover:text-gray-500 hover:scale-95 md:mr-4 mr-1 transition duration-200 ease-in-out"
			>
				<ChevronRight size={24} />
			</div>
			<div
				onClick={() => setSelectedImageIndex(null)}
				className="fixed top-4 right-4 z-60 flex items-center justify-center bg-black/70 rounded-full cursor-pointer text-gray-300 hover:bg-black/80 hover:text-gray-500 hover:scale-95 w-12 h-12 transition duration-200 ease-in-out"
			>
				<XIcon size={24} />
			</div>
			{/* Action bar? */}
			{/* <div className="fixed bottom-4 right-0 left-0 z-60 flex items-center justify-center gap-2">
				<div className="text-gray-300 bg-black/70 rounded-full p-2 cursor-pointer hover:bg-black/80 hover:text-gray-500 hover:scale-95 transition duration-200 ease-in-out">
				// show image on map
					<MapIcon size={24} />
				</div>
			</div> */}
		</div>
	);
};

const ExifInfo = ({ image }: { image: IImage }) => {
	const fileName = image.url.split("/").pop();
	const state = image.exifData["State"]?.value;
	const country = image.exifData["Country"]?.value;
	const aperture = image.exifData["ApertureValue"]?.description || image.exifData["FNumber"]?.description;
	const exposureTime = image.exifData["ExposureTime"]?.description;
	const focalLength = image.exifData["FocalLength"]?.description;
	const iso = image.exifData["ISOSpeedRatings"]?.description;
	const make = image.exifData["Make"]?.description;
	let model = image.exifData["Model"]?.description;
	if (make && model) {
		model = model.replace(make, "");
	}
	return (
		<div className="rounded-b-xl bg-white h-full p-4 dark:bg-zinc-900 -mt-1.5 space-y-1 flex-col flex">
			<div className="flex items-center justify-between gap-2">
				<p
					className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 max-w-[325px] whitespace-nowrap text-ellipsis overflow-hidden"
					title={fileName}
				>
					{fileName}
				</p>
				<div className="flex items-center gap-2">
					<CameraIcon size={16} className="text-zinc-600 dark:text-zinc-400" />
					<p
						className="text-sm text-zinc-600 dark:text-zinc-400 max-w-[100px] md:max-w-none whitespace-nowrap text-ellipsis overflow-hidden"
						title={`${make} ${model}`}
					>
						{make && model ? `${make} ${model}` : "Analog (Film)?"}
					</p>
				</div>
			</div>
			{(aperture || exposureTime || focalLength || iso || (state && country)) && (
				<div className="flex items-center gap-2 text-xs md:text-sm">
					{state && country && (
						<div className="flex items-center gap-2">
							<MapPinnedIcon size={16} className="text-zinc-600 dark:text-zinc-400" />
							<p
								className={clsx(
									"text-zinc-600 dark:text-zinc-400 md:max-w-none whitespace-nowrap text-ellipsis overflow-hidden",
									{
										"max-w-[50px]": aperture && exposureTime && focalLength && iso,
									}
								)}
								title={`${state}, ${country}`}
							>
								{state}, {country}
							</p>
						</div>
					)}
					{aperture && state && country && <div className="h-3 w-[0.5px] rounded-full bg-zinc-300 dark:bg-zinc-500" />}
					{(aperture || exposureTime || focalLength || iso) && (
						<>
							{aperture && (
								<div className="flex items-center gap-2">
									<ApertureIcon size={16} className="text-zinc-600 dark:text-zinc-400" />
									<p className=" text-zinc-600 dark:text-zinc-400">f/{aperture}</p>
								</div>
							)}
							<div className="h-3 w-[0.5px] rounded-full bg-zinc-300 dark:bg-zinc-500" />
							{exposureTime && (
								<div className="flex items-center gap-2">
									<p className=" text-zinc-600 dark:text-zinc-400">{exposureTime}</p>
								</div>
							)}
							<div className="h-3 w-[0.5px] rounded-full bg-zinc-300 dark:bg-zinc-500" />
							{focalLength && (
								<div className="flex items-center gap-2">
									<p className=" text-zinc-600 dark:text-zinc-400">{focalLength}</p>
								</div>
							)}
							<div className="h-3 w-[0.5px] rounded-full bg-zinc-300 dark:bg-zinc-500" />
							{iso && (
								<div className="flex items-center gap-2">
									<p
										className=" text-zinc-600 dark:text-zinc-400 max-w-[50px] md:max-w-none whitespace-nowrap text-ellipsis overflow-hidden"
										title={`ISO ${iso}`}
									>
										ISO {iso}
									</p>
								</div>
							)}
						</>
					)}
				</div>
			)}
			<div className="flex justify-between gap-2 w-full flex-auto items-end">
				<p className="text-sm text-zinc-600 dark:text-zinc-400">{`${image.exifData["Image Width"]?.value}x${image.exifData["Image Height"]?.value}`}</p>
				<p className="text-sm text-zinc-600 dark:text-zinc-400">{(image.fileSize / 1000000).toFixed(2)} MB</p>
			</div>
		</div>
	);
};
