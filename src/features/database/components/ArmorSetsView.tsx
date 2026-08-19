'use client'

import * as React from 'react'
import Image from 'next/image'
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

      {filteredAndSortedSets.length === 0 ? (
        <DatabaseEmptyState message="Không tìm thấy set giáp nào phù hợp." />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredAndSortedSets.map((set) => (
            <CyberCard key={set.name} className="flex h-full flex-col">
              <CyberHeading
                variant="default"
                size="sm"
                className="mb-4 text-white"
              >
                {set.name}
              </CyberHeading>

              {set.screenshot && (
                <div className="relative mb-4 aspect-[21/9] w-full overflow-hidden rounded border-b border-zinc-800/50 bg-black/50">
                  <Image
                    src={bungieUrl(set.screenshot)}
                    alt={`${set.name} screenshot`}
                    fill
                    className="object-cover opacity-80 mix-blend-screen"
                    unoptimized
                  />
                </div>
              )}

              <div className="flex-1 space-y-4">
                {set.bonuses.map((bonus, j) => (
                  <div
                    key={j}
                    className="flex gap-4 rounded-lg border border-zinc-800/50 bg-black/40 p-3"
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

              {set.source && (
                <ItemSourceLine source={set.source} className="mt-4" />
              )}
            </CyberCard>
          ))}
        </div>
      )}
    </DatabasePageShell>
  )
}
