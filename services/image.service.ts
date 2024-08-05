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
			fileSize: fileBuffer.byteLength,
		};
	};

	public static getImages = async (options?: { sort?: "new" | "old" }) => {
		let imagePaths = await glob([path.join(process.cwd(), "public/assets/images/**/*.{png,jpg,jpeg,JPG}")]);
		let images = await Promise.all(imagePaths.map(imagePath => this.getImageByPath(imagePath)));
		let sorted = [];
		sorted = images.sort((imageA, imageB) => {
			let dateAParsingString = imageA.exifData?.CreateDate?.value || imageA.exifData.DateCreated?.value;
			if (!dateAParsingString && imageA.exifData.DateTime?.value) {
				const [year, month, dayAndHour, minute, second] = imageA.exifData.DateTime?.value.toString().trim().split(":");
				const [day, hour] = dayAndHour.split(" ");
				dateAParsingString = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
			}
			let dateBParsingString = imageB.exifData?.CreateDate?.value || imageB.exifData.DateCreated?.value;
			if (!dateBParsingString && imageB.exifData.DateTime?.value) {
				const [year, month, dayAndHour, minute, second] = imageB.exifData.DateTime?.value.toString().trim().split(":");
				const [day, hour] = dayAndHour.split(" ");
				dateBParsingString = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
			}
			const dateA = new Date(dateAParsingString || 0).getTime();
			const dateB = new Date(dateBParsingString || 0).getTime();
			if (options?.sort === "old") {
				return dateA - dateB;
			}
			return dateB - dateA;
		});
		return sorted;
	};
}

export interface IImage {
	url: string;
	blurUrl?: string;
	exifData: ExifReader.Tags;
	fileSize: number;
}
