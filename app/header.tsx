"use client";
import { Avatar } from "../src/components/header/avatar";
import { DesktopNavigation } from "../src/components/header/desktop.navigation";
import { ThemeToggle } from "../src/components/header/theme.toggle";
import { usePathname } from "next/navigation";
import { Container } from "../src/components/layout/container";
import { MobileNavigation } from "../src/components/header/mobile.navigation";

export const Header = () => {
	const pathname = usePathname();
	const isHomePath = pathname === "/";
	return (
		<Container>
			<div className="mt-8 flex gap-4">
				<Avatar visible={!isHomePath} />
				<div className="flex flex-1 justify-end md:justify-center">
					<DesktopNavigation currentPath={pathname} className="hidden md:block" />
					<MobileNavigation className="md:hidden" />
				</div>
				<div>
					<ThemeToggle />
				</div>
			</div>
		</Container>
	);
};
