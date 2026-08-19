'use client'

import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { ExoticArmorCard } from './ExoticArmorCard'
import { CyberButton } from '@/components/common/CyberComponents'
import { DatabaseHeader } from './DatabaseHeader'
import {
  DatabasePageShell,
  DatabaseResultsBar,
  DatabaseEmptyState,
} from './DatabasePageChrome'
import { useWishlist } from '@/hooks/use-sherpa-store'
import { cn } from '@/lib/utils'
import type { LeanExoticArmor } from '@/types'

type ClassType = 'Titan' | 'Hunter' | 'Warlock'

interface ExoticArmorViewProps {
  armors: LeanExoticArmor[]
}

const SLOT_ORDER = [
  'Helmet',
  'Gauntlets',
  'Chest',
  'Leg',
  'Mark',
  'Cloak',
  'Bond',
]
const CLASSES: ClassType[] = ['Titan', 'Hunter', 'Warlock']

export function ExoticArmorView({ armors }: ExoticArmorViewProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeClass, setActiveClass] = useState<ClassType>('Titan')
  const [wishlistOnly, setWishlistOnly] = useState(false)
  const { isWishlisted, wishlist } = useWishlist()

  const filteredArmors = armors
    .filter((armor) => {
      const matchesSearch =
        armor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        armor.trait.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesWishlist = !wishlistOnly || isWishlisted(armor.name)
      return matchesSearch && armor.class === activeClass && matchesWishlist
    })
    .sort((a, b) => {
      const aSlotIdx = SLOT_ORDER.findIndex((slot) => a.type.includes(slot))
      const bSlotIdx = SLOT_ORDER.findIndex((slot) => b.type.includes(slot))
      if (aSlotIdx !== bSlotIdx) return aSlotIdx - bSlotIdx
      return a.name.localeCompare(b.name)
    })

  const headerActions = (
    <div className="flex w-full flex-wrap items-center gap-2 sm:w-fit">
      <CyberButton
        variant={wishlistOnly ? 'exotic' : 'zinc'}
        onClick={() => setWishlistOnly((prev) => !prev)}
        title="Chỉ hiển thị các món trong Wishlist"
      >
        <Star className={cn('h-3.5 w-3.5', wishlistOnly && 'fill-amber-400')} />
        <span>Wishlist ({wishlist.length})</span>
      </CyberButton>

      <div className="flex flex-1 gap-2 rounded-lg bg-zinc-900/50 p-1 sm:flex-none">
        {CLASSES.map((cls) => (
          <CyberButton
            key={cls}
            variant={
              activeClass === cls
                ? cls === 'Titan'
                  ? 'red'
                  : cls === 'Warlock'
                  ? 'yellow'
                  : 'cyan'
                : 'zinc'
            }
            onClick={() => setActiveClass(cls)}
            className="flex-1 sm:flex-none"
          >
            {cls}
          </CyberButton>
        ))}
      </div>
    </div>
  )

  return (
    <DatabasePageShell>
      <DatabaseHeader
        title="Giáp Exotic"
        description="Dữ liệu chi tiết về toàn bộ các giáp Exotic trong Destiny 2."
        searchPlaceholder="Tìm kiếm giáp hoặc perks..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        actions={headerActions}
      />

      <DatabaseResultsBar
        label={`${filteredArmors.length} kết quả · ${activeClass}`}
        onClear={searchTerm ? () => setSearchTerm('') : undefined}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredArmors.length > 0 ? (
          filteredArmors.map((armor) => (
            <div
              key={armor.id}
              className={
                armor.hasPerkPool
                  ? 'has-[[data-expanded=true]]:col-span-1 md:has-[[data-expanded=true]]:col-span-2 xl:has-[[data-expanded=true]]:col-span-3'
                  : ''
              }
            >
              <ExoticArmorCard armor={armor} />
            </div>
          ))
        ) : (
          <DatabaseEmptyState
            className="col-span-full"
            message={`Không tìm thấy giáp Exotic cho ${activeClass}.`}
          />
        )}
      </div>
    </DatabasePageShell>
  )
}
