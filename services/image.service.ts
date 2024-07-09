import glob from "fast-glob";
import { readFile } from "fs/promises";
import path from "path";
import ExifReader from "exifreader";
import { getBase64ImageBlur } from "./image.placeholder";

export class ImageService {
	public static getImageByPath = async (path: string): Promise<IImage> => {
		const fileBuffer = await readFile(path);
		const [exifrResult, imageBlur] = await Promise.all([
			ExifReader.load(fileBuffer),
			getBase64ImageBlur(fileBuffer, path).catch(error => {
				console.log(error);
				return null;
			}),
		]);
		return {
			url: path.split("/public")[1],
			exifData: JSON.parse(JSON.stringify(exifrResult)),
			blurUrl: imageBlur || undefined,
		};
	};

	public static getImages = async (options?: { sort?: (a: IImage, b: IImage) => number }) => {
		let imagePaths = await glob([path.join(process.cwd(), "public/assets/images/**/*.{png,jpg,jpeg,JPG}")]);
		let images = await Promise.all(imagePaths.map(imagePath => this.getImageByPath(imagePath)));
		let sorted = [];
		if (options?.sort) {
			sorted = images.sort(options.sort);
		} else {
			sorted = images.sort(
				(imageA, imageB) =>
					new Date((imageB.exifData?.DateTimeOriginal as any)?.value[0] || 0).getTime() -
					new Date((imageA.exifData?.DateTimeOriginal as any)?.value[0] || 0).getTime()
			);
		}
		return sorted;
	};
}

export interface IImage {
	url: string;
	blurUrl?: string;
	exifData: ExifReader.Tags;
}
