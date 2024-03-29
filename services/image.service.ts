import glob from "fast-glob";
import { readFile } from "fs/promises";
import path from "path";
import Exifr from "exifr/dist/lite.esm.mjs";
import { getBase64ImageBlur } from "./image.placeholder";

export class ImageService {
	public static getImageByPath = async (path: string): Promise<IImage> => {
		const fileBuffer = await readFile(path);
		const [exifrResult, imageBlur] = await Promise.all([
			Exifr.parse(fileBuffer),
			getBase64ImageBlur(fileBuffer, path).catch(error => {
				console.log(error);
				return null;
			}),
		]);

		return { url: path.split("/public")[1], exifData: exifrResult, blurUrl: imageBlur || undefined };
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
					new Date(imageB.exifData?.DateTimeOriginal || 0).getTime() -
					new Date(imageA.exifData?.DateTimeOriginal || 0).getTime()
			);
		}
		return sorted;
	};
}

export interface IImage {
	url: string;
	blurUrl?: string;
	exifData: IExifData;
}

interface IExifData {
	Make?: string;
	Model?: string;
	XResolution: number;
	YResolution: number;
	ResolutionUnit: string;
	Software: string;
	ModifyDate: string;
	ExposureTime?: number;
	FNumber?: number;
	ExposureProgram?: number | string;
	ISO?: number;
	SensitivityType?: number;
	RecommendedExposureIndex?: number;
	ExifVersion: string;
	DateTimeOriginal?: string;
	CreateDate?: string;
	OffsetTime: string;
	OffsetTimeOriginal?: string;
	OffsetTimeDigitized?: string;
	ShutterSpeedValue?: number;
	ApertureValue?: number;
	BrightnessValue?: number;
	ExposureCompensation?: number;
	MaxApertureValue?: number;
	MeteringMode?: string;
	LightSource?: string;
	Flash?: string;
	FocalLength?: number;
	ColorSpace: number;
	FocalPlaneXResolution?: number;
	FocalPlaneYResolution?: number;
	FocalPlaneResolutionUnit?: string;
	FileSource?: string;
	SceneType?: string;
	CustomRendered?: string;
	ExposureMode?: string;
	WhiteBalance?: string;
	DigitalZoomRatio?: number;
	FocalLengthIn35mmFormat?: number;
	SceneCaptureType?: string;
	Contrast?: string;
	Saturation?: string;
	Sharpness?: string;
	LensInfo?: (null | number | number)[];
	LensModel?: string;
	Artist?: string;
	SubSecTimeOriginal?: string;
	SubSecTimeDigitized?: string;
	SerialNumber?: string;
	LensSerialNumber?: string;
}
