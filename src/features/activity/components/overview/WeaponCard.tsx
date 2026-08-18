'use client'

import React, { useState } from 'react'
import { Gem, Crosshair, Swords, Star } from 'lucide-react'
import Image from 'next/image'
import {
  CyberCard,
  CyberBadge,
  CyberHeading,
  CyberExpandToggle,
} from '@/components/common/CyberComponents'
import { LootWeapon } from '@/types'
import { bungieUrl } from '@/lib/bungie'
import { useWishlist } from '@/hooks/use-sherpa-store'
import { cn } from '@/lib/utils'

const NEW_PERKS = [
  'Chaos Reshaped',
  'Air Trigger',
  'Rimestealer',
  'Circle of Life',
  'Physic',
]
const VALUE_STATS = ['rpm', 'magazine', 'zoom', 'aim_assist', 'draw_time']

function PerkDisplay({ name }: { name: string }) {
  const isNew = NEW_PERKS.some((np) => name.includes(np))
  if (!isNew) return <span>{name}</span>
  return (
    <span className="group/perk relative inline-flex items-center gap-1">
      <span className="font-bold text-neon-orange drop-shadow-[0_0_5px_rgba(255,165,0,0.8)]">
        {name}
      </span>
      <CyberBadge variant="orange" size="xs" pulse={true}>
        New
      </CyberBadge>
    </span>
  )
}

function RecommendedRoll({
  label,
  perks,
  labelClass,
}: {
  label: string
  perks: string[]
  labelClass: string
}) {
  return (
    <div className="flex items-start gap-2">
      <span className={`mt-0.5 text-xs font-bold uppercase ${labelClass}`}>
        {label}
      </span>
      <span className="flex flex-wrap items-center gap-x-1.5 text-sm text-zinc-300">
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
      <span className="mb-1 block text-[10px] font-bold text-zinc-500 uppercase">
        {title}
      </span>
      <ul className="space-y-1 text-xs text-zinc-300">
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
  const { isWishlisted, toggleWishlist } = useWishlist()
  const isExotic = weapon.weapon.includes('(Exotic)')
  const name = weapon.weapon.replace('(Exotic)', '').trim()
  const badgeVariant = isExotic ? 'orange' : 'cyan'
  const headingVariant = isExotic ? 'exotic' : 'legendary'
  const barColor = isExotic ? 'bg-amber-500' : 'bg-neon-cyan'
  const hasDetails = Boolean(weapon.stats || weapon.perks)
  const wishlisted = isWishlisted(name)

  return (
    <CyberCard
      variant="zinc"
      withCorners
      className="group relative flex h-full flex-col overflow-hidden p-0"
    >
      <div className="relative flex h-32 w-full items-center justify-center overflow-hidden border-b border-zinc-800 bg-zinc-950 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950">
        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(name)}
          className={cn(
            'absolute top-3 left-3 z-10 rounded-none border p-1.5 transition-all',
            wishlisted
              ? 'border-amber-500 bg-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
              : 'border-zinc-700 bg-black/60 text-zinc-500 hover:border-amber-500/50 hover:text-amber-400',
          )}
          title={
            wishlisted
              ? 'Đã lưu vào Wishlist (Click để bỏ)'
              : 'Thêm vào Wishlist'
          }
          aria-label={wishlisted ? 'Bỏ khỏi Wishlist' : 'Thêm vào Wishlist'}
        >
          <Star className={cn('h-3.5 w-3.5', wishlisted && 'fill-amber-400')} />
        </button>

        {weapon.image ? (
          <Image
            src={bungieUrl(weapon.image)}
            alt={name}
            width={80}
            height={80}
            unoptimized={true}
            className="rounded-md border border-white/10 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          />
        ) : (
          <div className="flex flex-col items-center justify-center opacity-30">
            <Swords className="mb-2 h-12 w-12" />
            <span className="font-mono text-xs tracking-widest uppercase">
              No Image Data
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {weapon.ammoType && (
            <CyberBadge
              variant="zinc"
              className="border-zinc-700 bg-black/60 shadow-xl backdrop-blur-md"
            >
              {weapon.ammoType}
            </CyberBadge>
          )}
          {weapon.element && (
            <CyberBadge
              variant={badgeVariant}
              className="bg-black/60 shadow-xl backdrop-blur-md"
            >
              {weapon.element}
            </CyberBadge>
          )}
        </div>
      </div>

      <div className="flex flex-grow flex-col p-5">
        <div className="mb-4">
          <div className="flex items-start justify-between gap-2">
            <CyberHeading variant={headingVariant} size="md" className="mb-1">
              {name}
            </CyberHeading>
            {weapon.tier && (
              <CyberBadge
                variant="zinc"
                className="border-cyan-500/50 bg-cyan-950/30 whitespace-nowrap text-cyan-400"
              >
                Tier: {weapon.tier}
              </CyberBadge>
            )}
          </div>
          <div className="flex items-center gap-2 font-mono text-sm text-zinc-400">
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/50 p-2 font-mono text-xs">
            <Gem className="h-4 w-4 text-neon-cyan" />
            <span className="text-zinc-300">
              Source: <span className="text-neon-cyan">{weapon.source}</span>
            </span>
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
          <div className="mt-4 space-y-4 border-t border-zinc-800/50 pt-4">
            {weapon.stats && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {Object.entries(weapon.stats).map(([statName, value]) => {
                  const formattedName = statName
                    .replace('_', ' ')
                    .replace(/\b\w/g, (l) => l.toUpperCase())
                  const isValueStat = VALUE_STATS.includes(
                    statName.toLowerCase(),
                  )

                  return (
                    <div key={statName} className="flex flex-col gap-1">
                      <div className="flex items-end justify-between">
                        <span className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                          {formattedName}
                        </span>
                        <span className="font-mono text-xs text-zinc-300">
                          {value}
                        </span>
                      </div>
                      {!isValueStat && (
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-900">
                          <div
                            className={`h-full ${barColor}`}
                            style={{
                              width: `${Math.min(100, Number(value))}%`,
                            }}
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
                <h4 className="flex items-center gap-2 text-sm font-bold tracking-widest text-white uppercase">
                  <Crosshair className="text-neon-pink h-4 w-4" /> Roll đề xuất
                </h4>

                {weapon.perks.recommended_pve ||
                weapon.perks.recommended_pvp ? (
                  <div className="space-y-3">
                    {weapon.perks.recommended_pve && (
                      <RecommendedRoll
                        label="PvE:"
                        perks={weapon.perks.recommended_pve}
                        labelClass="text-neon-cyan"
                      />
                    )}
                    {weapon.perks.recommended_pvp && (
                      <RecommendedRoll
                        label="PvP:"
                        perks={weapon.perks.recommended_pvp}
                        labelClass="text-neon-pink"
                      />
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {weapon.perks.column_3 && (
                      <TraitColumn
                        title="Trait 1"
                        perks={weapon.perks.column_3}
                      />
                    )}
                    {weapon.perks.column_4 && (
                      <TraitColumn
                        title="Trait 2"
                        perks={weapon.perks.column_4}
                      />
                    )}
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
