"use client"

import React, { useState } from "react"
import { Star } from "lucide-react"
import { ExoticArmorCard } from "./ExoticArmorCard"
import { DatabaseHeader } from "./DatabaseHeader"
import {
  DatabasePageShell,
  DatabaseResultsBar,
  DatabaseEmptyState,
} from "./DatabasePageChrome"
import { useWishlist } from "@/hooks/use-sherpa-store"
import { cn } from "@/lib/utils"
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
    <div className="flex flex-wrap items-center gap-2 w-full sm:w-fit">
      <button
        type="button"
        onClick={() => setWishlistOnly((prev) => !prev)}
        className={cn(
          "flex items-center justify-center gap-2 min-h-11 px-4 py-2 border font-mono text-xs uppercase tracking-wider transition-all",
          wishlistOnly
            ? "bg-amber-500/20 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
            : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
        )}
        title="Chỉ hiển thị các món trong Wishlist"
      >
        <Star className={cn("w-3.5 h-3.5", wishlistOnly && "fill-amber-400")} />
        <span>Wishlist ({wishlist.length})</span>
      </button>

      <div className="flex gap-2 p-1 bg-zinc-900/50 rounded-lg flex-1 sm:flex-none">
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
