"use client";

import { useEffect } from "react";
import { Container } from "../src/components/layout/container";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<Container className="mt-16">
			<p>Oh no, something went wrong... maybe refresh?</p>
		</Container>
	);
}
