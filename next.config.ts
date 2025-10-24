/** @type {import('next').NextConfig} */
import i18nConfig from "./next-i18next.config";

const nextConfig = {
	reactStrictMode: true,
	i18n: i18nConfig.i18n,
};

export default nextConfig;
