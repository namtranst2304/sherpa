import { ExoticArmorView } from "@/features/database"
import { getLeanExoticArmorData } from "@/data"

export default async function ExoticArmorPage() {
  const armors = await getLeanExoticArmorData()
  return <ExoticArmorView armors={armors} />
}
