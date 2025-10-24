"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageToggle() {
	const { t, i18n } = useTranslation();

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Globe className="h-[1.2rem] w-[1.2rem]" />
					<span className="sr-only">{t("toggle_language")}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => changeLanguage("en")}>
					English
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => changeLanguage("ko")}>
					한국어
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
