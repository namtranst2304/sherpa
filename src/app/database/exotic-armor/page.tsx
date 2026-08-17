import type { Metadata } from "next"
import { ExoticArmorView } from "@/features/database"
import { getLeanExoticArmorData } from "@/data"

export const metadata: Metadata = {
  title: "Exotic Armor Database | Destiny 2 Sherpa",
  description: "Tra cứu toàn bộ giáp Exotic của Titan, Hunter và Warlock trong Destiny 2. Bộ lọc perk pool và slot giáp.",
  openGraph: {
    title: "Exotic Armor Database | Destiny 2 Sherpa",
    description: "Tra cứu toàn bộ giáp Exotic của Titan, Hunter và Warlock trong Destiny 2. Bộ lọc perk pool và slot giáp.",
  },
}

export default async function ExoticArmorPage() {
  const armors = await getLeanExoticArmorData()
  return <ExoticArmorView armors={armors} />
}

