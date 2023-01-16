import glob from "fast-glob";
import { readFileSync } from "fs";
import path from "path";
const Exifr = require("exifr");

export class ImageService {
	public static getImageByPath = async (path: string): Promise<IImage> => {
		const fileBuffer = readFileSync(path);
		const exifrResult = await Exifr.parse(fileBuffer);
		return { url: path.split("/public")[1], exifData: exifrResult };
	};

	public static getImages = async () => {
		let imagePaths = await glob(["public/assets/images/**/*.{png,jpg}"]);
		let images = await Promise.all(
			imagePaths.map(imagePath => this.getImageByPath(path.join(process.cwd(), `/${imagePath}`)))
		);
		// Silly JSON stringify => https://github.com/vercel/next.js/issues/11993
		return JSON.stringify(images);
	};
}

export interface IImage {
	url: string;
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
