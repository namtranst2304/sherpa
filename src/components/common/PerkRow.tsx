import Image from 'next/image'
import { bungieUrl } from '@/lib/bungie'
import type { PerkItem } from '@/types'

export type { PerkItem }

interface PerkRowProps {
  perk: PerkItem
  bordered?: boolean
}

function PerkRow({ perk, bordered = false }: PerkRowProps) {
  return (
    <div className="flex items-start gap-3">
      {perk.icon && (
        <Image
          src={bungieUrl(perk.icon)}
          alt={perk.name}
          width={32}
          height={32}
          className={`shrink-0 rounded bg-black${bordered ? 'border border-zinc-700/50 shadow-md' : ''}`}
          unoptimized
        />
      )}
      <div className="flex flex-col">
        <span className="text-sm font-bold text-zinc-200">{perk.name}</span>
        <span className="text-xs leading-relaxed text-zinc-500">
          {perk.description}
        </span>
      </div>
    </div>
  )
}

interface PerkColumnProps {
  title: string
  perks: PerkItem[]
}

function PerkColumn({ title, perks }: PerkColumnProps) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-bold tracking-wider text-neon-cyan/80 uppercase">
        {title}
      </h4>
      <div className="flex flex-col gap-4">
        {perks.map((perk) => (
          <PerkRow key={`${perk.name}-${perk.icon}`} perk={perk} />
        ))}
      </div>
    </div>
  )
}

/** Single responsive perk pool — avoids dual mobile/desktop DOM trees */
export function PerkPoolGrid({
  column1,
  column2,
  title1,
  title2,
}: {
  column1: PerkItem[]
  column2: PerkItem[]
  title1: string
  title2: string
}) {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 border-t border-zinc-800 pt-4 @lg:grid-cols-2 @lg:gap-x-8">
        <PerkColumn title={title1} perks={column1} />
        <PerkColumn title={title2} perks={column2} />
      </div>
    </div>
  )
}
