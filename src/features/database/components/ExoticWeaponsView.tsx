"use client"

import React, { useState, useMemo } from "react"
import { Star } from "lucide-react"
import { ExoticWeaponCard } from "./ExoticWeaponCard"
import { DatabaseHeader } from "./DatabaseHeader"
import { DatabaseFilterSelect } from "./DatabaseFilterSelect"
import {
  DatabasePageShell,
  DatabaseResultsBar,
  DatabaseEmptyState,
} from "./DatabasePageChrome"
import { useWishlist } from "@/hooks/use-sherpa-store"
import { cn } from "@/lib/utils"
import type { LeanExoticWeapon } from "@/types"

interface ExoticWeaponsViewProps {
  weapons: LeanExoticWeapon[]
}

export function ExoticWeaponsView({ weapons }: ExoticWeaponsViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSlot, setSelectedSlot] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [wishlistOnly, setWishlistOnly] = useState(false)
  const { isWishlisted, wishlist } = useWishlist()

  const weaponTypes = useMemo(() => {
    const types = new Set<string>()
    weapons.forEach((w) => {
      if (w.weaponType) types.add(w.weaponType)
    })
    return ["All", ...Array.from(types).sort()]
  }, [weapons])

  const slots = ["All", "Kinetic", "Energy", "Power"]
  const hasFilters = Boolean(searchTerm || selectedSlot !== "All" || selectedType !== "All" || wishlistOnly)

  const filteredWeapons = weapons.filter((weapon) => {
    const q = searchTerm.toLowerCase()
    const matchesSearch =
      weapon.name.toLowerCase().includes(q) ||
      weapon.weaponType.toLowerCase().includes(q) ||
      weapon.damageType.toLowerCase().includes(q) ||
      weapon.ammoType.toLowerCase().includes(q) ||
      (weapon.trait?.name?.toLowerCase() || "").includes(q)

    const matchesSlot = selectedSlot === "All" || weapon.slot === selectedSlot
    const matchesType = selectedType === "All" || weapon.weaponType === selectedType
    const matchesWishlist = !wishlistOnly || isWishlisted(weapon.name)

    return matchesSearch && matchesSlot && matchesType && matchesWishlist
  })

  const headerActions = (
    <>
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

      <DatabaseFilterSelect
        label="Lọc theo slot"
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value)}
        options={slots.map((s) => ({
          value: s,
          label: s === "All" ? "Tất cả slot" : s,
        }))}
      />
      <DatabaseFilterSelect
        label="Lọc theo loại vũ khí"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="sm:min-w-[10rem]"
        options={weaponTypes.map((t) => ({
          value: t,
          label: t === "All" ? "Tất cả loại" : t,
        }))}
      />
    </>
  )

  return (
    <DatabasePageShell>
      <DatabaseHeader
        title="Vũ khí Exotic & Catalyst"
        description="Dữ liệu chi tiết về toàn bộ các vũ khí Exotic trong Destiny 2. Đã bao gồm hệ thống nâng cấp Catalyst và các tổ hợp Perk ngẫu nhiên."
        searchPlaceholder="Tìm kiếm tên súng, loại đạn, nguyên tố, trait..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        actions={headerActions}
      />

      <DatabaseResultsBar
        label={`${filteredWeapons.length} kết quả`}
        clearLabel="Xóa bộ lọc"
        clearClassName="min-h-11 px-2"
        onClear={
          hasFilters
            ? () => {
                setSearchTerm("")
                setSelectedSlot("All")
                setSelectedType("All")
              }
            : undefined
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredWeapons.length > 0 ? (
          filteredWeapons.map((weapon) => (
            <div key={weapon.id} className={weapon.hasPerkPool ? "col-span-1 md:col-span-2 xl:col-span-3" : ""}>
              <ExoticWeaponCard weapon={weapon} />
            </div>
          ))
        ) : (
          <DatabaseEmptyState
            className="col-span-full"
            message="Không tìm thấy vũ khí Exotic nào phù hợp."
          />
        )}
      </div>
    </DatabasePageShell>
  )
}
