"use client"

import React, { useState, useMemo } from "react"
import { Search, Filter } from "lucide-react"
import data from "@/data/database/exotic-weapons.json"
import { ExoticWeaponCard, ExoticWeapon } from "@/features/database/components/ExoticWeaponCard"
import { DatabaseHeader } from "@/features/database/components/DatabaseHeader"

// Ensure valid typed data
const exoticWeaponsData = data as unknown as ExoticWeapon[]

export default function ExoticWeaponsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSlot, setSelectedSlot] = useState<string>("All")
  const [selectedType, setSelectedType] = useState<string>("All")

  // Extract unique types for the filter dropdown
  const weaponTypes = useMemo(() => {
    const types = new Set<string>()
    exoticWeaponsData.forEach(w => {
      if (w.weaponType) types.add(w.weaponType)
    })
    return ["All", ...Array.from(types).sort()]
  }, [])

  const slots = ["All", "Kinetic", "Energy", "Power"]

  const filteredWeapons = exoticWeaponsData.filter(weapon => {
    // Search filtering
    const q = searchTerm.toLowerCase()
    const matchesSearch = 
      weapon.name.toLowerCase().includes(q) ||
      weapon.weaponType.toLowerCase().includes(q) ||
      weapon.damageType.toLowerCase().includes(q) ||
      weapon.ammoType.toLowerCase().includes(q) ||
      (weapon.trait?.name?.toLowerCase() || "").includes(q)

    // Dropdown filtering
    const matchesSlot = selectedSlot === "All" || weapon.slot === selectedSlot
    const matchesType = selectedType === "All" || weapon.weaponType === selectedType

    return matchesSearch && matchesSlot && matchesType
  })

  const headerActions = (
    <>
      <div className="relative flex-1 sm:flex-none">
        <select
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          className="w-full pl-4 pr-8 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-md text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-neon-cyan appearance-none"
        >
          {slots.map(s => <option key={s} value={s}>{s === "All" ? "All Slots" : s}</option>)}
        </select>
      </div>
      <div className="relative flex-1 sm:flex-none">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-4 pr-8 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-md text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-neon-cyan appearance-none"
        >
          {weaponTypes.map(t => <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>)}
        </select>
      </div>
    </>
  )

  return (
    <div className="flex flex-col gap-8 max-w-[1600px] w-full mx-auto relative min-h-screen pb-20">
      
      <DatabaseHeader
        title="Exotic Weapons & Catalysts"
        description="Dữ liệu chi tiết về toàn bộ các vũ khí Exotic trong Destiny 2. Đã bao gồm hệ thống nâng cấp Catalyst và các tổ hợp Perk ngẫu nhiên."
        searchPlaceholder="Tìm kiếm tên súng, loại đạn, nguyên tố, trait..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        actions={headerActions}
      />

      {/* Weapons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredWeapons.length > 0 ? (
          filteredWeapons.map(weapon => (
            <div key={weapon.id} className={weapon.trait?.perkPool ? "col-span-1 md:col-span-2 xl:col-span-3" : ""}>
              <ExoticWeaponCard weapon={weapon} />
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-zinc-500 font-mono">
            Không tìm thấy vũ khí Exotic nào phù hợp.
          </div>
        )}
      </div>

    </div>
  )
}
