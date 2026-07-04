"use client"

import * as React from "react"
import Image from "next/image"
import { Search, ArrowUpDown, ImageIcon } from "lucide-react"
import armorSetsData from "@/data/armor-sets.json"
import { CyberCard, CyberHeading, CyberBadge } from "@/components/common/CyberComponents"

export default function ArmorSetsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc")

  // Filter and sort the data
  const filteredAndSortedSets = React.useMemo(() => {
    let result = [...armorSetsData]

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (set) =>
          set.name.toLowerCase().includes(query) ||
          set.bonuses.some((b) => b.description.toLowerCase().includes(query))
      )
    }

    // Sort by name
    result.sort((a, b) => {
      const cmp = a.name.localeCompare(b.name)
      return sortOrder === "asc" ? cmp : -cmp
    })

    return result
  }, [searchQuery, sortOrder])

  return (
    <div className="flex flex-col gap-6 mt-4 pb-16">
      <div>
        <h2 className="text-2xl font-black uppercase tracking-wider text-neon-cyan mb-2">
          Armor Sets Library
        </h2>
        <p className="text-zinc-400 font-mono text-sm">
          Tổng hợp các bộ giáp và hiệu ứng Set Bonus trong Destiny 2.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-zinc-800 rounded-md leading-5 bg-zinc-900/50 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:bg-zinc-900 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan sm:text-sm transition-colors"
            placeholder="Tìm kiếm set giáp hoặc hiệu ứng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Sort Toggle */}
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 rounded-md text-sm text-zinc-300 transition-colors w-full sm:w-auto"
        >
          <ArrowUpDown className="h-4 w-4" />
          Sắp xếp: {sortOrder === "asc" ? "A - Z" : "Z - A"}
        </button>

        {/* Static Image Link */}
        <a
          href="/images/database/armorbonus.jpeg"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 rounded-md text-sm text-neon-cyan hover:text-neon-cyan/80 transition-colors w-full sm:w-auto ml-auto"
          title="Xem ảnh tĩnh toàn bộ Armor Sets"
        >
          <ImageIcon className="h-4 w-4" />
          Xem Ảnh Gốc
        </a>
      </div>

      {filteredAndSortedSets.length === 0 ? (
        <div className="text-center py-12 text-zinc-500 font-mono">
          Không tìm thấy set giáp nào phù hợp.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedSets.map((set, i) => (
            <CyberCard key={i} className="flex flex-col h-full">
              <CyberHeading variant="default" size="sm" className="mb-4 text-white">
                {set.name}
              </CyberHeading>
              
              <div className="space-y-4 flex-1">
                {set.bonuses.map((bonus, j) => (
                  <div key={j} className="flex gap-4 p-3 bg-black/40 rounded-lg border border-zinc-800/50">
                    <div className="shrink-0 pt-1">
                      {bonus.icon ? (
                        <Image 
                          src={bonus.icon} 
                          alt={`${bonus.pieces} piece bonus`}
                          width={32} 
                          height={32}
                          unoptimized
                          className="rounded"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded bg-zinc-800" />
                      )}
                    </div>
                    <div>
                      <CyberBadge variant="cyan" size="sm" className="mb-2">
                        {bonus.pieces} PIECE
                      </CyberBadge>
                      <p className="text-sm text-zinc-300 leading-relaxed mt-1">
                        {bonus.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CyberCard>
          ))}
        </div>
      )}
    </div>
  )
}
