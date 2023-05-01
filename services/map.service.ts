import jwa from "jwa";

const es256 = jwa("ES256");

export class MapService {
	public static getMapURL = (
		center: string,
		options?: { colorScheme?: "dark" | "light"; scale?: string; z?: string }
	): string => {
		if (!process.env.APPLE_TEAM_ID || !process.env.APPLE_KEY_ID || !process.env.APPLE_PRIV_KEY_BASE64) {
			throw new Error("Apple MapKit credentials not set");
		}
		const params = new URLSearchParams({
			center,
			teamId: process.env.APPLE_TEAM_ID,
			keyId: process.env.APPLE_KEY_ID,
			z: "10",
			colorScheme: "dark",
			size: "340x200",
			scale: "2",
			t: "mutedStandard",
			poi: "0",
			...options,
		});

		const completePath = `/api/v1/snapshot?${params.toString()}`;

		const signature = es256.sign(
			completePath,
			Buffer.from(process.env.APPLE_PRIV_KEY_BASE64, "base64").toString("ascii")
		);

		return `https://snapshot.apple-mapkit.com${completePath}&signature=${signature}`;
	};
}
