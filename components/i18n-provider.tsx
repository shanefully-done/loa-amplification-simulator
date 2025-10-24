"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import initTranslations from "@/lib/i18n";
import { Resource, createInstance } from "i18next";

export default function TranslationsProvider({
	children,
	locale,
	namespaces,
	resources,
}: {
	children: React.ReactNode;
	locale: string;
	namespaces: string[];
	resources?: Resource;
}) {
	const [i18n, setI18n] = useState<ReturnType<typeof createInstance>>();

	useEffect(() => {
		const initializeI18n = async () => {
			const newI18n = createInstance();
			await initTranslations(locale, namespaces as string[], newI18n, resources);
			setI18n(newI18n);
		};

		initializeI18n();
	}, [locale, namespaces, resources]);

	if (!i18n) {
		return null; // Or a loading spinner
	}

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
