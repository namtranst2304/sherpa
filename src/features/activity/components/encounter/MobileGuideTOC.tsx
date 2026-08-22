'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Compass,
  Sparkles,
  BookOpen,
  Flame,
  Crosshair,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TOCGroup {
  title?: string
  items: { id: string; title: string; href?: string }[]
}

interface MobileGuideTOCProps {
  groups: TOCGroup[]
  activeEncounterId?: string | null
}

function getTabIcon(id: string) {
  if (id === 'overview') return <Compass className="h-3.5 w-3.5 shrink-0" />
  if (id === 'secrets')
    return <Sparkles className="h-3.5 w-3.5 shrink-0 text-neon-yellow" />
  if (id === 'walkthrough') return <BookOpen className="h-3.5 w-3.5 shrink-0" />
  if (id === 'catalyst')
    return <Flame className="h-3.5 w-3.5 shrink-0 text-neon-orange" />
  return <Crosshair className="h-3.5 w-3.5 shrink-0 opacity-70" />
}

export function MobileGuideTOC({
  groups,
  activeEncounterId,
}: MobileGuideTOCProps) {
  const activeRef = React.useRef<HTMLAnchorElement | null>(null)

  React.useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [activeEncounterId])

  if (!groups.length) return null

  let encounterCounter = 0

  return (
    <div className="sticky top-0 z-40 flex min-h-14 w-full items-center overflow-hidden border-b border-neon-cyan/25 bg-[#050508]/95 backdrop-blur-xl md:hidden pl-14">
      {/* Cyber accent line */}
      <div className="pointer-events-none absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent opacity-70" />

      <div className="flex w-full snap-x [scrollbar-width:'none'] items-center gap-1.5 overflow-x-auto scroll-smooth py-1.5 [-ms-overflow-style:'none'] [&::-webkit-scrollbar]:hidden">


        {groups.map((group, gIdx) => (
          <React.Fragment key={`group-${group.title || gIdx}`}>
            {group.items.map((item) => {
              const isActive = activeEncounterId === item.id
              const isEncounter =
                item.id !== 'overview' &&
                item.id !== 'secrets' &&
                item.id !== 'walkthrough' &&
                item.id !== 'catalyst'
              if (isEncounter) encounterCounter++
              return (
                <Link
                  key={`toc-item-${item.id}`}
                  ref={isActive ? activeRef : undefined}
                  href={item.href || `#${item.id}`}
                  scroll={false}
                  className={cn(
                    'group relative inline-flex min-h-11 shrink-0 snap-start items-center gap-1.5 border-b-2 px-3.5 py-2 font-mono text-xs font-bold whitespace-nowrap transition-all',
                    isActive
                      ? 'border-neon-cyan bg-neon-cyan/15 text-neon-cyan shadow-[0_0_12px_rgba(0,243,255,0.25)]'
                      : 'border-transparent bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200',
                  )}
                >
                  {/* Status / Type Icon */}
                  {getTabIcon(item.id)}

                  {/* Encounter Index Badge for regular encounters */}
                  {isEncounter && (
                    <span
                      className={cn(
                        'py-0.2 rounded-none px-1 font-mono text-[10px]',
                        isActive
                          ? 'bg-neon-cyan/20 text-neon-cyan'
                          : 'bg-zinc-800 text-zinc-400',
                      )}
                    >
                      {encounterCounter < 10
                        ? `0${encounterCounter}`
                        : encounterCounter}
                    </span>
                  )}

                  <span className="max-w-[160px] truncate text-[11px] tracking-wide uppercase">
                    {item.title}
                  </span>
                </Link>
              )
            })}
          </React.Fragment>
        ))}

        {/* Right Spacer for Search Button */}
        <div className="w-12 shrink-0" />
      </div>
    </div>
  )
}
