import { ShieldAlert, Swords, Crown, type LucideIcon } from "lucide-react"
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
  themeColor: "cyan" | "green" | "yellow" | "orange" | "red" | "zinc"
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



export const DESTINY_ACTIVITIES: Record<string, ActivityCategory> = {
  raids: {
    id: "raids",
    title: "Raids",
    href: "/raids",
    description: "Hướng dẫn chi tiết từng bước cho các hoạt động endgame 6 người.",
    icon: Swords,
    items: mapRaidsToItems(),
    locked: true,
    themeColor: "cyan"
  },
  dungeons: {
    id: "dungeons",
    title: "Dungeons",
    href: "/dungeons",
    description: "Hướng dẫn toàn tập cho các mini-raid 3 người.",
    icon: ShieldAlert,
    items: mapDungeonsToItems(),
    themeColor: "green"
  },
  pantheon: {
    id: "pantheon",
    title: "Pantheon",
    href: "/pantheon",
    description: "Trải nghiệm đánh boss liên hoàn đỉnh cao. Đối đầu với những kẻ thù khó nhằn nhất Destiny 2.",
    icon: Crown,
    items: mapPantheonToItems(),
    themeColor: "cyan"
  }
}