import { MapPinIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import AvatarPicture from "../../../public/assets/me-icon.png";
import { translate } from "../utils/translation";
import { MapImage } from "./map.image";

const location = process.env.DEFAULT_LOCATION;

export const LocationMap = () => {
	return (
		<div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
			<div className="flex items-center gap-2">
				<MapPinIcon className="h-[1.65rem] w-[1.65rem] fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500" />
				<p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{translate("home.resume.location")}</p>
			</div>
			<div className="mt-5">
				<div className="group relative col-span-3 flex h-full flex-shrink-0 overflow-hidden rounded-xl">
					<MapImage />
					<div className="absolute top-1/2 left-1/2 z-10 flex w-full flex-shrink-0 -translate-x-1/2 -translate-y-1/2 flex-col items-center space-y-2">
						<div aria-hidden className="absolute top-3">
							<span className="block h-12 w-12 animate-ping rounded-full bg-primary-500 duration-1000" />
						</div>

						<Image
							src={AvatarPicture}
							alt="Photo of me above a map of my current location"
							className="h-14 object-cover object-center w-14 z-20 rounded-full border border-zinc-400 dark:border-zinc-700/40 transition-transform duration-500 group-hover:-rotate-[10deg] group-hover:scale-110"
							quality={40}
						/>

						<p className="rounded-full dark:bg-white/10 shadow-lg bg-white/25 px-3 py-1 font-semibold text-sm text-zinc-600 dark:text-white/95 backdrop-blur-md">
							📍 {location}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
