import { getExoticWeaponsData } from "@/data"
import { ExoticWeaponsView } from "@/features/database/components/ExoticWeaponsView"
import type { ExoticWeapon } from "@/features/database/components/ExoticWeaponCard"

export default async function ExoticWeaponsPage() {
  const data = await getExoticWeaponsData()
  return <ExoticWeaponsView weapons={data as unknown as ExoticWeapon[]} />
}
