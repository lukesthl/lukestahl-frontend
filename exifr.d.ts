declare module "exifr/dist/lite.esm.mjs" {
	type Input =
		| ArrayBuffer
		| SharedArrayBuffer
		| Buffer
		| Uint8Array
		| DataView
		| string
		| Blob
		| File
		| HTMLImageElement;

	type Filter = (string | number)[];
	export function parse(data: Input, options?: Options | Filter | boolean): Promise<any>;
}
