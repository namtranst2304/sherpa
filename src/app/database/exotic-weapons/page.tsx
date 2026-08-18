import type { Metadata } from 'next'
import { ExoticWeaponsView } from '@/features/database'
import { getLeanExoticWeaponsData } from '@/data'

export const metadata: Metadata = {
  title: 'Exotic Weapons Database | Destiny 2 Sherpa',
  description:
    'Tra cứu toàn bộ vũ khí Exotic trong Destiny 2. Bộ lọc perk pool, catalyst, slot, loại đạn và damage type.',
  openGraph: {
    title: 'Exotic Weapons Database | Destiny 2 Sherpa',
    description:
      'Tra cứu toàn bộ vũ khí Exotic trong Destiny 2. Bộ lọc perk pool, catalyst, slot, loại đạn và damage type.',
  },
}

export default async function ExoticWeaponsPage() {
  const weapons = await getLeanExoticWeaponsData()
  return <ExoticWeaponsView weapons={weapons} />
}
