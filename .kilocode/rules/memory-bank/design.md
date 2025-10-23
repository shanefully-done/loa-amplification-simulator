🎯 Scope

This design replicates only the Enhancement Window (the lower half of your screenshot) that displays five stat columns, enhancement levels, and control buttons (승급, 종폭, etc.).
Exclude top game info, background scene, and lower navigation icons.

⸻

1. Layout Composition

Container
• Fixed-size modal or centered panel.
• Slightly translucent dark-blue background with gold-trimmed borders.
• Rounded corners (border-radius: 12–16px).
• Subtle drop shadow for depth.

Internal Structure

Section Purpose Notes
Header Displays “Enhancement” (승급) Center-aligned, bold gold text
Stat Columns Show 5 vertical enhancement bars Equal width, spaced evenly
Footer Controls Buttons for Enhance, Reset, and stage indicator Compact, horizontally centered

⸻

2. Stat Column Design

Each column represents one stat (5 total).
All columns share identical layout:

+---------------------+
| +10 (text) |
| 🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶 (10 diamonds)
| Icon (circle) |
+---------------------+

Element Details

Element Specification
Bar height ~200–240px
Diamond count 10 fixed, vertical stack
Filled state Bright color glow with inner gradient
Empty state Dim outline only
Numeric label Below diamonds, e.g. +7
Icon Circular icon at base (sword, shield, etc.) in gold border

Color Mapping
• Stat 1: Red/orange
• Stat 2: Purple
• Stat 3: Amber
• Stat 4: Yellow
• Stat 5: Blue

Glow Intensity Example (CSS)

.filled {
background: radial-gradient(circle, #ffb347 0%, #ff6600 100%);
box-shadow: 0 0 8px 3px rgba(255, 150, 50, 0.7);
}
.empty {
border: 1px solid rgba(255,255,255,0.15);
opacity: 0.3;
}

⸻

3. Interaction Design

Interaction Behavior
Enhance (승급) Trigger one full enhancement cycle (4 rolls). Animate each diamond lighting up per roll (sequential or instant).
Reset (↻) All diamonds dim to zero instantly.
Hover/Click on Column Optional tooltip showing roll history [+2, +1, +3, +0].
Auto Reroll Active Add a subtle pulsing border or spinning indicator to show it’s looping.

Animation Timing
• Each roll: 150–200ms delay between diamond activations.
• Glow fade-in/out via CSS transitions.

⸻

4. Footer Section

Element Description
Stage Indicator Small circular selectors labeled I–VII, highlight current one (gold border).
Buttons Two large buttons side-by-side: Enhance (승급) and Reset (종폭).
Counter/Info Optional small text under buttons: “Attempts: 42” or “Cycle 5 (+35/50)”.

Button Style
• Rectangular with beveled corners.
• Gradient fill (dark blue → purple).
• Thin gold outer glow.
• On hover: brighter border.
• Disabled state: gray desaturation.

Example CSS:

button {
background: linear-gradient(180deg, #1c1747, #0a0822);
border: 1px solid gold;
border-radius: 8px;
color: #fefefe;
padding: 0.5rem 1.5rem;
font-weight: 600;
transition: all 0.15s;
}
button:hover {
border-color: #ffcc66;
box-shadow: 0 0 8px gold;
}

⸻

5. Implementation Layout (JSX)

<div className="enhancement-window">
  <h2 className="header">Enhancement</h2>

  <div className="stat-columns">
    {stats.map((stat, i) => (
      <div key={i} className="stat-column">
        <div className="diamond-stack">
          {Array.from({ length: 10 }).map((_, j) => (
            <div
              key={j}
              className={j < stat.value ? "diamond filled" : "diamond empty"}
            />
          ))}
        </div>
        <div className="stat-value">+{stat.value}</div>
        <div className="stat-icon">{stat.icon}</div>
      </div>
    ))}
  </div>

  <div className="footer">
    <div className="stage-indicators">
      {["I","II","III","IV","V","VI","VII"].map(stage => (
        <div key={stage} className="stage-dot">{stage}</div>
      ))}
    </div>
    <div className="buttons">
      <button>Enhance</button>
      <button>Reset</button>
    </div>
  </div>
</div>

⸻

6. Responsive Rule
   • Maintain 16:9 ratio within viewport.
   • Use CSS grid or flex to auto-resize diamonds.
   • Minimum width: 800px for desktop; below that, stack columns into two rows.
