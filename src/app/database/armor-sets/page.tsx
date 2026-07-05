"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowUpDown, ImageIcon } from "lucide-react"
import armorSetsData from "@/data/armor-sets.json"
import { CyberCard, CyberHeading, CyberBadge } from "@/components/common/CyberComponents"
import { DatabaseHeader } from "@/features/database/components/DatabaseHeader"

interface ArmorSet {
  name: string;
  bonuses: { pieces: number; description: string; icon?: string }[];
  screenshot?: string;
  source?: string;
}

export default function ArmorSetsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc")

  // Filter and sort the data
  const filteredAndSortedSets = React.useMemo(() => {
    let result = [...(armorSetsData as ArmorSet[])]

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

  const headerActions = (
    <>
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 rounded-md text-sm text-zinc-300 transition-colors"
      >
        <ArrowUpDown className="h-4 w-4" />
        Sắp xếp: {sortOrder === "asc" ? "A - Z" : "Z - A"}
      </button>

      <a
        href="/images/database/armorbonus.jpeg"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 rounded-md text-sm text-neon-cyan hover:text-neon-cyan/80 transition-colors"
        title="Xem ảnh tĩnh toàn bộ Armor Sets"
      >
        <ImageIcon className="h-4 w-4" />
        Xem Ảnh Gốc
      </a>
    </>
  )

  return (
    <div className="flex flex-col gap-8 max-w-[1600px] w-full mx-auto relative min-h-screen pb-20">
      <DatabaseHeader
        title="Armor Sets Library"
        description="Tổng hợp các bộ giáp và hiệu ứng Set Bonus trong Destiny 2."
        searchPlaceholder="Tìm kiếm set giáp hoặc hiệu ứng..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        actions={headerActions}
      />

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
              
              {set.screenshot && (
                <div className="relative w-full aspect-[21/9] mb-4 border-b border-zinc-800/50 bg-black/50 overflow-hidden rounded">
                  <Image 
                    src={`https://www.bungie.net${set.screenshot}`} 
                    alt={`${set.name} screenshot`} 
                    fill 
                    className="object-cover opacity-80 mix-blend-screen" 
                    unoptimized 
                  />
                </div>
              )}
              
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

              {set.source && (
                <div className="mt-4 pt-3 border-t border-zinc-800/50">
                  <div className="flex gap-2 text-xs">
                    <span className="text-zinc-500 font-bold uppercase tracking-wider shrink-0">Source:</span>
                    <span className="text-zinc-300 italic">{set.source.replace(/^Source:\s*/, '')}</span>
                  </div>
                </div>
              )}
            </CyberCard>
          ))}
        </div>
      )}
    </div>
  )
}
