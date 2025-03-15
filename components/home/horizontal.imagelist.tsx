"use client";
import clsx from "clsx";
import image1 from "../../public/assets/images/whitemode/image-1.jpg";
import image2 from "../../public/assets/images/whitemode/image-2.jpg";
import image3 from "../../public/assets/images/whitemode/image-3.jpg";
import image4 from "../../public/assets/images/whitemode/image-4.jpg";
import image5 from "../../public/assets/images/whitemode/image-5.jpg";
import image1DarkMode from "../../public/assets/images/darkmode/image-1.jpg";
import image2DarkMode from "../../public/assets/images/darkmode/image-2.jpg";
import image3DarkMode from "../../public/assets/images/darkmode/image-3.jpg";
import image4DarkMode from "../../public/assets/images/darkmode/image-4.jpg";
import image5DarkMode from "../../public/assets/images/darkmode/image-5.jpg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../utils/usetheme";
import { motion, useScroll, useTransform } from "framer-motion";

export const imagesWhiteMode = [
	{
		src: image1,
		alt: "Roter Sonnenuntergang mit Bäumen",
	},
	{
		src: image2,
		alt: "Wald mit einem Berg und einem See im Hintergrund",
	},
	{
		src: image3,
		alt: "U-Bahn Station mit Orangen Fliesen",
	},
	{
		src: image4,
		alt: "Landschaft mit einem See und Bergen im Hintergrund",
	},
	{
		src: image5,
		alt: "Grüner Park mit zwei Personen",
	},
];

export const imagesDarkMode = [
	{
		src: image1DarkMode,
		alt: "Bilder einer S-Bahn bei Nacht",
	},
	{
		src: image2DarkMode,
		alt: "Ich an einer Tankstelle bei Nacht",
	},
	{
		src: image3DarkMode,
		alt: "Parkhaus eines Supermarkts bei Nacht",
	},
	{
		src: image4DarkMode,
		alt: "Parkhaus bei Nacht mit einer silhuette eines Menschen",
	},
	{
		src: image5DarkMode,
		alt: "U-Bahn Station",
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

	const { scrollYProgress } = useScroll({});
	const translateX = useTransform(scrollYProgress, [0, 1], [0, -150]);
	return (
		<div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
			{images.map((image, imageIndex) => (
				<motion.div
					style={{
						x: translateX,
					}}
					initial={{ opacity: 0, scale: 0.75 }}
					animate={{ opacity: 1, scale: 1 }}
					key={`${imageIndex}-${theme}`}
				>
					<div
						key={imageIndex}
						className={clsx(
							"aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl",
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
								priority
								quality={30}
								sizes="(min-width: 640px) 18rem, 11rem"
								className="absolute inset-0 h-full w-full object-cover transition duration-300 ease-in-out transform hover:scale-105"
							/>
						) : (
							<div className="absolute inset-0 h-full w-full object-cover bg-zinc-100 dark:bg-zinc-800"></div>
						)}
					</div>
				</motion.div>
			))}
		</div>
	);
};
