import Link, { LinkProps } from "next/link";
import React from "react";

export const SocialLink = ({ icon: Icon, ...props }: LinkProps & { icon: React.FC<React.ComponentProps<"svg">> }) => (
	<Link className="group -m-1 p-1" {...props}>
		<Icon className="h-5 w-5 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
	</Link>
);
