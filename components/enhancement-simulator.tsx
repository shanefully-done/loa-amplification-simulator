"use client";

import React, { useState, useRef } from "react";
import {
	simulateCycle,
	resetStats,
	autoReroll,
} from "../lib/enhancement-engine";
import { StatsArray } from "../lib/types";
import TargetSettingModal from "./target-setting-modal"; // Import the modal component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EnhancementSimulator: React.FC = () => {
	const initialStats: StatsArray = [
		{ id: "stat1", name: "Strength", value: 0, icon: "⚔️", color: "rose" },
		{ id: "stat2", name: "Defense", value: 0, icon: "🛡️", color: "fuchsia" },
		{ id: "stat3", name: "Magic", value: 0, icon: "✨", color: "amber" },
		{ id: "stat4", name: "Intellect", value: 0, icon: "🔮", color: "green" },
		{ id: "stat5", name: "Luck", value: 0, icon: "🍀", color: "pink" },
	];
	const [stats, setStats] = useState<StatsArray>(initialStats);
	const [attemptCounter, setAttemptCounter] = useState(0);
	const [isAutoRerolling, setIsAutoRerolling] = useState(false);
	const isAutoRerollingRef = useRef(false);
	const [targetStats, setTargetStats] = useState<number[]>([0, 0, 0, 0, 0]); // Initialize with 0s
	const [isTargetModalOpen, setIsTargetModalOpen] = useState(false); // State for modal visibility

	const isAutoRerollEnabled = targetStats.some((target) => target > 0);

	const handleEnhance = () => {
		setStats(initialStats); // Reset to initial state before enhancing
		setAttemptCounter(0); // Reset attempt counter for manual enhance
		const { updatedStats } = simulateCycle(initialStats); // Use initialStats for the first roll
		setStats(updatedStats);
	};

	const handleReset = () => {
		setStats(resetStats(initialStats)); // Reset to initial state
		setAttemptCounter(0);
	};

	const handleAutoReroll = async () => {
		if (isAutoRerollingRef.current) {
			isAutoRerollingRef.current = false;
			setIsAutoRerolling(false);
			return;
		}

		setStats(initialStats); // Reset stats to initial state for auto-reroll
		setAttemptCounter(0); // Reset attempt counter for auto-reroll
		isAutoRerollingRef.current = true; // Explicitly set ref to true
		setIsAutoRerolling(true);

		await autoReroll(
			initialStats, // Pass initial stats to ensure auto-reroll starts from a fresh state
			targetStats,
			(updatedStats, cycleRollHistory, attempts) => {
				setStats(updatedStats);
				setAttemptCounter(attempts);
			},
			(finalStats, finalAttempts) => {
				isAutoRerollingRef.current = false; // Explicitly set ref to false on completion
				setIsAutoRerolling(false);
				setStats(finalStats);
				setAttemptCounter(finalAttempts);
			},
			isAutoRerollingRef
		);
	};

	return (
		<Card className="bg-background w-full max-w-full md:w-[800px] md:h-[500px] aspect-video mx-auto md:bg-card/70 md:border md:border-primary md:rounded-xl md:shadow-lg p-5 flex flex-col gap-5">
			<CardHeader className="p-0">
				<CardTitle className="text-center text-primary font-bold text-2xl">
					Amplification
				</CardTitle>
			</CardHeader>
			<CardContent className="text-sm self-center mb-16 md:mb-0">
				<h3>Attempts: {attemptCounter}</h3>
				<h3>Total Stats: {stats.reduce((sum, stat) => sum + stat.value, 0)}</h3>
			</CardContent>
			<CardContent className="flex flex-col h-full p-0">
				<div className="flex-grow flex justify-around items-end w-full">
					{stats.map((stat, i) => (
						<div
							key={stat.id}
							className={`flex flex-col items-center p-2 w-full max-w-[100px] h-[200px] justify-end stat-${
								i + 1
							} bg-${stat.color}-600`}
						>
							<div className="flex flex-col-reverse h-full justify-start gap-0.5">
								{Array.from({ length: 10 }).map((_, j) => (
									<div
										key={j}
										className={`w-5 h-5 m-0.5 rounded-sm transform rotate-45 transition-all duration-150 ease-in-out ${
											j < stat.value ? `diamond-filled-stat-${i + 1}` : "diamond empty"
										}`}
									/>
								))}
							</div>
							<div className="text-primary text-lg font-bold mt-2 md:mt-0">
								+{stat.value}
							</div>
							<div className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-primary mt-2">
								{stat.icon}
							</div>
						</div>
					))}
				</div>

				<div className="flex self-center mt-4">
					<div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
						<Button onClick={handleEnhance} className="enhancement-button">
							Amplify
						</Button>
						<Button onClick={handleReset} className="enhancement-button">
							Reset
						</Button>
						<Button
							onClick={handleAutoReroll}
							disabled={!isAutoRerollEnabled}
							className="enhancement-button"
						>
							{isAutoRerolling ? "Stop Auto Reroll" : "Auto Reroll"}
						</Button>
						<Button
							onClick={() => setIsTargetModalOpen(true)}
							className="enhancement-button"
						>
							Auto Reroll Config
						</Button>
					</div>
				</div>
				<TargetSettingModal
					isOpen={isTargetModalOpen}
					onClose={() => setIsTargetModalOpen(false)}
					onSave={(newTargetStats) => {
						setTargetStats(newTargetStats);
						setIsTargetModalOpen(false);
					}}
					initialTargetStats={targetStats}
				/>
			</CardContent>
		</Card>
	);
};

export default EnhancementSimulator;
