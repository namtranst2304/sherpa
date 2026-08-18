'use client'

import React, { useState } from 'react'
import { Gem } from 'lucide-react'
import {
  CyberCard,
  CyberSectionHeader,
} from '@/components/common/CyberComponents'
import { ActivityData } from '@/types'
import { WeaponCard } from './WeaponCard'
import { ArmorCard } from './ArmorCard'
import { cn } from '@/lib/utils'

interface OverviewLootTableProps {
  loot_table: ActivityData['loot_table']
  armor_table?: ActivityData['armor_table']
}

function tabBtnClass(active: boolean, activeStyles: string) {
  return cn(
    'min-h-11 px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors rounded-sm border',
    active
      ? activeStyles
      : 'text-zinc-500 hover:text-zinc-300 border-transparent',
  )
}

export function OverviewLootTable({
  loot_table,
  armor_table,
}: OverviewLootTableProps) {
  const [activeTab, setActiveTab] = useState<'weapons' | 'armor'>('weapons')
  const hasArmor = Boolean(armor_table && armor_table.length > 0)

  if (!loot_table || loot_table.length === 0) return null

  return (
    <div className="space-y-8">
      <CyberCard
        variant="zinc"
        withCorners
        className="h-full border-none bg-black/40"
      >
        <div className="pointer-events-none absolute top-0 right-0 p-4 opacity-5">
          <Gem className="h-32 w-32 text-neon-orange" />
        </div>

        <CyberSectionHeader
          icon={Gem}
          title="Bảng Loot"
          variant="orange"
          className="mb-8"
          actions={
            hasArmor ? (
              <div className="flex rounded-md border border-zinc-800 bg-zinc-900/50 p-1">
                <button
                  onClick={() => setActiveTab('weapons')}
                  className={tabBtnClass(
                    activeTab === 'weapons',
                    'border-neon-orange/30 bg-neon-orange/20 text-neon-orange',
                  )}
                >
                  Vũ khí
                </button>
                <button
                  onClick={() => setActiveTab('armor')}
                  className={tabBtnClass(
                    activeTab === 'armor',
                    'border-cyan-500/30 bg-cyan-500/20 text-cyan-400',
                  )}
                >
                  Bộ giáp
                </button>
              </div>
            ) : undefined
          }
        />

        <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {activeTab === 'weapons' &&
            loot_table.map((weapon, i) => (
              <WeaponCard
                key={weapon.weapon || `weapon-${i}`}
                weapon={weapon}
              />
            ))}
          {activeTab === 'armor' &&
            armor_table?.map((armor, i) => (
              <ArmorCard key={armor.name || `armor-${i}`} armor={armor} />
            ))}
        </div>
      </CyberCard>
    </div>
  )
}
