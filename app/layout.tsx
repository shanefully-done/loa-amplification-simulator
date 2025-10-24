import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { languages } from "@/lib/i18n.settings";
import { I18nProvider } from "@/components/i18n-provider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export async function generateStaticParams() {
	return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
	title: "LOA Kit",
	description: "Tools for LOA by IxTJ",
};

export default function RootLayout({
	children,
	params: { lng },
}: Readonly<{
	children: React.ReactNode;
	params: { lng: string };
}>) {
	return (
		<html lang={lng}>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<I18nProvider lng={lng} ns="common">
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</I18nProvider>
			</body>
		</html>
	);
}
