import clsx from "clsx";
import { Route } from "next";
import Link from "next/link";
import React from "react";

export const SocialLink = ({
	icon: Icon,
	title,
	...props
}: React.ComponentProps<typeof Link> & { icon: React.FC<React.ComponentProps<"svg">>; title?: string }) => (
	<Link className="group -m-1 flex items-center p-1" {...props} href={props.href.toString() as Route}>
		<Icon
			className={clsx(
				"fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300",
				{
					"h-4 w-4": title,
					"h-5 w-5": !title,
				}
			)}
		/>
		{title && <span className="ml-3 font-medium text-zinc-500">{title}</span>}
	</Link>
);
