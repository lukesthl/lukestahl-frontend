import { ImageResponse } from "next/og";
import process from "process";

export const runtime = "edge";

const font = fetch(new URL("./fonts/Inter-Medium.ttf", import.meta.url)).then(res => res.arrayBuffer());

export async function GET(req: Request) {
	const fontData = await font;
	const { searchParams } = new URL(req.url);
	const title = searchParams.get("title");
	const description = searchParams.get("description");
	const date = searchParams.get("date");
	const bannerUrl = searchParams.get("bannerUrl");

	if (!title) {
		return new Response("Missing title", { status: 400 });
	}
	return new ImageResponse(
		(
			<div tw="flex flex-col w-full h-full items-center justify-center bg-black px-16">
				<div tw="bg-zinc-900 border-zinc-100 border-l border-r border-zinc-700 flex h-full w-full">
					<div tw="relative flex py-12 px-4 px-8 h-full ">
						<div tw="relative flex flex-col h-full justify-center w-full">
							<div tw="absolute top-0 flex w-full justify-between">
								{/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
								<img
									tw="w-14 h-14 rounded-full border-zinc-300 border"
									width="150px"
									height="150px"
									src="https://github.com/lukesthl.png"
								/>
								<div tw="flex flex-col items-end">
									<span tw="text-zinc-400 font-medium ml-4">{new URL(`${process.env.PUBLIC_URL}`).host}</span>
									{date && <span tw="text-zinc-400 font-medium ml-4 mt-1">{date}</span>}
								</div>
							</div>
							<div tw="flex flex-row w-full">
								{bannerUrl && (
									<div tw="flex flex-col h-full justify-center">
										{/*eslint-disable-next-line @next/next/no-img-element */}
										<img
											tw="w-48 h-32 rounded-lg mr-4"
											src={`${process.env.PUBLIC_URL}${bannerUrl}`}
											width={800}
											alt=""
											height={400}
										/>
									</div>
								)}
								<div tw={`${bannerUrl ? "w-92" : ""} flex flex-col`}>
									<h2
										tw="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 text-left mb-0"
										style={{ textWrap: "balance" }}
									>
										{title}
									</h2>
									{description && (
										<p
											tw="text-base font-medium tracking-tight text-zinc-300 text-left"
											style={{ textWrap: "balance" }}
										>
											<span>{description}</span>
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		),
		{
			fonts: [
				{
					name: "Inter",
					data: fontData,
					weight: 500,
					style: "normal",
				},
			],
			width: 800,
			height: 400,
		}
	);
}
