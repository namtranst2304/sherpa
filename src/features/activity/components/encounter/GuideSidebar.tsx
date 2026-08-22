'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { useScrollSpy } from '@/hooks/use-scroll-spy'
import * as React from 'react'

export type SidebarSection = {
  id: string
  title: string
  href?: string
  label?: string
  isFinal?: boolean
}

export type SidebarGroup = {
  title?: string
  items: SidebarSection[]
}

export function GuideSidebar({
  title,
  subtitle,
  orbit,
  groups,
  activeEncounterId,
}: {
  title: string
  subtitle: string
  orbit?: string
  groups: SidebarGroup[]
  activeEncounterId?: string
}) {
  const itemIds = React.useMemo(() => {
    return groups.flatMap((group) => group.items.map((item) => item.id))
  }, [groups])

  const activeId = useScrollSpy(itemIds, 120, activeEncounterId)

  return (
    <aside className="z-40 hidden h-full w-64 shrink-0 flex-col overflow-hidden border-r border-white/5 glass-panel md:flex">
      <div className="relative shrink-0 overflow-hidden border-b border-white/10 bg-black/40 p-4">
        <div className="absolute top-0 right-0 h-8 w-8 translate-x-4 -translate-y-4 -rotate-45 bg-neon-yellow" />
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-neon-yellow to-transparent" />

        <h1
          className="text-xl font-extrabold tracking-widest break-words text-neon-yellow uppercase glow-text-yellow"
          title={title}
        >
          {title}
        </h1>
        <div className="mt-2">
          <h2 className="inline-block bg-neon-cyan px-2 py-0.5 text-[10px] font-black tracking-widest break-words text-black uppercase">
            {subtitle}
          </h2>
        </div>
        {orbit && (
          <p className="mt-2 font-mono text-[10px] break-words text-zinc-500 uppercase">
            sys.orbit: {orbit}
          </p>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-2" aria-label="Mục lục guide">
        {groups.map((group, idx) => (
          <div key={idx} className="mt-2 px-2">
            {group.title && (
              <div className="px-2 py-1.5 font-mono text-[10px] tracking-widest text-neon-red uppercase opacity-80">
                {group.title}
              </div>
            )}
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = activeId === item.id
                const linkHref = item.href || `#${item.id}`

                return (
                  <li key={item.id} className="min-w-0">
                      <Link
                      href={linkHref}
                      className={cn(
                        'relative z-10 flex w-full items-start justify-between gap-2 border-l-2 px-3 py-2.5 font-mono text-sm transition-all',
                        isActive
                          ? 'border-neon-cyan bg-neon-cyan/10 font-bold text-white shadow-[-4px_0_10px_rgba(0,243,255,0.2)]'
                          : 'border-transparent text-zinc-400 hover:border-white/20 hover:bg-white/5 hover:text-zinc-200',
                      )}
                    >
                      <div
                        className={cn(
                          'flex items-center gap-1.5 leading-tight tracking-wide break-words whitespace-normal',
                          item.isFinal &&
                            !isActive &&
                            'font-extrabold text-neon-red glow-text-red',
                          item.isFinal &&
                            isActive &&
                            'font-extrabold text-red-700',
                        )}
                      >
                        <span>{item.title}</span>
                      </div>
                      {item.label && (
                        <div
                          className={cn(
                            'ml-2 shrink-0 border px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase',
                            isActive
                              ? 'border-black bg-black text-neon-yellow'
                              : item.isFinal
                                ? 'border-neon-red/50 bg-neon-red/20 text-neon-red'
                                : 'border-neon-cyan/50 bg-neon-cyan/20 text-neon-cyan',
                          )}
                        >
                          {item.label}
                        </div>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
