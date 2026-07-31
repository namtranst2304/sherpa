import Image from "next/image"
import { bungieUrl } from "@/lib/bungie"
import type { PerkItem } from "@/types"

export type { PerkItem }

interface PerkRowProps {
  perk: PerkItem
  bordered?: boolean
}

export function PerkRow({ perk, bordered = false }: PerkRowProps) {
  return (
    <div className="flex gap-3 items-start">
      {perk.icon && (
        <Image
          src={bungieUrl(perk.icon)}
          alt={perk.name}
          width={32}
          height={32}
          className={`rounded shrink-0 bg-black${bordered ? " shadow-md border border-zinc-700/50" : ""}`}
          unoptimized
        />
      )}
      <div className="flex flex-col">
        <span className="text-sm font-bold text-zinc-200">{perk.name}</span>
        <span className="text-xs text-zinc-500 leading-relaxed">{perk.description}</span>
      </div>
    </div>
  )
}

interface PerkColumnProps {
  title: string
  perks: PerkItem[]
}

export function PerkColumn({ title, perks }: PerkColumnProps) {
  return (
    <div>
      <h4 className="text-sm font-bold text-zinc-300 uppercase mb-3 tracking-wider text-neon-cyan/80">{title}</h4>
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
    <div className="border-t border-zinc-800 pt-4 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-8">
      <PerkColumn title={title1} perks={column1} />
      <PerkColumn title={title2} perks={column2} />
    </div>
  )
}
