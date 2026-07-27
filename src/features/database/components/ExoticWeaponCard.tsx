import React from "react"
import Image from "next/image"
import { Sparkles } from "lucide-react"

export interface ExoticWeapon {
  id: number
  name: string
  icon: string
  flavorText: string
  weaponType: string
  damageType: string
  ammoType: string
  slot: string
  trait: {
    name: string
    description: string
    icon: string
    perkPool?: {
      column1: PerkItem[]
      column2: PerkItem[]
    }
  }
  catalysts?: {
    name: string
    icon: string
    description: string
    effects: PerkItem[]
    objectives: { description: string; completionValue: number }[]
  }[]
}

type PerkItem = {
  name: string
  description: string
  icon: string
}

const bungieUrl = (path: string) => `https://www.bungie.net${path}`

function PerkRow({ perk, bordered = false }: { perk: PerkItem; bordered?: boolean }) {
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

function PerkColumn({ title, perks }: { title: string; perks: PerkItem[] }) {
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

const DAMAGE_ICONS: Record<string, string> = {
  kinetic: "/common/destiny2_content/icons/DestinyDamageTypeDefinition_3385a924fd3ccb92c343ade19f19a370.png",
  solar: "/common/destiny2_content/icons/DestinyDamageTypeDefinition_2a1773e10968f2d088b97c22b22bba9e.png",
  arc: "/common/destiny2_content/icons/DestinyDamageTypeDefinition_092d066688b879c807c3b460afdd61e6.png",
  void: "/common/destiny2_content/icons/DestinyDamageTypeDefinition_ceb2f6197dccf3958bb31cc783eb97a0.png",
  stasis: "/common/destiny2_content/icons/DestinyDamageTypeDefinition_530c4c3e7981dc2aefd24fd3293482bf.png",
  strand: "/common/destiny2_content/icons/DestinyDamageTypeDefinition_b2fe51a94f3533f97079dfa0d27a4096.png",
}

function DamageTypeIcon({ type }: { type: string }) {
  const path = DAMAGE_ICONS[type.toLowerCase()]
  if (!path) return <div className="w-3 h-3 rounded-full bg-zinc-500" title={type} />
  return <Image src={bungieUrl(path)} alt={type} title={type} width={16} height={16} unoptimized className="drop-shadow-md" />
}

function AmmoTypeIcon({ type }: { type: string }) {
  const key = type.toLowerCase()
  if (key === "special") {
    return <Image src="/images/ammo/special.png" alt="Special" title="Special" width={20} height={20} unoptimized className="drop-shadow-md" />
  }
  if (key === "heavy") {
    return <Image src="/images/ammo/heavy.png" alt="Heavy" title="Heavy" width={20} height={20} unoptimized className="drop-shadow-md" />
  }
  return null
}

export function ExoticWeaponCard({ weapon }: { weapon: ExoticWeapon }) {
  const iconUrl = weapon.icon ? bungieUrl(weapon.icon) : null
  const traitIconUrl = weapon.trait.icon ? bungieUrl(weapon.trait.icon) : null
  const perkPool = weapon.trait.perkPool
  const showAmmo = weapon.ammoType.toLowerCase() !== "primary" && weapon.ammoType !== "None"

  return (
    <div className="flex flex-col h-full bg-zinc-900/50 rounded-lg border border-zinc-800/50 overflow-hidden hover:border-neon-cyan/50 transition-colors">
      <div className="flex items-center gap-4 p-4 border-b border-zinc-800 bg-zinc-950/50">
        <div className="relative w-12 h-12 flex-shrink-0 bg-zinc-800 rounded">
          {iconUrl ? (
            <Image src={iconUrl} alt={weapon.name} fill className="object-cover rounded" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600">?</div>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-white leading-tight">{weapon.name}</h3>
          <div className="flex items-center gap-3 text-sm text-neon-cyan font-mono mt-1">
            <span>{weapon.weaponType}</span>
            <div className="flex items-center gap-1 opacity-80" title={weapon.slot}>
              <span className="text-zinc-400 text-xs uppercase bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">{weapon.slot}</span>
            </div>
            <div className="flex items-center gap-1 opacity-80" title={weapon.damageType}>
              <DamageTypeIcon type={weapon.damageType} />
            </div>
            {showAmmo && (
              <div className="flex items-center gap-1 opacity-80" title={weapon.ammoType}>
                <AmmoTypeIcon type={weapon.ammoType} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4 flex-grow">
        {weapon.flavorText && (
          <p className="text-xs italic text-zinc-500 border-l-2 border-zinc-700 pl-3">
            &quot;{weapon.flavorText}&quot;
          </p>
        )}

        <div>
          <div className="flex items-center gap-2 mb-3 text-neon-cyan text-sm font-black tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            <span>INTRINSIC TRAIT</span>
          </div>

          <div className="flex gap-3 items-start p-3 rounded bg-black/30 border border-zinc-800/50 h-full">
            {traitIconUrl && (
              <Image src={traitIconUrl} alt={weapon.trait.name} width={32} height={32} className="rounded-sm shrink-0 bg-zinc-900" unoptimized />
            )}
            <div className="flex flex-col flex-1">
              <span className="font-bold text-white mb-1">{weapon.trait.name || "Unknown Trait"}</span>
              <span className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap">{weapon.trait.description || "No description available."}</span>

              {perkPool && (
                <div className="mt-6 border-t border-zinc-800 pt-6">
                  <div className="flex flex-col gap-6 lg:hidden">
                    <PerkColumn title="Column 1 (Frames)" perks={perkPool.column1} />
                    <PerkColumn title="Column 2 (Exotic Traits)" perks={perkPool.column2} />
                  </div>

                  <div className="hidden lg:grid grid-cols-2 gap-x-8 gap-y-4">
                    <div className="text-sm font-bold text-zinc-300 uppercase tracking-wider text-neon-cyan/80 pb-2 border-b border-zinc-800/50">Column 1 (Frames)</div>
                    <div className="text-sm font-bold text-zinc-300 uppercase tracking-wider text-neon-cyan/80 pb-2 border-b border-zinc-800/50">Column 2 (Exotic Traits)</div>

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
            </div>
          </div>
        </div>

        {weapon.catalysts && weapon.catalysts.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3 text-neon-cyan text-sm font-black tracking-widest uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Catalyst(s)</span>
            </div>

            <div className="flex flex-col gap-4">
              {weapon.catalysts.map((cat, idx) => (
                <div key={idx} className="flex flex-col gap-3 p-3 rounded bg-zinc-950/80 border border-zinc-800/80">
                  <div className="flex gap-3 items-start">
                    {cat.icon && (
                      <Image src={bungieUrl(cat.icon)} alt={cat.name} width={32} height={32} className="rounded-sm shrink-0 bg-zinc-900 border border-zinc-800" unoptimized />
                    )}
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-sm">{cat.name}</span>
                      <span className="text-xs text-zinc-400 mt-1 whitespace-pre-wrap leading-relaxed">{cat.description}</span>
                    </div>
                  </div>

                  {cat.effects && cat.effects.length > 0 && (
                    <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-zinc-800/50">
                      {cat.effects.map((effect, eIdx) => (
                        <div key={eIdx} className="flex gap-2 items-start">
                          {effect.icon && (
                            <Image src={bungieUrl(effect.icon)} alt={effect.name} width={20} height={20} className="rounded-sm shrink-0" unoptimized />
                          )}
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-zinc-300">{effect.name}</span>
                            <span className="text-xs text-zinc-500 leading-relaxed">{effect.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {cat.objectives && cat.objectives.length > 0 && (
                    <div className="mt-2 text-xs text-zinc-500 flex flex-col gap-1">
                      <div className="font-semibold text-zinc-400">Unlock Requirements:</div>
                      {cat.objectives.map((obj, oIdx) => (
                        <div key={oIdx} className="flex items-center justify-between">
                          <span>{obj.description || "Kills"}</span>
                          <span className="text-neon-cyan font-mono">{obj.completionValue}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
