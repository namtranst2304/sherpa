import { ShieldAlert, Swords, Crown, Target, Database, type LucideIcon } from "lucide-react"
import { RAIDS_DATA, DUNGEONS_DATA, PANTHEON_DATA, EXOTIC_MISSIONS_DATA } from "@/data"
import { ActivityData } from "@/types"


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

const mapExoticMissionsToItems = (): ActivityItem[] => {
  return Object.entries(EXOTIC_MISSIONS_DATA).map(([slug, data]: [string, ActivityData]) => ({
    title: data.dungeon_name || data.raid_name || "Unknown Mission",
    href: `/exotic-missions/${slug}`,
    description: data.location || data.active_orbit || "Mission Location",
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
  },
  exotic_missions: {
    id: "exotic-missions",
    title: "Exotic Missions",
    href: "/exotic-missions",
    description: "Nhiệm vụ đặc biệt ẩn chứa những món vũ khí Exotic uy lực nhất.",
    icon: Target,
    items: mapExoticMissionsToItems(),
    themeColor: "yellow"
  },
  database: {
    id: "database",
    title: "Database",
    href: "/database",
    description: "Cơ sở dữ liệu chọn lọc các trang bị META và mạnh nhất Destiny 2.",
    icon: Database,
    items: [
      { title: "Exotic Armor", href: "/database/exotic-armor", description: "Tra cứu hệ thống giáp Exotic của 3 class và Exotic Class Items." },
      { title: "Armor Sets", href: "/database/armor-sets", description: "Tổng hợp các bộ giáp và hiệu ứng Set Bonus trong Destiny 2." },
      { title: "Exotic Catalysts", href: "/database/catalysts", description: "Tra cứu hiệu ứng nâng cấp Catalyst của các vũ khí Exotic." }
    ],
    themeColor: "zinc"
  }
}