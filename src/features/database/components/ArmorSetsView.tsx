'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowUpDown, ImageIcon } from 'lucide-react'
import {
  CyberCard,
  CyberHeading,
  CyberBadge,
  CyberButton,
} from '@/components/common/CyberComponents'
import { DatabaseHeader } from './DatabaseHeader'
import {
  DatabasePageShell,
  DatabaseResultsBar,
  DatabaseEmptyState,
} from './DatabasePageChrome'
import { ItemSourceLine } from './ExoticCardParts'
import { DatabaseItemCard } from './DatabaseItemCard'
import { bungieUrl } from '@/lib/bungie'
import type { ArmorSet } from '@/types'

interface ArmorSetsViewProps {
  sets: ArmorSet[]
}

export function ArmorSetsView({ sets }: ArmorSetsViewProps) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc')

  const filteredAndSortedSets = React.useMemo(() => {
    let result = [...sets]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (set) =>
          set.name.toLowerCase().includes(query) ||
          set.bonuses.some((b) => b.description.toLowerCase().includes(query)),
      )
    }

    result.sort((a, b) => {
      const cmp = a.name.localeCompare(b.name)
      return sortOrder === 'asc' ? cmp : -cmp
    })

    return result
  }, [sets, searchQuery, sortOrder])

  const headerActions = (
    <>
      <CyberButton
        variant="zinc"
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        className="flex-1 sm:flex-none"
      >
        <ArrowUpDown className="h-4 w-4" />
        Sắp xếp: {sortOrder === 'asc' ? 'A - Z' : 'Z - A'}
      </CyberButton>

      <CyberButton
        asChild
        variant="cyan"
        className="flex-1 sm:flex-none"
        title="Xem ảnh tĩnh toàn bộ Armor Sets"
      >
        <a
          href="/images/database/armorbonus.jpeg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImageIcon className="h-4 w-4" />
          Xem Ảnh Gốc
        </a>
      </CyberButton>
    </>
  )

  return (
    <DatabasePageShell>
      <DatabaseHeader
        title="Thư viện Armor Sets"
        description="Tổng hợp các bộ giáp và hiệu ứng Set Bonus trong Destiny 2."
        searchPlaceholder="Tìm kiếm set giáp hoặc hiệu ứng..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        actions={headerActions}
      />

      <DatabaseResultsBar
        label={`${filteredAndSortedSets.length} kết quả`}
        onClear={searchQuery ? () => setSearchQuery('') : undefined}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredAndSortedSets.length > 0 ? (
          filteredAndSortedSets.map((set, index) => (
            <motion.div
              key={set.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.4, delay: (index % 12) * 0.05 }}
              className="h-full"
            >
              <DatabaseItemCard
                variant="zinc"
                name={set.name}
                screenshot={set.screenshot}
                source={set.source}
                meta={
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] text-neon-cyan/70 uppercase tracking-widest">
                    <span>Armor Set</span>
                  </div>
                }
              >
                <div className="flex-1 space-y-4">
                  {set.bonuses.map((bonus, j) => (
                    <div
                      key={j}
                      className="flex gap-4 rounded-lg border border-white/5 bg-white/5 p-3 transition-colors hover:border-white/10 hover:bg-white/10"
                    >
                      <div className="shrink-0 pt-1">
                        {bonus.icon ? (
                          <Image
                            src={bungieUrl(bonus.icon)}
                            alt={`${bonus.pieces} piece bonus`}
                            width={32}
                            height={32}
                            unoptimized
                            className="rounded"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded bg-zinc-800" />
                        )}
                      </div>
                      <div>
                        <CyberBadge variant="cyan" size="sm" className="mb-2">
                          {bonus.pieces} PIECE
                        </CyberBadge>
                        <p className="mt-1 text-sm leading-relaxed text-zinc-300 break-words">
                          {bonus.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </DatabaseItemCard>
            </motion.div>
          ))
        ) : (
          <DatabaseEmptyState
            className="col-span-full"
            message="Không tìm thấy set giáp nào phù hợp."
          />
        )}
      </div>
    </DatabasePageShell>
  )
}
