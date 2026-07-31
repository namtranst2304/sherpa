import { ExoticArmorView } from "@/features/database"
import type { ExoticArmor } from "@/types"
import { getExoticArmorData } from "@/data"

export default async function ExoticArmorPage() {
  const data = await getExoticArmorData()
  return <ExoticArmorView armors={data as unknown as ExoticArmor[]} />
}
