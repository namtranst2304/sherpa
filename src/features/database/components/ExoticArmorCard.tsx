'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { bungieUrl } from '@/lib/bungie'
import { PerkPoolGrid } from '@/components/common/PerkRow'
import { CyberExpandToggle, CyberCard, type CyberVariant } from '@/components/common/CyberComponents'
import { MagneticButton } from '@/components/common/MagneticButton'
import {
  ExoticCardHeader,
  ExoticTraitBlock,
  ItemSourceLine,
} from './ExoticCardParts'
import { loadFullExoticArmor } from '../lib/load-full-item'
import { useWishlist } from '@/hooks/use-sherpa-store'
import { cn } from '@/lib/utils'
import type { ExoticArmor, LeanExoticArmor } from '@/types'

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

  const getClassVariant = (className: string): CyberVariant => {
    switch (className.toLowerCase()) {
      case 'titan': return 'red'
      case 'hunter': return 'cyan'
      case 'warlock': return 'yellow'
      default: return 'zinc'
    }
  }

  const cardVariant = getClassVariant(armor.class)

  return (
    <CyberCard 
      variant={cardVariant}
      padding="none"
      withCorners
      className="flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
    >
      <ExoticCardHeader
        iconUrl={iconUrl}
        name={armor.name}
        action={
          <MagneticButton
            type="button"
            onClick={() => toggleWishlist(armor.name)}
            className={cn(
              'rounded border p-2 transition-all',
              wishlisted
                ? 'border-amber-500 bg-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                : 'border-zinc-800 bg-zinc-950/60 text-zinc-500 hover:border-amber-500/40 hover:text-amber-400',
            )}
            title={
              wishlisted
                ? 'Đã lưu vào Wishlist (Click để bỏ)'
                : 'Thêm vào Wishlist'
            }
          >
            <Star className={cn('h-4 w-4', wishlisted && 'fill-amber-400')} />
          </MagneticButton>
        }
        meta={
          <div className="mt-1 flex items-center gap-2 font-mono text-sm text-neon-cyan">
            <span>{armor.type}</span>
          </div>
        }
      />

      {armor.screenshot && (
        <div className="relative aspect-[21/9] w-full border-b border-zinc-800 bg-black/50">
          <Image
            src={bungieUrl(armor.screenshot)}
            alt={`${armor.name} screenshot`}
            fill
            className="object-cover opacity-80 mix-blend-screen"
            unoptimized
          />
        </div>
      )}

      <div className="flex flex-col gap-4 p-4">
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
            collapsedLabel={
              loadingDetails ? 'Đang tải...' : 'Chi tiết perk pool'
            }
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
    </CyberCard>
  )
}
