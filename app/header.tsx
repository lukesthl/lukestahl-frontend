"use client";
import { Avatar } from "../components/header/avatar";
import { DesktopNavigation } from "../components/header/desktop.navigation";
import { ThemeToggle } from "../components/header/theme.toggle";
import { usePathname } from "next/navigation";
import { Container } from "../components/layout/container";
import { MobileNavigation } from "../components/header/mobile.navigation";

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
