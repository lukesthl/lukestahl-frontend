"use client";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export const GoBackButton = () => {
	const router = useRouter();
	return (
		<Button onClick={() => router.back()}>
			<ChevronLeftIcon className="h-6 w-6" />
		</Button>
	);
};
