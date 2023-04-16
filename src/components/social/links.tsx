import React from "react";
import { GitHubIcon } from "../icons/github.icon";
import { LinkedInIcon } from "../icons/linkedin.icon";
import { MailIcon } from "../icons/mail.icon";
import { XingIcon } from "../icons/xing.icon";

export const SocialLinks: {
	icon: React.FC;
	title: string;
	href: URL;
}[] = [
	{
		icon: GitHubIcon,
		title: "GitHub",
		href: new URL("https://github.com/lukesthl"),
	},
	{
		icon: LinkedInIcon,
		title: "LinkedIn",
		href: new URL("https://www.linkedin.com/in/luke-stahl-722b93206"),
	},
	{
		icon: XingIcon,
		title: "Xing",
		href: new URL("https://xing.com"),
	},
	{
		icon: MailIcon,
		title: "luke@lukestahl.com",
		href: new URL("mailto:luke@lukestahl.com"),
	},
];
