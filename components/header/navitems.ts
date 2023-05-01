import { Route } from "next";

export const navItems: {
	href: Route;
	key: string;
	footerOnly?: boolean;
}[] = [
	{
		href: "/about",
		key: "navigation.about",
	},
	{
		href: "/projects",
		key: "navigation.projects",
	},
	{
		href: "/images",
		key: "navigation.photos",
	},
	{
		href: "mailto:luke@lukestahl.de" as Route,
		key: "navigation.contact",
	},
	{
		href: "/imprint",
		key: "footer.imprint",
		footerOnly: true,
	},
	{
		href: "/privacypolicy",
		key: "footer.privacypolicy",
		footerOnly: true,
	},
];
