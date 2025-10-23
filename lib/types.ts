export interface Stat {
  id: string;
  name: string;
  value: number;
  icon?: string; // Add optional icon property
  color?: string; // Add optional color property for UI styling
}

export type StatsArray = Stat[];

export type RollHistoryEntry = number[]; // Represents the 4 roll values for a single stat
export type FullRollHistory = RollHistoryEntry[]; // Represents the roll history for all stats in a cycle