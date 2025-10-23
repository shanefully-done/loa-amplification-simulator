Product Requirements Document (PRD)
Project Name: Game Enhancement Simulator
Framework: Next.js 15
Purpose: To simulate a game-like stat enhancement system where users can roll and reset stats under probabilistic conditions, optionally auto-rerolling toward a target configuration.

⸻

1. Overview

The Enhancement Simulator is a lightweight web application that visualizes and simulates a game’s enhancement mechanic. Users can roll all stats simultaneously up to four times per cycle. The simulation uses probability tables to generate random results and allows for automatic rerolling until user-defined target stats are met.

⸻

2. Objectives
   • Allow players to test and visualize RNG-based enhancement behavior.
   • Provide interactive feedback for each roll and the full enhancement cycle.
   • Enable users to set target stats and automatically reroll until reaching them.
   • Keep logic simple and performance high with client-only operations.

⸻

3. Core Features

3.1 Stat System
• Stats: 5 total (labels configurable or generic: Stat1–Stat5).
• Stat range: 0 to 10.
• Enhancement cycles:
• Each cycle consists of 4 rolls.
• Each roll adds a random value between 0 and 5 to each stat.
• Rolls are simultaneous for all stats.
• After 4 rolls, all stats can be reset to 0.

3.2 Probability Scaling
• Probability of roll results (0–5) is influenced by current stat values.
• Controlled via lookup table (placeholder structure below).

const probabilityTable = {
0: [0.05, 0.10, 0.25, 0.30, 0.20, 0.10], // for stat value 0
5: [0.15, 0.20, 0.25, 0.25, 0.10, 0.05], // for stat value 5
10: [0.50, 0.25, 0.15, 0.07, 0.02, 0.01], // for stat value 10
};

    •	The actual table will be provided later by the user.
    •	Probability lookup selects nearest matching stat tier.

3.3 Roll Execution
• A Roll button performs one full 4-roll enhancement sequence.
• The result displays:
• Each stat’s roll history (4 values per stat).
• Final cumulative total per stat.

3.4 Reset
• A Reset button sets all stats back to zero.

3.5 Auto-Reroll (Target Simulation)
• Target Setting: Users input a minimum desired value for each stat (e.g., STR ≥ 7).
• Auto Reroll:
• When pressed, the system continuously performs enhancement cycles (4 rolls each).
• After each cycle, checks if all 5 stats meet or exceed targets.
• Continues indefinitely until success.
• Displays a running counter of attempts (Attempts: n).
• When success achieved, stops automatically and highlights the result.

⸻

4. Functional Requirements

Function Description
generateRoll() Generates random enhancement results per stat based on current values and probability table.
updateStats() Applies generated values to current stats (capped at 10).
resetStats() Resets all stats to 0.
simulateCycle() Runs 4 rolls in sequence and outputs totals.
autoReroll() Repeats simulateCycle() until all target values are met, updating attempt counter.
renderUI() Displays current stat values, roll results, and attempt count.

⸻

5. User Interface

Layout
• Header: “Enhancement Simulator” title.
• Stats table: 5 rows × 2 columns (Stat Name | Current Value).
• Buttons:
• Roll
• Reset
• Set Target (opens modal with inputs for each stat)
• Auto Reroll
• Display panel:
• Current roll results (matrix view or compact list).
• Attempt counter (updates live during auto reroll).

UX Rules
• All operations are instant (no backend calls).
• Simple animations optional (fade or count-up).
• During auto-reroll, disable all buttons except “Stop”.

⸻

6. Non-Functional Requirements
   • Performance: Each full reroll cycle completes <100ms on modern browsers.
   • Reliability: Deterministic logic not required; use Math.random().
   • Persistence: No data storage; resets on page reload.
   • Accessibility: Buttons keyboard-navigable.
   • Scalability: Support adding more stats or changing roll limits via constants.
