"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { bungieUrl } from "@/lib/bungie"
import { PerkRow, PerkColumn, type PerkItem } from "@/components/common/PerkRow"
import { CyberExpandToggle } from "@/components/common/CyberComponents"

export interface ExoticArmor {
  id: number
  name: string
  icon: string
  class: string
  type: string
  trait: {
    name: string
    description: string
    icon: string
    perkPool?: {
      column1: PerkItem[]
      column2: PerkItem[]
    }
  }
  screenshot?: string
  source?: string
}

export function ExoticArmorCard({ armor }: { armor: ExoticArmor }) {
  const [expanded, setExpanded] = useState(false)
  const iconUrl = armor.icon ? bungieUrl(armor.icon) : null
  const traitIconUrl = armor.trait.icon ? bungieUrl(armor.trait.icon) : null
  const perkPool = armor.trait.perkPool

  return (
    <div className="flex flex-col bg-zinc-900/50 rounded-lg border border-zinc-800/50 overflow-hidden hover:border-neon-cyan/50 transition-colors">
      <div className="flex items-center gap-4 p-4 border-b border-zinc-800 bg-zinc-950/50">
        <div className="relative w-12 h-12 flex-shrink-0 bg-zinc-800 rounded">
          {iconUrl ? (
            <Image src={iconUrl} alt={armor.name} fill className="object-cover rounded" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600">?</div>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-white leading-tight">{armor.name}</h3>
          <div className="flex items-center gap-2 text-sm text-neon-cyan font-mono mt-1">
            <span>{armor.type}</span>
          </div>
        </div>
      </div>

      {armor.screenshot && (
        <div className="relative w-full aspect-[21/9] border-b border-zinc-800 bg-black/50">
          <Image
            src={bungieUrl(armor.screenshot)}
            alt={`${armor.name} screenshot`}
            fill
            className="object-cover opacity-80 mix-blend-screen"
            unoptimized
          />
        </div>
      )}

      <div className="p-4 flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3 text-neon-cyan text-sm font-black tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            <span>EXOTIC TRAIT</span>
          </div>

          <div className="flex gap-3 items-start p-3 rounded bg-black/30 border border-zinc-800/50">
            {traitIconUrl && (
              <Image src={traitIconUrl} alt={armor.trait.name} width={32} height={32} className="rounded-sm shrink-0" unoptimized />
            )}
            <div className="flex flex-col flex-1">
              <span className="font-bold text-white mb-1">{armor.trait.name}</span>
              <span className={cn(
                "text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap",
                !expanded && "line-clamp-3"
              )}>
                {armor.trait.description}
              </span>
            </div>
          </div>
        </div>

        {perkPool && (
          <CyberExpandToggle
            expanded={expanded}
            onToggle={() => setExpanded((v) => !v)}
            collapsedLabel="Chi tiết perk pool"
          />
        )}

        {expanded && perkPool && (
          <div className="border-t border-zinc-800 pt-4">
            <div className="flex flex-col gap-6 lg:hidden">
              <PerkColumn title="Column 1" perks={perkPool.column1} />
              <PerkColumn title="Column 2" perks={perkPool.column2} />
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="text-sm font-bold text-zinc-300 uppercase tracking-wider text-neon-cyan/80 pb-2 border-b border-zinc-800/50">Column 1</div>
              <div className="text-sm font-bold text-zinc-300 uppercase tracking-wider text-neon-cyan/80 pb-2 border-b border-zinc-800/50">Column 2</div>

              {Array.from({ length: Math.max(perkPool.column1.length, perkPool.column2.length) }).map((_, i) => {
                const perk1 = perkPool.column1[i]
                const perk2 = perkPool.column2[i]
                return (
                  <React.Fragment key={i}>
                    {perk1 ? <PerkRow perk={perk1} bordered /> : <div />}
                    {perk2 ? <PerkRow perk={perk2} bordered /> : <div />}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        )}

        {armor.source && (
          <div className="mt-2 pt-3 border-t border-zinc-800/50">
            <div className="flex gap-2 text-xs">
              <span className="text-zinc-500 font-bold uppercase tracking-wider shrink-0">Source:</span>
              <span className="text-zinc-300 italic">{armor.source.replace(/^Source:\s*/, "")}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
