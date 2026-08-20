// ─── SHARED THEME COLOR SYSTEM ───────────────────────────────────────────────
// Single source of truth for all color theming across the app.
// Used by: DestinyTimeline, TopNav, CyberComponents, constants.ts

export type ThemeColor =
  | 'cyan'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'zinc'
  | 'purple'
  | 'blue'
  | 'prismatic'

export interface ThemeColorTokens {
  hex: string
  rgb: string
  text: string
  border: string
  bg: string
  glow: string
  shadow: string
  hoverShadow: string
}

const THEME_COLORS: Record<ThemeColor, ThemeColorTokens> = {
  cyan: {
    hex: '#00f3ff',
    rgb: '0,243,255',
    text: 'text-cyan-400',
    border: 'border-cyan-400',
    bg: 'bg-cyan-400',
    glow: 'drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]',
    shadow: 'shadow-[0_0_15px_rgba(0,243,255,0.4)]',
    hoverShadow: 'hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]',
  },
  green: {
    hex: '#39ff14',
    rgb: '57,255,20',
    text: 'text-green-400',
    border: 'border-green-400',
    bg: 'bg-green-400',
    glow: 'drop-shadow-[0_0_8px_rgba(57,255,20,0.8)]',
    shadow: 'shadow-[0_0_15px_rgba(57,255,20,0.4)]',
    hoverShadow: 'hover:shadow-[0_0_15px_rgba(57,255,20,0.4)]',
  },
  yellow: {
    hex: '#fce205',
    rgb: '252,226,5',
    text: 'text-yellow-400',
    border: 'border-yellow-400',
    bg: 'bg-yellow-400',
    glow: 'drop-shadow-[0_0_8px_rgba(252,226,5,0.8)]',
    shadow: 'shadow-[0_0_15px_rgba(252,226,5,0.4)]',
    hoverShadow: 'hover:shadow-[0_0_15px_rgba(252,226,5,0.4)]',
  },
  orange: {
    hex: '#ff6600',
    rgb: '255,102,0',
    text: 'text-orange-500',
    border: 'border-orange-500',
    bg: 'bg-orange-500',
    glow: 'drop-shadow-[0_0_8px_rgba(255,102,0,0.8)]',
    shadow: 'shadow-[0_0_15px_rgba(255,102,0,0.4)]',
    hoverShadow: 'hover:shadow-[0_0_15px_rgba(255,102,0,0.4)]',
  },
  red: {
    hex: '#ff3333',
    rgb: '255,51,51',
    text: 'text-red-500',
    border: 'border-red-500',
    bg: 'bg-red-500',
    glow: 'drop-shadow-[0_0_8px_rgba(255,51,51,0.8)]',
    shadow: 'shadow-[0_0_15px_rgba(255,51,51,0.4)]',
    hoverShadow: 'hover:shadow-[0_0_15px_rgba(255,51,51,0.4)]',
  },
  zinc: {
    hex: '#a1a1aa',
    rgb: '161,161,170',
    text: 'text-zinc-400',
    border: 'border-zinc-400',
    bg: 'bg-zinc-400',
    glow: 'drop-shadow-[0_0_8px_rgba(161,161,170,0.8)]',
    shadow: 'shadow-[0_0_15px_rgba(161,161,170,0.4)]',
    hoverShadow: 'hover:shadow-[0_0_15px_rgba(161,161,170,0.4)]',
  },
  purple: {
    hex: '#b241ff',
    rgb: '178,65,255',
    text: 'text-purple-400',
    border: 'border-purple-400',
    bg: 'bg-purple-400',
    glow: 'drop-shadow-[0_0_8px_rgba(178,65,255,0.8)]',
    shadow: 'shadow-[0_0_15px_rgba(178,65,255,0.4)]',
    hoverShadow: 'hover:shadow-[0_0_15px_rgba(178,65,255,0.4)]',
  },
  blue: {
    hex: '#60a5fa',
    rgb: '96,165,250',
    text: 'text-blue-400',
    border: 'border-blue-400',
    bg: 'bg-blue-400',
    glow: 'drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]',
    shadow: 'shadow-[0_0_15px_rgba(96,165,250,0.4)]',
    hoverShadow: 'hover:shadow-[0_0_15px_rgba(96,165,250,0.4)]',
  },
  prismatic: {
    hex: '#d946ef',
    rgb: '217,70,239',
    text: 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400',
    border: 'border-fuchsia-400',
    bg: 'bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-cyan-500',
    glow: 'drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]',
    shadow: 'shadow-[0_0_15px_rgba(217,70,239,0.4)]',
    hoverShadow: 'hover:shadow-[0_0_15px_rgba(217,70,239,0.4)]',
  },
}

/** Safely get theme tokens with fallback to zinc */
export function getTheme(color: string): ThemeColorTokens {
  return THEME_COLORS[color as ThemeColor] || THEME_COLORS.zinc
}
