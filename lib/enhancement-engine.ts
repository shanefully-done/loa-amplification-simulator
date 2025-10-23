import { StatsArray } from "./types";

const probabilityTable: Record<number, number[]> = {
	0: [0.2014, 0.2986, 0.2014, 0.1389, 0.1181, 0.047], // for stat value 0
	1: [0.2132, 0.3015, 0.1985, 0.1397, 0.1103, 0.0368],
	2: [0.2424, 0.303, 0.197, 0.1288, 0.0985, 0.0303],
	3: [0.256, 0.312, 0.192, 0.128, 0.088, 0.024],
	4: [0.2857, 0.3193, 0.1849, 0.1176, 0.0756, 0.0168],
	5: [0.2982, 0.3246, 0.193, 0.1053, 0.0614, 0.0175], // for stat value 5
	6: [0.3364, 0.3364, 0.1869, 0.0935, 0.0467, 0],
	7: [0.419, 0.3333, 0.1869, 0.0935, 0.0467, 0],
	8: [0.49, 0.34, 0.17, 0, 0, 0],
	9: [0.7538, 0.17, 0, 0, 0, 0],
	10: [0, 0, 0, 0, 0, 0], // for stat value 10
};

/**
 * Determines the nearest stat tier (0, 5, or 10) for a given stat value.
 * @param statValue The current value of the stat.
 * @returns The nearest tier (0, 5, or 10).
 */
function getNearestStatTier(statValue: number): 0 | 5 | 10 {
	if (statValue <= 2.5) {
		return 0;
	} else if (statValue <= 7.5) {
		return 5;
	} else {
		return 10;
	}
}

/**
 * Generates a random roll value (0-5) based on a given probability distribution.
 * @param probabilities An array of probabilities for roll values 0 through 5.
 * @returns A random integer between 0 and 5.
 */
function getRandomRollValue(probabilities: number[]): number {
	const rand = Math.random();
	let cumulativeProbability = 0;
	for (let i = 0; i < probabilities.length; i++) {
		cumulativeProbability += probabilities[i];
		if (rand < cumulativeProbability) {
			return i;
		}
	}
	return probabilities.length - 1; // Fallback, should not be reached with valid probabilities
}

/**
 * Generates random enhancement values for each stat based on current values and a probability table.
 * @param currentStats An array of current stat objects.
 * @returns An array of generated roll values, one for each stat.
 */
export function generateRoll(currentStats: StatsArray): number[] {
	const rollValues: number[] = [];

	for (const stat of currentStats) {
		const tier = getNearestStatTier(stat.value);
		const probabilities = probabilityTable[tier];
		rollValues.push(getRandomRollValue(probabilities));
	}

	return rollValues;
}

/**
 * Applies generated roll values to current stats, ensuring values do not exceed 10.
 * @param currentStats An array of current stat objects.
 * @param rollValues An array of roll values to apply to each stat.
 * @returns A new StatsArray with the updated stat values.
 */
export function updateStats(
	currentStats: StatsArray,
	rollValues: number[]
): StatsArray {
	return currentStats.map((stat, index) => {
		const newStatValue = Math.min(10, stat.value + rollValues[index]);
		return { ...stat, value: newStatValue };
	});
}

/**
 * Resets all stat values back to 0.
 * @param currentStats An array of current stat objects.
 * @returns A new StatsArray with all stat values reset to 0.
 */
export function resetStats(currentStats: StatsArray): StatsArray {
	return currentStats.map((stat) => ({ ...stat, value: 0 }));
}

/**
 * Simulates a full enhancement cycle, performing 4 rolls and updating stats.
 * @param initialStats The initial array of stat objects.
 * @returns An object containing the updated stats and the cycle's roll history.
 */
export function simulateCycle(initialStats: StatsArray): {
	updatedStats: StatsArray;
	cycleRollHistory: number[][];
} {
	let currentStats = [...initialStats];
	const cycleRollHistory: number[][] = initialStats.map(() => []); // Initialize with empty arrays for each stat

	for (let i = 0; i < 4; i++) {
		// 4 rolls per cycle
		const rollValues = generateRoll(currentStats);
		currentStats = updateStats(currentStats, rollValues);
		rollValues.forEach((value, statIndex) => {
			cycleRollHistory[statIndex].push(value);
		});
	}

	return { updatedStats: currentStats, cycleRollHistory };
}

/**
 * Checks if all current stats meet or exceed their corresponding target stats.
 * @param currentStats An array of current stat objects.
 * @param targetStats An array of target stat values.
 * @returns True if all targets are met, false otherwise.
 */
export function checkTargetsMet(
	currentStats: StatsArray,
	targetStats: number[]
): boolean {
	return currentStats.every((stat, index) => stat.value >= targetStats[index]);
}

/**
 * Continuously performs enhancement cycles until target stats are met or the process is stopped.
 * @param initialStats The initial array of stat objects.
 * @param targetStats An array of target stat values.
 * @param onCycleComplete Callback function to be called after each cycle.
 * @param onCompletion Callback function to be called when targets are met or stopped.
 * @param isStopped Function to check if the auto-reroll process should be stopped.
 */
export async function autoReroll(
	baseStatsWithIcons: StatsArray,
	targetStats: number[],
	onCycleComplete: (
		updatedStats: StatsArray,
		cycleRollHistory: number[][],
		attempts: number
	) => void,
	onCompletion: (finalStats: StatsArray, finalAttempts: number) => void,
	stopRef: React.MutableRefObject<boolean>
): Promise<void> {
	let attempts = 0;
	let lastStats: StatsArray = resetStats(baseStatsWithIcons);

	while (stopRef.current) {
		attempts++;

		// Each attempt starts fresh
		const { updatedStats, cycleRollHistory } = simulateCycle(
			resetStats(baseStatsWithIcons)
		);
		lastStats = updatedStats;

		onCycleComplete(updatedStats, cycleRollHistory, attempts);

		if (checkTargetsMet(updatedStats, targetStats)) break;

		await new Promise((resolve) => setTimeout(resolve, 50));
	}

	// Return the actual last attempt stats instead of resetting
	onCompletion(lastStats, attempts);
}
