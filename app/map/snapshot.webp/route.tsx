import { NextResponse } from "next/server";
import { MapService } from "../../../services/map.service";

export async function GET(request: Request) {
	if (!process.env.DEFAULT_LOCATION) {
		return NextResponse.json("No default location set", { status: 500 });
	}
	const query = new URL(request.url).searchParams;
	const theme = query.get("theme");
	if (theme !== "dark" && theme !== "light") {
		return NextResponse.json("invalid theme", { status: 400 });
	}
	const mapUrl = MapService.getMapURL((process.env.DEFAULT_LOCATION || process.env.DEFAULT_LOCATION_GEO) as string, {
		colorScheme: theme,
		scale: request.headers.get("user-agent")?.includes("Mobile") ? "1" : "2",
	});
	const stream = await fetch(mapUrl).then(res => res.body);
	console.log("get map snapshot: ", mapUrl);
	return new Response(stream, {
		headers: {
			"Cache-Control": `public, max-age=${60 * 60 * 24 * 30}`,
			"content-type": "image/webp",
		},
	});
}
