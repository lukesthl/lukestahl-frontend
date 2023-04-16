import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import AvatarPicture from "../../../public/assets/me.png";

export const Avatar = ({ size = "small" }: { size?: "small" | "large" }) => (
	<div className="flex">
		<Link href="/" aria-label="Home" className="flex">
			<div className="text-zinc800 overflow-hidden rounded-full bg-white/90 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
				<Image
					src={AvatarPicture}
					alt="Bild von Luke Stahl"
					className={clsx("scale-150 hover:scale-125 ease-in-out duration-300 transition rounded-full object-cover", {
						"h-9 w-9": size === "small",
						"h-16 w-16": size === "large",
					})}
					quality={10}
				/>
			</div>
		</Link>
	</div>
);
