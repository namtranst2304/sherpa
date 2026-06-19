// ─── SHARED THEME COLOR SYSTEM ───────────────────────────────────────────────
// Single source of truth for all color theming across the app.
// Used by: DestinyTimeline, TopNav, CyberComponents, constants.ts

export type ThemeColor = "cyan" | "green" | "yellow" | "orange" | "red" | "zinc" | "purple" | "blue" | "prismatic";

export interface ThemeColorTokens {
  hex: string;
  rgb: string;
  text: string;
  border: string;
  bg: string;
  glow: string;
  shadow: string;
}

export const THEME_COLORS: Record<ThemeColor, ThemeColorTokens> = {
  cyan:   { hex: "#22d3ee", rgb: "34,211,238",   text: "text-cyan-400",   border: "border-cyan-400",   bg: "bg-cyan-400",   glow: "drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]",   shadow: "shadow-[0_0_15px_rgba(34,211,238,0.4)]" },
  green:  { hex: "#4ade80", rgb: "74,222,128",   text: "text-green-400",  border: "border-green-400",  bg: "bg-green-400",  glow: "drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]",  shadow: "shadow-[0_0_15px_rgba(74,222,128,0.4)]" },
  yellow: { hex: "#facc15", rgb: "250,204,21",   text: "text-yellow-400", border: "border-yellow-400", bg: "bg-yellow-400", glow: "drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]", shadow: "shadow-[0_0_15px_rgba(250,204,21,0.4)]" },
  orange: { hex: "#f97316", rgb: "249,115,22",   text: "text-orange-500", border: "border-orange-500", bg: "bg-orange-500", glow: "drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]", shadow: "shadow-[0_0_15px_rgba(249,115,22,0.4)]" },
  red:    { hex: "#ef4444", rgb: "239,68,68",    text: "text-red-500",    border: "border-red-500",    bg: "bg-red-500",    glow: "drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]",    shadow: "shadow-[0_0_15px_rgba(239,68,68,0.4)]" },
  zinc:   { hex: "#a1a1aa", rgb: "161,161,170",  text: "text-zinc-400",   border: "border-zinc-400",   bg: "bg-zinc-400",   glow: "drop-shadow-[0_0_8px_rgba(161,161,170,0.8)]",   shadow: "shadow-[0_0_15px_rgba(161,161,170,0.4)]" },
  purple: { hex: "#c084fc", rgb: "192,132,252",  text: "text-purple-400", border: "border-purple-400", bg: "bg-purple-400", glow: "drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]", shadow: "shadow-[0_0_15px_rgba(192,132,252,0.4)]" },
  blue:   { hex: "#60a5fa", rgb: "96,165,250",   text: "text-blue-400",   border: "border-blue-400",   bg: "bg-blue-400",   glow: "drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]",   shadow: "shadow-[0_0_15px_rgba(96,165,250,0.4)]" },
  prismatic: { hex: "#d946ef", rgb: "217,70,239", text: "text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400", border: "border-fuchsia-400", bg: "bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-cyan-500", glow: "drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]", shadow: "shadow-[0_0_15px_rgba(217,70,239,0.4)]" },
};

/** Safely get theme tokens with fallback to zinc */
export function getTheme(color: string): ThemeColorTokens {
  return THEME_COLORS[color as ThemeColor] || THEME_COLORS.zinc;
}
