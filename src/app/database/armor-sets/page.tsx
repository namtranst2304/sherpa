import type { Metadata } from "next"
import { ArmorSetsView } from "@/features/database"
import type { ArmorSet } from "@/types"
import { getArmorSetsData } from "@/data"

export const metadata: Metadata = {
  title: "Armor Sets & Set Bonuses | Destiny 2 Sherpa",
  description: "Tổng hợp các bộ giáp và hiệu ứng 2-piece / 4-piece Set Bonus trong Destiny 2.",
  openGraph: {
    title: "Armor Sets & Set Bonuses | Destiny 2 Sherpa",
    description: "Tổng hợp các bộ giáp và hiệu ứng 2-piece / 4-piece Set Bonus trong Destiny 2.",
  },
}

export default async function ArmorSetsPage() {
  const data = await getArmorSetsData()
  return <ArmorSetsView sets={data as unknown as ArmorSet[]} />
}

