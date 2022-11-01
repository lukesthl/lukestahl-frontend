"use client";
import { Avatar } from "./avatar";
import { Navigation } from "./navigation";
import { ThemeToggle } from "./theme.toggle";
import { usePathname } from "next/navigation";
import { Container } from "../container";

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
				<div className="flex flex-1 justify-center">
					<Navigation />
				</div>
				<div>
					<ThemeToggle />
				</div>
			</div>
		</Container>
	);
};
