"use client";

import { useEffect } from "react";
import { Container } from "../components/layout/container";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<Container className="mt-16">
			<p>Oh nein, da ist etwas schief gelaufen... maybe refresh?</p>
		</Container>
	);
}
