"use client";
import Image from "next/image";
import { useTheme } from "../utils/usetheme";

export const MapImage = () => {
	const { theme } = useTheme();
	return !theme ? (
		<div className="w-full h-[215px] bg-zinc-100 dark:bg-zinc-800"></div>
	) : (
		<Image
			src={`/map/snapshot.png?theme=${theme}`}
			unoptimized
			className="h-full w-full bg-black object-cover object-center"
			alt="TODO"
			width={680}
			height={400}
		/>
	);
};
