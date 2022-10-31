import Resource from "../../public/locales/de/common.json";
import lodashGet from "lodash/get";

export const translate = (key: string, locale = "de") =>
  lodashGet(Resource, key, key);
