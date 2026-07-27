import { getArmorSetsData } from "@/data"
import { ArmorSetsView, type ArmorSet } from "@/features/database/components/ArmorSetsView"

export default async function ArmorSetsPage() {
  const data = await getArmorSetsData()
  return <ArmorSetsView sets={data as unknown as ArmorSet[]} />
}
