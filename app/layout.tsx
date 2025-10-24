import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import TranslationsProvider from "@/components/i18n-provider";
import { fallbackLng, languages } from "@/lib/i18n.settings";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "LOA Kit",
	description: "Tools for LOA by IxTJ",
};

export async function generateStaticParams() {
	return languages.map((lng) => ({ lng }));
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ lng: string }>;
}>) {
	const { lng } = await params;
	return (
		<html lang={lng ?? fallbackLng} suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<TranslationsProvider namespaces={["common"]} locale={lng}>
						{children}
					</TranslationsProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
