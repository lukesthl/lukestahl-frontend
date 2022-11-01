import Link from "next/link";
import { Container } from "./container";
import { navItems } from "./header/navitems";
import { translate } from "./translation";

export const Footer = () => (
	<footer className="ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20">
		<Container className="mt-32 py-6">
			<div className="flex items-center justify-between">
				<div className="flex gap-4">
					{navItems.map(item => (
						<Link key={item.href} href={item.href} className="text-sm font-medium hover:text-primary-500">
							{translate(item.key)}
						</Link>
					))}
				</div>
				<p className="text-sm text-zinc-400">{translate("footer.copyright")}</p>
			</div>
		</Container>
	</footer>
);
