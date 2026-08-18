"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { useCheckpoints } from "@/hooks/use-sherpa-store"
import { playHoverSound, playNavSound } from "@/lib/cyber-audio"
import * as React from "react"

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
  const { isEncounterCompleted } = useCheckpoints()

  return (
    <aside className="hidden md:flex h-full w-64 shrink-0 flex-col border-r-2 border-r-neon-yellow/50 z-40 bg-black cyber-grid overflow-hidden">
      <div className="border-b-2 border-neon-yellow p-4 relative overflow-hidden bg-zinc-950 shrink-0">
        <div className="absolute top-0 right-0 w-8 h-8 bg-neon-yellow -rotate-45 translate-x-4 -translate-y-4" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-neon-yellow to-transparent" />

        <h1 className="text-xl font-extrabold text-neon-yellow tracking-widest uppercase break-words text-glow-yellow" title={title}>
          {title}
        </h1>
        <div className="mt-2">
          <h2 className="text-[10px] font-black text-black bg-neon-cyan tracking-widest uppercase break-words inline-block px-2 py-0.5">
            {subtitle}
          </h2>
        </div>
        {orbit && (
          <p className="text-[10px] text-zinc-500 mt-2 break-words font-mono uppercase">sys.orbit: {orbit}</p>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-2" aria-label="Mục lục guide">
        {groups.map((group, idx) => (
          <div key={idx} className="mt-2 px-2">
            {group.title && (
              <div className="px-2 py-1.5 text-neon-red font-mono tracking-widest uppercase text-[10px] opacity-80">
                {group.title}
              </div>
            )}
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = activeId === item.id
                const linkHref = item.href || `#${item.id}`
                const isCleared = isEncounterCompleted(title, item.id)

                return (
                  <li key={item.id} className="min-w-0">
                    <Link
                      href={linkHref}
                      onMouseEnter={playHoverSound}
                      onClick={playNavSound}
                      className={cn(
                        "flex items-start justify-between w-full gap-2 relative z-10 transition-all py-2.5 px-2 font-mono text-sm border-l-4",
                        isActive
                          ? "text-black font-extrabold bg-neon-yellow border-neon-red"
                          : "text-zinc-400 hover:bg-neon-cyan/10 hover:text-neon-cyan hover:border-neon-cyan border-transparent"
                      )}
                    >
                      <div
                        className={cn(
                          "break-words whitespace-normal leading-tight tracking-wide flex items-center gap-1.5",
                          item.isFinal && !isActive && "text-neon-red font-extrabold text-glow-red",
                          item.isFinal && isActive && "text-red-700 font-extrabold"
                        )}
                      >
                        {isCleared && (
                          <Check className={cn("w-3.5 h-3.5 shrink-0", isActive ? "text-black" : "text-neon-green")} />
                        )}
                        <span>{item.title}</span>
                      </div>
                      {item.label && (
                        <div
                          className={cn(
                            "text-[9px] px-1.5 py-0.5 font-bold font-mono ml-2 shrink-0 border uppercase",
                            isActive
                              ? "bg-black text-neon-yellow border-black"
                              : item.isFinal
                                ? "bg-neon-red/20 text-neon-red border-neon-red/50"
                                : "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50"
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
