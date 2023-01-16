import Resource from "../../public/locales/de/common.json";
import lodashGet from "lodash/get";

interface IOptions {
	locale?: string;
	context: unknown;
}
export const translate = (key: string, options: IOptions | undefined = { context: {}, locale: "de" }) => {
	let result = lodashGet(Resource, key, key);
	if (options.context) {
		for (const [key, value] of Object.entries(options.context)) {
			result = result.replaceAll("${" + key + "}", value);
		}
	}
	return result;
};
