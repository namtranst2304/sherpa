import { getExoticArmorData } from "@/data"
import { ExoticArmorView } from "@/features/database/components/ExoticArmorView"
import type { ExoticArmor } from "@/features/database/components/ExoticArmorCard"

export default async function ExoticArmorPage() {
  const data = await getExoticArmorData()
  return <ExoticArmorView armors={data as unknown as ExoticArmor[]} />
}
