"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TargetSettingModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (targetStats: number[]) => void;
	initialTargetStats: number[];
	lng: string;
}

const TargetSettingModal: React.FC<TargetSettingModalProps> = ({
	isOpen,
	onClose,
	onSave,
	initialTargetStats,
	lng,
}) => {
	const { t } = useTranslation("common", { lng });
	const [targetStats, setTargetStats] = useState<number[]>(initialTargetStats);

	useEffect(() => {
		setTargetStats(initialTargetStats);
	}, [initialTargetStats]);

	const handleStatChange = (index: number, value: string) => {
		const newTargetStats = [...targetStats];
		newTargetStats[index] = Math.max(0, Math.min(10, Number(value))); // Ensure value is between 0 and 10
		setTargetStats(newTargetStats);
	};

	const handleSave = () => {
		onSave(targetStats);
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t("setTargetStatsTitle")}</DialogTitle>
					<DialogDescription>{t("setTargetStatsDescription")}</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					{targetStats.map((stat, index) => (
						<div key={index} className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor={`stat-${index}`} className="text-right">
								{t("statLabel")} {index + 1}
							</Label>
							<Input
								id={`stat-${index}`}
								type="number"
								min="0"
								max="10"
								value={stat}
								onChange={(e) => handleStatChange(index, e.target.value)}
								className="col-span-3"
							/>
						</div>
					))}
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline" onClick={onClose}>
							{t("cancelButton")}
						</Button>
					</DialogClose>
					<Button type="submit" onClick={handleSave}>
						{t("saveChangesButton")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default TargetSettingModal;
