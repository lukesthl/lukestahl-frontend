import React from "react";
import { GitHubIcon } from "../icons/github.icon";
import { LinkedInIcon } from "../icons/linkedin.icon";
import { MailIcon } from "../icons/mail.icon";
import { XingIcon } from "../icons/xing.icon";

export const SocialLinks: {
	icon: React.FC;
	title: string;
	href: URL;
	"aria-label": string;
}[] = [
	{
		icon: GitHubIcon,
		title: "GitHub",
		href: new URL("https://github.com/lukesthl"),
		"aria-label": "Follow me on GitHub",
	},
	{
		icon: LinkedInIcon,
		title: "LinkedIn",
		href: new URL("https://www.linkedin.com/in/luke-stahl-722b93206"),
		"aria-label": "Follow me on LinkedIn",
	},
	{
		icon: XingIcon,
		title: "Xing",
		href: new URL("https://xing.com"),
		"aria-label": "Follow me on Xing",
	},
	{
		icon: MailIcon,
		title: "luke@lukestahl.com",
		href: new URL("mailto:luke@lukestahl.com"),
		"aria-label": "Send me an email",
	},
];
