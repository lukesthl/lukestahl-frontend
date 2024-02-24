import sharp from "sharp";
import { Cache } from "./cache";

const cache = new Cache<string>({
	path: ".next/cache",
});
export const getBase64ImageBlur = async (src: Buffer, path: string) => {
	const cached = await cache.get(path);

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
	cache.set(path, base64);
	return base64;
};
