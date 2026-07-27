"use client"

import React, { useState } from "react"
import { Gem } from "lucide-react"
import { CyberCard } from "@/components/common/CyberComponents"
import { ActivityData } from "@/types"
import { WeaponCard } from "./WeaponCard"
import { ArmorCard } from "./ArmorCard"
import { cn } from "@/lib/utils"

interface OverviewLootTableProps {
  loot_table: ActivityData["loot_table"]
  armor_table?: ActivityData["armor_table"]
}

function tabBtnClass(active: boolean, activeStyles: string) {
  return cn(
    "text-xs font-mono uppercase tracking-wider px-3 py-1.5 transition-colors rounded-sm border",
    active ? activeStyles : "text-zinc-500 hover:text-zinc-300 border-transparent"
  )
}

export function OverviewLootTable({ loot_table, armor_table }: OverviewLootTableProps) {
  const [activeTab, setActiveTab] = useState<"weapons" | "armor">("weapons")
  const hasArmor = Boolean(armor_table && armor_table.length > 0)

  if (!loot_table || loot_table.length === 0) return null

  return (
    <div className="space-y-8">
      <CyberCard variant="zinc" withCorners className="h-full bg-black/40 border-none">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Gem className="w-32 h-32 text-neon-orange" />
        </div>

        <div className="border-b border-neon-orange/30 pb-4 mb-8 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neon-orange/20 rounded-md">
              <Gem className="w-5 h-5 text-neon-orange" />
            </div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-neon-orange text-glow-orange">Bảng Loot</h2>
          </div>

          {hasArmor && (
            <div className="flex bg-zinc-900/50 rounded-md border border-zinc-800 p-1">
              <button
                onClick={() => setActiveTab("weapons")}
                className={tabBtnClass(activeTab === "weapons", "bg-neon-orange/20 text-neon-orange border-neon-orange/30")}
              >
                Vũ khí
              </button>
              <button
                onClick={() => setActiveTab("armor")}
                className={tabBtnClass(activeTab === "armor", "bg-cyan-500/20 text-cyan-400 border-cyan-500/30")}
              >
                Bộ giáp
              </button>
            </div>
          )}
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeTab === "weapons" && loot_table.map((weapon, i) => (
            <WeaponCard key={i} weapon={weapon} />
          ))}
          {activeTab === "armor" && armor_table?.map((armor, i) => (
            <ArmorCard key={i} armor={armor} />
          ))}
        </div>
      </CyberCard>
    </div>
  )
}
