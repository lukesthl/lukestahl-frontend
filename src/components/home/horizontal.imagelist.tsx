"use client";
import clsx from "clsx";
import image1 from "../../../public/assets/images/whitemode/image-1.jpg";
import image2 from "../../../public/assets/images/whitemode/image-2.jpg";
import image3 from "../../../public/assets/images/whitemode/image-3.jpg";
import image4 from "../../../public/assets/images/whitemode/image-4.jpg";
import image5 from "../../../public/assets/images/whitemode/image-5.jpg";
import image1DarkMode from "../../../public/assets/images/darkmode/image-1.jpg";
import image2DarkMode from "../../../public/assets/images/darkmode/image-2.jpg";
import image3DarkMode from "../../../public/assets/images/darkmode/image-3.jpg";
import image4DarkMode from "../../../public/assets/images/darkmode/image-4.jpg";
import image5DarkMode from "../../../public/assets/images/darkmode/image-5.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "../utils/usetheme";

export const imagesWhiteMode = [
	{
		src: image1,
		alt: "image 1",
	},
	{
		src: image2,
		alt: "image 2",
	},
	{
		src: image3,
		alt: "image 3",
	},
	{
		src: image4,
		alt: "image 4",
	},
	{
		src: image5,
		alt: "image 5",
	},
];

export const imagesDarkMode = [
	{
		src: image1DarkMode,
		alt: "image 1",
	},
	{
		src: image2DarkMode,
		alt: "image 2",
	},
	{
		src: image3DarkMode,
		alt: "image 3",
	},
	{
		src: image4DarkMode,
		alt: "image 4",
	},
	{
		src: image5DarkMode,
		alt: "image 5",
	},
];

export const HorizontalImageList = () => {
	const [images, setImages] = useState<typeof imagesWhiteMode>(
		Array.from(imagesWhiteMode).fill({ alt: "", src: undefined as any })
	);
	const { theme } = useTheme();

	useEffect(() => {
		setImages(theme === "dark" ? imagesDarkMode : imagesWhiteMode);
	}, [theme]);

	return (
		<div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
			{images.map((image, imageIndex) => (
				<div
					key={imageIndex}
					className={clsx(
						"aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl",
						{
							"rotate-2": imageIndex % 2 === 0,
							"-rotate-2": imageIndex % 2 !== 0,
						}
					)}
				>
					{image.src ? (
						<Image
							src={image.src}
							alt={image.alt}
							placeholder="blur"
							quality={30}
							sizes="(min-width: 640px) 18rem, 11rem"
							className="absolute inset-0 h-full w-full object-cover"
						/>
					) : (
						<div className="absolute inset-0 h-full w-full object-cover bg-zinc-100 dark:bg-zinc-800"></div>
					)}
				</div>
			))}
		</div>
	);
};
