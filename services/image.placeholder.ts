import sharp from "sharp";

import { Cache } from "file-system-cache";
const cache = new Cache({
	basePath: ".next/cache",
});
export const getBase64ImageBlur = async (src: Buffer) => {
	const time = Date.now();
	const cached = await cache.get(src.toString());

	if (cached) {
		console.log("get blur Url from cache in ", Date.now() - time + "ms");
		return cached;
	}
	const size = 4;
	const format = "png";
	const brightness = 1;
	const saturation = 1.2;
	const base64 = await sharp(src)
		.resize(size, size, {
			fit: "inside",
		})
		.toFormat(format)
		.modulate({
			brightness,
			saturation,
		})
		.normalise()
		.toBuffer({ resolveWithObject: true })
		.then(({ data, info }) => `data:image/${info.format};base64,${data.toString("base64")}`)
		.catch(err => {
			console.error("base64 generation failed", err);
			throw err;
		});
	console.log("time to get blur", Date.now() - time + "ms");
	cache.set(src.toString(), base64);
	return base64;
};
