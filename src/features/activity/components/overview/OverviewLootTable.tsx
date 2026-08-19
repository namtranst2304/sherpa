'use client'

import React, { useState } from 'react'
import { Gem } from 'lucide-react'
import {
  CyberCard,
  CyberSectionHeader,
  CyberButton,
} from '@/components/common/CyberComponents'
import { ActivityData } from '@/types'
import { WeaponCard } from './WeaponCard'
import { ArmorCard } from './ArmorCard'

interface OverviewLootTableProps {
  loot_table: ActivityData['loot_table']
  armor_table?: ActivityData['armor_table']
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
              <div className="flex rounded-md border border-zinc-800 bg-zinc-900/50 p-1 gap-1">
                <CyberButton
                  variant={activeTab === 'weapons' ? 'orange' : 'zinc'}
                  size="sm"
                  glow={activeTab === 'weapons'}
                  onClick={() => setActiveTab('weapons')}
                >
                  Vũ khí
                </CyberButton>
                <CyberButton
                  variant={activeTab === 'armor' ? 'cyan' : 'zinc'}
                  size="sm"
                  glow={activeTab === 'armor'}
                  onClick={() => setActiveTab('armor')}
                >
                  Bộ giáp
                </CyberButton>
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
