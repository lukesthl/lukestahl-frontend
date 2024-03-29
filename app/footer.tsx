import Link from "next/link";
import { Container } from "../components/layout/container";
import { navItems } from "../components/header/navitems";
import { translate } from "../components/utils/translation";

export const Footer = () => (
	<footer className="mx-auto mt-16 max-w-7xl px-4 sm:mt-32 md:px-16">
		<div className="border-t-[1px] border-zinc-100 py-12 dark:border-zinc-700/40 dark:bg-zinc-900 dark:text-zinc-200 dark:ring-zinc-300/20">
			<Container>
				<div className="flex flex-wrap items-center gap-4 sm:justify-between sm:gap-0">
					<div className="flex flex-wrap gap-4">
						{navItems.map(item => (
							<Link key={item.href} href={item.href} className="text-sm font-medium hover:text-primary-500">
								{translate(item.key)}
							</Link>
						))}
					</div>
					<p className="text-sm text-zinc-500">
						{translate("footer.copyright", { context: { year: new Date().getFullYear() } })}
					</p>
				</div>
			</Container>
		</div>
	</footer>
);
