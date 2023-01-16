"use client";
import { Avatar } from "./avatar";
import { DesktopNavigation } from "./desktop.navigation";
import { ThemeToggle } from "./theme.toggle";
import { usePathname } from "next/navigation";
import { Container } from "../layout/container";
import { MobileNavigation } from "./mobile.navigation";

export const Header = () => {
	const pathname = usePathname();
	const isHomePath = pathname === "/";
	return (
		<Container>
			<div className="mt-8 flex gap-4">
				{!isHomePath && (
					<div>
						<Avatar />
					</div>
				)}
				<div className="flex flex-1 justify-end md:justify-center">
					<DesktopNavigation className="hidden md:block" />
					<MobileNavigation className="md:hidden" />
				</div>
				<div>
					<ThemeToggle />
				</div>
			</div>
		</Container>
	);
};
