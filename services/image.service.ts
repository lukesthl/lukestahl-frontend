import glob from "fast-glob";
import { readFileSync } from "fs";
import path from "path";
import Exifr from "exifr/dist/lite.esm.mjs";
import { getPlaiceholder } from "plaiceholder";

export class ImageService {
	public static getImageByPath = async (path: string): Promise<IImage> => {
		const fileBuffer = readFileSync(path);
		const [exifrResult, imageBlur] = await Promise.all([
			Exifr.parse(fileBuffer),
			getPlaiceholder(fileBuffer).catch(error => {
				console.log(error);
				return null;
			}),
		]);

		return { url: path.split("/public")[1], exifData: exifrResult, blurUrl: imageBlur?.base64 };
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
		console.log("total images", images.length);
		// Silly JSON stringify => https://github.com/vercel/next.js/issues/11993
		return JSON.stringify(sorted);
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
