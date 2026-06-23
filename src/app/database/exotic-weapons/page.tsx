"use client"

import React, { useState, useMemo } from "react"
import { Search, Filter } from "lucide-react"
import data from "@/data/database/exotic-weapons.json"
import { ExoticWeaponCard, ExoticWeapon } from "@/features/database/components/ExoticWeaponCard"

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

  return (
    <div className="flex flex-col gap-8 max-w-[1600px] w-full mx-auto relative min-h-screen pb-20">
      
      {/* Header & Filters */}
      <div className="sticky top-0 z-20 pt-6 pb-4 bg-background/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-cyan animate-cyber-scan uppercase drop-shadow-[0_0_10px_rgba(0,243,255,0.3)]">
              Exotic Weapons & Catalysts
            </h1>
            <p className="text-zinc-400 mt-2 font-mono text-sm max-w-2xl leading-relaxed">
              Dữ liệu chi tiết về toàn bộ các vũ khí Exotic trong Destiny 2. Đã bao gồm hệ thống nâng cấp Catalyst và các tổ hợp Perk ngẫu nhiên.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative group w-full sm:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-500 group-focus-within:text-neon-cyan transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-zinc-800 rounded-md leading-5 bg-zinc-900/50 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan sm:text-sm transition-all focus:bg-zinc-900"
                placeholder="Tìm kiếm tên súng, loại đạn, nguyên tố, trait..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-4 w-4 text-zinc-500" />
                </div>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="pl-9 pr-8 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-md text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-neon-cyan appearance-none"
                >
                  {slots.map(s => <option key={s} value={s}>{s === "All" ? "All Slots" : s}</option>)}
                </select>
              </div>

              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 pr-8 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-md text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-neon-cyan appearance-none"
                >
                  {weaponTypes.map(t => <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

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
