import sharp from "sharp";

const cache = new Map<string, string>();

export const getBase64ImageBlur = async (src: Buffer) => {
	const time = Date.now();
	const size = 4;
	const format = "png";
	const brightness = 1;
	const saturation = 1.2;
	const pipeline = sharp(src)
		.resize(size, size, {
			fit: "inside",
		})
		.toFormat(format)
		.modulate({
			brightness,
			saturation,
		});
	if (cache.has(src.toString())) {
		console.log("time to get cached blur", Date.now() - time + "ms");
		return cache.get(src.toString());
	}

	const base64 = await pipeline
		.clone()
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
