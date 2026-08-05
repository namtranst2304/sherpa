"use client"

import React, { useState } from "react"
import { ExoticArmorCard } from "./ExoticArmorCard"
import { DatabaseHeader } from "./DatabaseHeader"
import {
  DatabasePageShell,
  DatabaseResultsBar,
  DatabaseEmptyState,
} from "./DatabasePageChrome"
import type { LeanExoticArmor } from "@/types"

type ClassType = "Titan" | "Hunter" | "Warlock"

interface ExoticArmorViewProps {
  armors: LeanExoticArmor[]
}

const SLOT_ORDER = ["Helmet", "Gauntlets", "Chest", "Leg", "Mark", "Cloak", "Bond"]
const CLASSES: ClassType[] = ["Titan", "Hunter", "Warlock"]

export function ExoticArmorView({ armors }: ExoticArmorViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeClass, setActiveClass] = useState<ClassType>("Titan")

  const filteredArmors = armors
    .filter((armor) => {
      const matchesSearch =
        armor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        armor.trait.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch && armor.class === activeClass
    })
    .sort((a, b) => {
      const aSlotIdx = SLOT_ORDER.findIndex((slot) => a.type.includes(slot))
      const bSlotIdx = SLOT_ORDER.findIndex((slot) => b.type.includes(slot))
      if (aSlotIdx !== bSlotIdx) return aSlotIdx - bSlotIdx
      return a.name.localeCompare(b.name)
    })

  const headerActions = (
    <div className="flex gap-2 p-1 bg-zinc-900/50 rounded-lg w-full sm:w-fit">
      {CLASSES.map((cls) => (
        <button
          key={cls}
          type="button"
          onClick={() => setActiveClass(cls)}
          className={`flex-1 sm:flex-none min-h-11 px-4 sm:px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${
            activeClass === cls
              ? "bg-neon-cyan text-black shadow-[0_0_15px_rgba(0,255,255,0.3)]"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800"
          }`}
        >
          {cls}
        </button>
      ))}
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
        onClear={searchTerm ? () => setSearchTerm("") : undefined}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredArmors.length > 0 ? (
          filteredArmors.map((armor) => (
            <div key={armor.id} className={armor.hasPerkPool ? "col-span-1 md:col-span-2 xl:col-span-3" : ""}>
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
