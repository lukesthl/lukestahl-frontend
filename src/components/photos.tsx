import clsx from "clsx";
import image1 from "../../public/assets/images/image-1.jpg";
import image2 from "../../public/assets/images/image-2.jpg";
import image3 from "../../public/assets/images/image-3.jpg";
import image4 from "../../public/assets/images/image-4.jpg";
import image5 from "../../public/assets/images/image-5.jpg";
import Image from "next/image";

const images = [
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

export const Photos = () => {
	let rotations = ["rotate-2", "-rotate-2", "rotate-2", "rotate-2", "-rotate-2"];

	return (
		<div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
			{images.map((image, imageIndex) => (
				<div
					key={imageIndex}
					className={clsx(
						"aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl",
						rotations[imageIndex % rotations.length]
					)}
				>
					<Image
						src={image.src}
						alt={image.alt}
						sizes="(min-width: 640px) 18rem, 11rem"
						className="absolute inset-0 h-full w-full object-cover"
					/>
				</div>
			))}
		</div>
	);
};
