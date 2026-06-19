import { ShieldAlert, Swords, type LucideIcon } from "lucide-react"
import { RAIDS_DATA, DUNGEONS_DATA, PANTHEON_DATA } from "@/data"
import { ActivityData } from "./types"

export type ActivityItem = {
  title: string
  href: string
  description: string
}

export type ActivityCategory = {
  id: string
  title: string
  href: string
  description: string
  icon: LucideIcon
  items: ActivityItem[]
  locked?: boolean
}

const mapRaidsToItems = (): ActivityItem[] => {
  return Object.entries(RAIDS_DATA).map(([slug, data]: [string, ActivityData]) => ({
    title: data.raid_name || "Unknown Raid",
    href: `/raids/${slug}`,
    description: data.active_orbit || "Raid Location",
  }))
}

const mapDungeonsToItems = (): ActivityItem[] => {
  return Object.entries(DUNGEONS_DATA).map(([slug, data]: [string, ActivityData]) => ({
    title: data.dungeon_name || "Unknown Dungeon",
    href: `/dungeons/${slug}`,
    description: data.location || "Dungeon Location",
  }))
}

const mapPantheonToItems = (): ActivityItem[] => {
  return Object.entries(PANTHEON_DATA).map(([slug, data]: [string, ActivityData]) => ({
    title: data.raid_name || "Unknown Week",
    href: `/pantheon/${slug}`,
    description: data.active_orbit || "Pantheon Orbit",
  }))
}

import { Crown } from "lucide-react"

export const DESTINY_ACTIVITIES: Record<string, ActivityCategory> = {
  raids: {
    id: "raids",
    title: "Raids",
    href: "/raids",
    description: "Step-by-step walkthroughs for 6-player endgame activities.",
    icon: Swords,
    items: mapRaidsToItems(),
    locked: true,
  },
  dungeons: {
    id: "dungeons",
    title: "Dungeons",
    href: "/dungeons",
    description: "Comprehensive guides for 3-player mini-raids.",
    icon: ShieldAlert,
    items: mapDungeonsToItems(),
  },
  pantheon: {
    id: "pantheon",
    title: "Pantheon",
    href: "/pantheon",
    description: "The ultimate boss rush experience. Face Destiny 2's most challenging foes back-to-back.",
    icon: Crown,
    items: mapPantheonToItems(),
  }
}