import { ArmorSetsView } from "@/features/database"
import type { ArmorSet } from "@/types"
import { getArmorSetsData } from "@/data"

export default async function ArmorSetsPage() {
  const data = await getArmorSetsData()
  return <ArmorSetsView sets={data as unknown as ArmorSet[]} />
}
