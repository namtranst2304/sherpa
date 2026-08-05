import { ExoticWeaponsView } from "@/features/database"
import { getLeanExoticWeaponsData } from "@/data"

export default async function ExoticWeaponsPage() {
  const weapons = await getLeanExoticWeaponsData()
  return <ExoticWeaponsView weapons={weapons} />
}
