"use client"

import React, { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { CatalystCard, CatalystData } from "@/features/database/components/CatalystCard"
import catalystsRaw from "@/data/database/catalysts.json"

export default function CatalystsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  
  const catalysts = catalystsRaw as CatalystData[]

  const filteredCatalysts = useMemo(() => {
    if (!searchQuery) return catalysts
    const lowerQuery = searchQuery.toLowerCase()
    return catalysts.filter(
      c => c.name.toLowerCase().includes(lowerQuery) || 
           c.weaponName.toLowerCase().includes(lowerQuery)
    )
  }, [searchQuery, catalysts])

  return (
    <div className="flex flex-col gap-8 mt-4 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-black uppercase tracking-wider text-neon-cyan">
            Exotic Catalysts Library
          </h2>
          <p className="text-zinc-400 font-mono text-sm max-w-3xl">
            Tổng hợp dữ liệu gốc {catalysts.length} Exotic Catalysts từ Bungie API. 
            Mô tả hiệu ứng chi tiết và số lượng kẻ địch cần tiêu diệt để Masterwork vũ khí.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-zinc-800 rounded-md leading-5 bg-zinc-950 text-zinc-300 placeholder-zinc-600 focus:outline-none focus:bg-black focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 sm:text-sm transition-colors font-mono"
            placeholder="Tìm theo tên vũ khí..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredCatalysts.length > 0 ? (
          filteredCatalysts.map(catalyst => (
            <CatalystCard key={catalyst.id} catalyst={catalyst} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-zinc-500 font-mono">
            Không tìm thấy Catalyst nào mang tên "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  )
}
