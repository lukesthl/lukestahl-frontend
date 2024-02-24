import sharp from "sharp";
import { Cache } from "./cache";

const cache = new Cache({
	path: ".next/cache",
});
export const getBase64ImageBlur = async (src: Buffer) => {
	const cached = await cache.get(src.toString());

	if (cached) {
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
			throw err;
		});
	cache.set(src.toString(), base64);
	return base64;
};
