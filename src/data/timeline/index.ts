// Dynamic imports — timeline eras are only loaded when requested.
import type { ThemeColor } from "@/lib/theme"

export interface TimelineEvent {
  title: string
  description: string
  date?: string
  tags?: string[]
  image?: string
}

export interface TimelineEra {
  id: string
  name: string
  description: string
  themeColor: ThemeColor
  image?: string
  events: TimelineEvent[]
}

export const ROMAN_NUMERALS = [
  "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
  "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX",
]

const timelineImports: Array<() => Promise<{ default: unknown }>> = [
  () => import("./01-the-ancient-past.json"),
  () => import("./02-history-of-the-cabal.json"),
  () => import("./03-history-of-the-eliksni.json"),
  () => import("./04-pre-golden-age.json"),
  () => import("./05-the-golden-age.json"),
  () => import("./06-the-collapse.json"),
  () => import("./07-dark-age.json"),
  () => import("./08-the-city-age.json"),
  () => import("./09-the-young-wolf-s-ascension.json"),
  () => import("./10-the-red-war.json"),
  () => import("./11-cayde-6-s-death.json"),
  () => import("./12-return-of-the-black-fleet.json"),
  () => import("./13-the-war-against-the-witness.json"),
  () => import("./14-the-echoes-arms-race.json"),
  () => import("./15-the-fate-saga.json"),
  () => import("./16-epilogue.json"),
]

/** Load all timeline eras via dynamic imports (code-split). */
export async function getDestinyTimeline(): Promise<TimelineEra[]> {
  const mods = await Promise.all(timelineImports.map((loader) => loader()))
  return mods.map((mod) => mod.default as unknown as TimelineEra)
}
