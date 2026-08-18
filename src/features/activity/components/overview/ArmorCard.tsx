import { LootArmorSet } from '@/types'
import Image from 'next/image'
import { CyberCard, CyberHeading } from '@/components/common/CyberComponents'
import { Shield } from 'lucide-react'
import { bungieUrl } from '@/lib/bungie'

export function ArmorCard({ armor }: { armor: LootArmorSet }) {
  const isTitan = armor.class === 'Titan'
  const isHunter = armor.class === 'Hunter'
  const isWarlock = armor.class === 'Warlock'

  let classColor: 'cyan' | 'orange' | 'yellow' | 'zinc' = 'cyan'
  if (isTitan) classColor = 'orange'
  else if (isWarlock) classColor = 'yellow'
  else if (isHunter) classColor = 'zinc'

  return (
    <CyberCard
      variant={classColor}
      withCorners
      className="group relative flex h-full flex-col p-4"
    >
      <div className="flex items-center gap-4">
        {/* Icon Area */}
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-zinc-800 bg-zinc-950 transition-colors group-hover:border-white/20">
          {armor.image ? (
            <Image
              src={bungieUrl(armor.image)}
              alt={armor.name}
              width={64}
              height={64}
              unoptimized={true}
              className="opacity-90 drop-shadow-md transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
            />
          ) : (
            <Shield className="h-8 w-8 opacity-30" />
          )}
        </div>

        {/* Info Area */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 font-mono text-xs tracking-widest text-zinc-400 uppercase">
            {armor.class} Armor Set
          </div>
          <CyberHeading
            variant="default"
            size="sm"
            className="truncate text-white"
          >
            {armor.name}
          </CyberHeading>
          <div className="mt-1 line-clamp-1 text-xs text-zinc-500">
            Source: {armor.source}
          </div>
        </div>
      </div>

      {/* Set Bonus Area */}
      {armor.setBonus && (
        <div className="mt-4 border-t border-zinc-800 pt-4">
          <div className="mb-1 font-mono text-xs text-zinc-500 uppercase">
            Raid Set Bonus
          </div>
          <div className="text-sm font-medium text-zinc-300">
            {armor.setBonus}
          </div>
        </div>
      )}
    </CyberCard>
  )
}
