import { Resource } from "i18next";

export const fallbackLng = "en";
export const languages = [fallbackLng, "ko"];
export const defaultNS = "common";
export const cookieName = "i18next";

export function getOptions(
	lng = fallbackLng,
	ns: string | string[] = defaultNS,
	resources: Resource | undefined = undefined
) {
	return {
		// debug: true,
		supportedLngs: languages,
		fallbackLng,
		lng,
		ns,
		resources,
	};
}
