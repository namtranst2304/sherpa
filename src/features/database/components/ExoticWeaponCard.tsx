'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { bungieUrl } from '@/lib/bungie'
import { PerkPoolGrid } from '@/components/common/PerkRow'
import { CyberExpandToggle, CyberCard, type CyberVariant } from '@/components/common/CyberComponents'
import { MagneticButton } from '@/components/common/MagneticButton'
import {
  ExoticTraitBlock,
  ExoticCatalystBlock,
} from './ExoticCardParts'
import { DatabaseItemCard } from './DatabaseItemCard'
import { loadFullExoticWeapon } from '../lib/load-full-item'
import { useWishlist } from '@/hooks/use-sherpa-store'
import { cn } from '@/lib/utils'
import { LightGgButton } from '@/components/common/LightGgButton'
import type { ExoticWeapon, LeanExoticWeapon } from '@/types'

const DAMAGE_ICONS: Record<string, string> = {
  kinetic:
    '/common/destiny2_content/icons/DestinyDamageTypeDefinition_3385a924fd3ccb92c343ade19f19a370.png',
  solar:
    '/common/destiny2_content/icons/DestinyDamageTypeDefinition_2a1773e10968f2d088b97c22b22bba9e.png',
  arc: '/common/destiny2_content/icons/DestinyDamageTypeDefinition_092d066688b879c807c3b460afdd61e6.png',
  void: '/common/destiny2_content/icons/DestinyDamageTypeDefinition_ceb2f6197dccf3958bb31cc783eb97a0.png',
  stasis:
    '/common/destiny2_content/icons/DestinyDamageTypeDefinition_530c4c3e7981dc2aefd24fd3293482bf.png',
  strand:
    '/common/destiny2_content/icons/DestinyDamageTypeDefinition_b2fe51a94f3533f97079dfa0d27a4096.png',
}

function DamageTypeIcon({ type }: { type: string }) {
  const path = DAMAGE_ICONS[type.toLowerCase()]
  if (!path)
    return <div className="h-3 w-3 rounded-full bg-zinc-500" title={type} />
  return (
    <Image
      src={bungieUrl(path)}
      alt={type}
      title={type}
      width={16}
      height={16}
      unoptimized
      className="drop-shadow-md"
    />
  )
}

function AmmoTypeIcon({ type }: { type: string }) {
  const key = type.toLowerCase()
  if (key === 'special') {
    return (
      <Image
        src="/images/ammo/special.png"
        alt="Special"
        title="Special"
        width={20}
        height={20}
        unoptimized
        className="drop-shadow-md"
      />
    )
  }
  if (key === 'heavy') {
    return (
      <Image
        src="/images/ammo/heavy.png"
        alt="Heavy"
        title="Heavy"
        width={20}
        height={20}
        unoptimized
        className="drop-shadow-md"
      />
    )
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
  const showAmmo =
    weapon.ammoType.toLowerCase() !== 'primary' && weapon.ammoType !== 'None'
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

  const getDamageTypeVariant = (type: string): CyberVariant => {
    switch (type.toLowerCase()) {
      case 'solar': return 'orange'
      case 'arc': return 'cyan'
      case 'void': return 'purple'
      case 'stasis': return 'cyan'
      case 'strand': return 'green'
      default: return 'zinc'
    }
  }

  const cardVariant = getDamageTypeVariant(weapon.damageType)

  return (
    <DatabaseItemCard
      variant={cardVariant}
      name={weapon.name}
      iconUrl={iconUrl}
      expanded={expanded}
      action={
        <div className="flex items-center gap-1.5">
          <LightGgButton itemId={weapon.id} name={weapon.name} size="sm" />
          <MagneticButton
            type="button"
            onClick={() => toggleWishlist(weapon.name)}
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
        </div>
      }
      meta={
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-neon-cyan">
          <span>{weapon.weaponType}</span>
          <div
            className="flex shrink-0 items-center gap-1 opacity-80"
            title={weapon.slot}
          >
            <span className="rounded border border-zinc-800 bg-zinc-900/80 px-2 py-0.5 text-xs text-zinc-400 uppercase">
              {weapon.slot}
            </span>
          </div>
          <div
            className="flex shrink-0 items-center gap-1 opacity-80"
            title={weapon.damageType}
          >
            <DamageTypeIcon type={weapon.damageType} />
          </div>
          {showAmmo && (
            <div
              className="flex items-center gap-1 opacity-80"
              title={weapon.ammoType}
            >
              <AmmoTypeIcon type={weapon.ammoType} />
            </div>
          )}
        </div>
      }
    >
      {weapon.flavorText && (
        <p className="border-l-2 border-zinc-700 pl-3 text-xs text-zinc-500 italic">
          &quot;{weapon.flavorText}&quot;
        </p>
      )}

      <ExoticTraitBlock
        label="INTRINSIC TRAIT"
        iconUrl={traitIconUrl}
        name={weapon.trait.name || 'Unknown Trait'}
        description={weapon.trait.description || 'No description available.'}
        expanded={expanded}
        iconClassName="bg-zinc-900"
      />

      {hasDetails && (
        <CyberExpandToggle
          expanded={expanded}
          onToggle={handleToggle}
          collapsedLabel={
            loadingDetails ? 'Đang tải...' : 'Chi tiết / Catalyst'
          }
        />
      )}

      <AnimatePresence initial={false}>
        {expanded && details && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-6 border-t border-white/10 bg-black/20 p-4 pt-6">
              {/* Base Perks (Intrinsics/Traits) */}
              {perkPool && (
                <PerkPoolGrid
                  column1={perkPool.column1}
                  column2={perkPool.column2}
                  title1="Column 1 (Frames)"
                  title2="Column 2 (Exotic Traits)"
                />
              )}

              {/* Catalysts */}
              {catalysts && catalysts.length > 0 && (
                <ExoticCatalystBlock catalysts={catalysts} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DatabaseItemCard>
  )
}
