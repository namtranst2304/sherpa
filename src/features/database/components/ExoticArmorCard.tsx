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
  ItemSourceLine,
} from "./ExoticCardParts"
import { loadFullExoticArmor } from "../lib/load-full-item"
import { useWishlist } from "@/hooks/use-sherpa-store"
import { cn } from "@/lib/utils"
import type { ExoticArmor, LeanExoticArmor } from "@/types"

export function ExoticArmorCard({ armor }: { armor: LeanExoticArmor }) {
  const [expanded, setExpanded] = useState(false)
  const [details, setDetails] = useState<ExoticArmor | null>(null)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const { isWishlisted, toggleWishlist } = useWishlist()

  const wishlisted = isWishlisted(armor.name)
  const iconUrl = armor.icon ? bungieUrl(armor.icon) : null
  const traitIconUrl = armor.trait.icon ? bungieUrl(armor.trait.icon) : null
  const perkPool = details?.trait.perkPool

  const handleToggle = async () => {
    const next = !expanded
    if (next && !details && armor.hasPerkPool) {
      setLoadingDetails(true)
      const full = await loadFullExoticArmor(armor.id)
      setDetails(full)
      setLoadingDetails(false)
    }
    setExpanded(next)
  }

  return (
    <div className="flex flex-col bg-zinc-900/50 rounded-lg border border-zinc-800/50 overflow-hidden hover:border-neon-cyan/50 transition-colors">
      <ExoticCardHeader
        iconUrl={iconUrl}
        name={armor.name}
        action={
          <button
            type="button"
            onClick={() => toggleWishlist(armor.name)}
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
          <div className="flex items-center gap-2 text-sm text-neon-cyan font-mono mt-1">
            <span>{armor.type}</span>
          </div>
        }
      />

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
        <ExoticTraitBlock
          label="EXOTIC TRAIT"
          iconUrl={traitIconUrl}
          name={armor.trait.name}
          description={armor.trait.description}
          expanded={expanded}
        />

        {armor.hasPerkPool && (
          <CyberExpandToggle
            expanded={expanded}
            onToggle={handleToggle}
            collapsedLabel={loadingDetails ? "Đang tải..." : "Chi tiết perk pool"}
          />
        )}

        {expanded && perkPool && (
          <PerkPoolGrid
            column1={perkPool.column1}
            column2={perkPool.column2}
            title1="Column 1"
            title2="Column 2"
          />
        )}

        {armor.source && <ItemSourceLine source={armor.source} />}
      </div>
    </div>
  )
}
