import { ExoticWeaponsView } from "@/features/database"
import type { ExoticWeapon } from "@/types"
import { getExoticWeaponsData } from "@/data"

export default async function ExoticWeaponsPage() {
  const data = await getExoticWeaponsData()
  return <ExoticWeaponsView weapons={data as unknown as ExoticWeapon[]} />
}
