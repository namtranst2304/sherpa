import Image from "next/image"
import { bungieUrl } from "@/lib/bungie"

export interface PerkItem {
  name: string
  description: string
  icon: string
}

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
        {perks.map((perk, i) => (
          <PerkRow key={i} perk={perk} />
        ))}
      </div>
    </div>
  )
}
