import { ShieldAlert, Swords, type LucideIcon } from "lucide-react"

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
}

export const DESTINY_ACTIVITIES: Record<string, ActivityCategory> = {
  raids: {
    id: "raids",
    title: "Raids",
    href: "/raids",
    description: "Step-by-step walkthroughs for 6-player endgame activities.",
    icon: Swords,
    items: [
      { title: "Salvation's Edge", href: "/raids/salvations-edge", description: "The Final Shape raid guide." },
      { title: "Crota's End", href: "/raids/crotas-end", description: "Vanquish the Son of Oryx." },
      { title: "Root of Nightmares", href: "/raids/root-of-nightmares", description: "A threat emerges from the Witness's ship." },
      { title: "Vow of the Disciple", href: "/raids/vow-of-the-disciple", description: "Venture into the Sunken Pyramid." },
    ],
  },
  dungeons: {
    id: "dungeons",
    title: "Dungeons",
    href: "/dungeons",
    description: "Comprehensive guides for 3-player mini-raids.",
    icon: ShieldAlert,
    items: [
      { title: "Warlord's Ruin", href: "/dungeons/warlords-ruin", description: "Scale the mountain and break the curse." },
      { title: "Ghosts of the Deep", href: "/dungeons/ghosts-of-the-deep", description: "Descend into Titan's methane ocean." },
      { title: "Spire of the Watcher", href: "/dungeons/spire-of-the-watcher", description: "Infiltrate the Mars Seraph facility." },
      { title: "Duality", href: "/dungeons/duality", description: "Dive into Calus's mindscape." },
    ],
  },
}