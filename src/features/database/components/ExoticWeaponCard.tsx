"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { bungieUrl } from "@/lib/bungie"
import { PerkPoolGrid } from "@/components/common/PerkRow"
import { CyberExpandToggle } from "@/components/common/CyberComponents"
import {
  ExoticCardHeader,
  ExoticTraitBlock,
  ExoticSectionLabel,
} from "./ExoticCardParts"
import { loadFullExoticWeapon } from "../lib/load-full-item"
import { useWishlist } from "@/hooks/use-sherpa-store"
import { cn } from "@/lib/utils"
import type { ExoticWeapon, LeanExoticWeapon } from "@/types"

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

export function ExoticWeaponCard({ weapon }: { weapon: LeanExoticWeapon }) {
  const [expanded, setExpanded] = useState(false)
  const [details, setDetails] = useState<ExoticWeapon | null>(null)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const { isWishlisted, toggleWishlist } = useWishlist()

  const wishlisted = isWishlisted(weapon.name)
  const iconUrl = weapon.icon ? bungieUrl(weapon.icon) : null
  const traitIconUrl = weapon.trait.icon ? bungieUrl(weapon.trait.icon) : null
  const showAmmo = weapon.ammoType.toLowerCase() !== "primary" && weapon.ammoType !== "None"
  const hasDetails = weapon.hasPerkPool || weapon.hasCatalysts
  const perkPool = details?.trait.perkPool
  const catalysts = details?.catalysts

  const handleToggle = async () => {
    const next = !expanded
    if (next && !details && hasDetails) {
      setLoadingDetails(true)
      const full = await loadFullExoticWeapon(weapon.id)
      setDetails(full)
      setLoadingDetails(false)
    }
    setExpanded(next)
  }

  return (
    <div className="flex flex-col h-full bg-zinc-900/40 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors">
      <ExoticCardHeader
        iconUrl={iconUrl}
        name={weapon.name}
        action={
          <button
            type="button"
            onClick={() => toggleWishlist(weapon.name)}
            className={cn(
              "p-2 rounded border transition-all",
              wishlisted
                ? "bg-amber-500/20 border-amber-500 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.4)]"
                : "bg-zinc-950/60 border-zinc-800 text-zinc-500 hover:text-amber-400 hover:border-amber-500/40"
            )}
            title={wishlisted ? "Đã lưu vào Wishlist (Click để bỏ)" : "Thêm vào Wishlist"}
            aria-label={wishlisted ? "Bỏ khỏi Wishlist" : "Thêm vào Wishlist"}
          >
            <Star className={cn("w-4 h-4", wishlisted && "fill-amber-400")} />
          </button>
        }
        meta={
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
        }
      />

      <div className="p-4 flex flex-col gap-4 flex-grow">
        {weapon.flavorText && (
          <p className="text-xs italic text-zinc-500 border-l-2 border-zinc-700 pl-3">
            &quot;{weapon.flavorText}&quot;
          </p>
        )}

        <ExoticTraitBlock
          label="INTRINSIC TRAIT"
          iconUrl={traitIconUrl}
          name={weapon.trait.name || "Unknown Trait"}
          description={weapon.trait.description || "No description available."}
          expanded={expanded}
          iconClassName="bg-zinc-900"
        />

        {hasDetails && (
          <CyberExpandToggle
            expanded={expanded}
            onToggle={handleToggle}
            collapsedLabel={loadingDetails ? "Đang tải..." : "Chi tiết / Catalyst"}
          />
        )}

        {expanded && perkPool && (
          <PerkPoolGrid
            column1={perkPool.column1}
            column2={perkPool.column2}
            title1="Column 1 (Frames)"
            title2="Column 2 (Exotic Traits)"
          />
        )}

        {expanded && catalysts && catalysts.length > 0 && (
          <div>
            <ExoticSectionLabel>Catalyst(s)</ExoticSectionLabel>

            <div className="flex flex-col gap-4">
              {catalysts.map((cat, idx) => (
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
