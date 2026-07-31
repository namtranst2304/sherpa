"use client"

import React, { useState } from "react"
import { Gem, Crosshair, Swords } from "lucide-react"
import Image from "next/image"
import { CyberCard, CyberBadge, CyberHeading, CyberExpandToggle } from "@/components/common/CyberComponents"
import { LootWeapon } from "@/types"

const NEW_PERKS = ["Chaos Reshaped", "Air Trigger", "Rimestealer", "Circle of Life", "Physic"]
const VALUE_STATS = ["rpm", "magazine", "zoom", "aim_assist", "draw_time"]

function PerkDisplay({ name }: { name: string }) {
  const isNew = NEW_PERKS.some((np) => name.includes(np))
  if (!isNew) return <span>{name}</span>
  return (
    <span className="relative inline-flex items-center gap-1 group/perk">
      <span className="text-neon-orange font-bold drop-shadow-[0_0_5px_rgba(255,165,0,0.8)]">{name}</span>
      <CyberBadge variant="orange" size="xs" pulse={true}>New</CyberBadge>
    </span>
  )
}

function RecommendedRoll({ label, perks, labelClass }: { label: string; perks: string[]; labelClass: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className={`text-xs font-bold uppercase mt-0.5 ${labelClass}`}>{label}</span>
      <span className="text-sm text-zinc-300 flex flex-wrap items-center gap-x-1.5">
        {perks.map((p, i, arr) => (
          <React.Fragment key={i}>
            <PerkDisplay name={p} />
            {i < arr.length - 1 && <span className="text-zinc-600">+</span>}
          </React.Fragment>
        ))}
      </span>
    </div>
  )
}

function TraitColumn({ title, perks }: { title: string; perks: string[] }) {
  return (
    <div>
      <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-1">{title}</span>
      <ul className="text-xs text-zinc-300 space-y-1">
        {perks.map((p, i) => (
          <li key={i} className="flex items-center gap-1">
            <span className="text-zinc-600">•</span> <PerkDisplay name={p} />
          </li>
        ))}
      </ul>
    </div>
  )
}

interface WeaponCardProps {
  weapon: LootWeapon
}

export function WeaponCard({ weapon }: WeaponCardProps) {
  const [expanded, setExpanded] = useState(false)
  const isExotic = weapon.weapon.includes("(Exotic)")
  const name = weapon.weapon.replace("(Exotic)", "").trim()
  const badgeVariant = isExotic ? "orange" : "cyan"
  const headingVariant = isExotic ? "exotic" : "legendary"
  const barColor = isExotic ? "bg-amber-500" : "bg-neon-cyan"
  const hasDetails = Boolean(weapon.stats || weapon.perks)

  return (
    <CyberCard variant="zinc" withCorners className="flex flex-col h-full overflow-hidden p-0 relative group">
      <div className="h-32 w-full bg-zinc-950 relative overflow-hidden flex items-center justify-center border-b border-zinc-800 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950">
        {weapon.image ? (
          <Image
            src={weapon.image}
            alt={name}
            width={80}
            height={80}
            unoptimized={true}
            className="rounded-md border border-white/10 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          />
        ) : (
          <div className="flex flex-col items-center justify-center opacity-30">
            <Swords className="w-12 h-12 mb-2" />
            <span className="text-xs font-mono uppercase tracking-widest">No Image Data</span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {weapon.ammoType && (
            <CyberBadge variant="zinc" className="bg-black/60 backdrop-blur-md border-zinc-700 shadow-xl">{weapon.ammoType}</CyberBadge>
          )}
          {weapon.element && (
            <CyberBadge variant={badgeVariant} className="bg-black/60 backdrop-blur-md shadow-xl">{weapon.element}</CyberBadge>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-4">
          <div className="flex justify-between items-start gap-2">
            <CyberHeading variant={headingVariant} size="md" className="mb-1">
              {name}
            </CyberHeading>
            {weapon.tier && (
              <CyberBadge variant="zinc" className="border-cyan-500/50 text-cyan-400 bg-cyan-950/30 whitespace-nowrap">
                Tier: {weapon.tier}
              </CyberBadge>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-400 font-mono">
            <span>{weapon.type}</span>
            {weapon.frame && (
              <>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-300">{weapon.frame}</span>
              </>
            )}
          </div>
        </div>

        {weapon.source && (
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-mono bg-zinc-900/50 p-2 rounded-md border border-zinc-800">
            <Gem className="w-4 h-4 text-neon-cyan" />
            <span className="text-zinc-300">Source: <span className="text-neon-cyan">{weapon.source}</span></span>
          </div>
        )}

        {hasDetails && (
          <CyberExpandToggle
            expanded={expanded}
            onToggle={() => setExpanded((v) => !v)}
            className="mt-auto"
          />
        )}

        {expanded && (
          <div className="mt-4 pt-4 border-t border-zinc-800/50 space-y-4">
            {weapon.stats && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {Object.entries(weapon.stats).map(([statName, value]) => {
                  const formattedName = statName.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
                  const isValueStat = VALUE_STATS.includes(statName.toLowerCase())

                  return (
                    <div key={statName} className="flex flex-col gap-1">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">{formattedName}</span>
                        <span className="text-xs font-mono text-zinc-300">{value}</span>
                      </div>
                      {!isValueStat && (
                        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${barColor}`}
                            style={{ width: `${Math.min(100, Number(value))}%` }}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {weapon.perks && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-widest">
                  <Crosshair className="w-4 h-4 text-neon-pink" /> Roll đề xuất
                </h4>

                {(weapon.perks.recommended_pve || weapon.perks.recommended_pvp) ? (
                  <div className="space-y-3">
                    {weapon.perks.recommended_pve && (
                      <RecommendedRoll label="PvE:" perks={weapon.perks.recommended_pve} labelClass="text-neon-cyan" />
                    )}
                    {weapon.perks.recommended_pvp && (
                      <RecommendedRoll label="PvP:" perks={weapon.perks.recommended_pvp} labelClass="text-neon-pink" />
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {weapon.perks.column_3 && <TraitColumn title="Trait 1" perks={weapon.perks.column_3} />}
                    {weapon.perks.column_4 && <TraitColumn title="Trait 2" perks={weapon.perks.column_4} />}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </CyberCard>
  )
}
