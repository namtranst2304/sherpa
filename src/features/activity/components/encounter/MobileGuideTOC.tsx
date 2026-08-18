"use client"

import * as React from "react"
import Link from "next/link"
import { Compass, Sparkles, BookOpen, Flame, Crosshair, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCheckpoints } from "@/hooks/use-sherpa-store"
import { playHoverSound, playNavSound } from "@/lib/cyber-audio"

interface TOCGroup {
  title?: string
  items: { id: string; title: string; href?: string }[]
}

interface MobileGuideTOCProps {
  groups: TOCGroup[]
  activeEncounterId?: string | null
  activityTitle?: string
}

function getTabIcon(id: string) {
  if (id === "overview") return <Compass className="w-3.5 h-3.5 shrink-0" />
  if (id === "secrets") return <Sparkles className="w-3.5 h-3.5 shrink-0 text-neon-yellow" />
  if (id === "walkthrough") return <BookOpen className="w-3.5 h-3.5 shrink-0" />
  if (id === "catalyst") return <Flame className="w-3.5 h-3.5 shrink-0 text-neon-orange" />
  return <Crosshair className="w-3.5 h-3.5 shrink-0 opacity-70" />
}

export function MobileGuideTOC({ groups, activeEncounterId, activityTitle }: MobileGuideTOCProps) {
  const activeRef = React.useRef<HTMLAnchorElement | null>(null)
  const { isEncounterCompleted } = useCheckpoints()

  React.useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    })
  }, [activeEncounterId])

  if (!groups.length) return null

  let encounterCounter = 0

  return (
    <div className="md:hidden w-full bg-[#050508]/95 backdrop-blur-xl border-b border-neon-cyan/25 z-40 sticky top-0 min-h-14 flex items-center relative overflow-hidden">
      {/* Cyber accent line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent opacity-70 pointer-events-none" />

      <div className="flex items-center overflow-x-auto w-full gap-1.5 pl-14 pr-4 py-1.5 snap-x scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {groups.map((group, gIdx) => (
          <React.Fragment key={`group-${group.title || gIdx}`}>
            {group.items.map((item) => {
              const isActive = activeEncounterId === item.id
              const isEncounter = item.id !== "overview" && item.id !== "secrets" && item.id !== "walkthrough" && item.id !== "catalyst"
              if (isEncounter) encounterCounter++
              const isCleared = activityTitle ? isEncounterCompleted(activityTitle, item.id) : false

              return (
                <Link
                  key={`toc-item-${item.id}`}
                  ref={isActive ? activeRef : undefined}
                  href={item.href || `#${item.id}`}
                  scroll={false}
                  onMouseEnter={playHoverSound}
                  onClick={playNavSound}
                  className={cn(
                    "whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 min-h-11 px-3.5 py-2 text-xs font-mono font-bold transition-all border-b-2 snap-start relative group",
                    isActive
                      ? "bg-neon-cyan/15 text-neon-cyan border-neon-cyan shadow-[0_0_12px_rgba(0,243,255,0.25)]"
                      : "bg-zinc-900/60 text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-800/60"
                  )}
                >
                  {/* Status / Type Icon */}
                  {isCleared ? (
                    <Check className="w-3.5 h-3.5 shrink-0 text-neon-green" />
                  ) : (
                    getTabIcon(item.id)
                  )}

                  {/* Encounter Index Badge for regular encounters */}
                  {isEncounter && !isCleared && (
                    <span className={cn(
                      "text-[10px] px-1 py-0.2 rounded-none font-mono",
                      isActive ? "bg-neon-cyan/20 text-neon-cyan" : "bg-zinc-800 text-zinc-400"
                    )}>
                      {encounterCounter < 10 ? `0${encounterCounter}` : encounterCounter}
                    </span>
                  )}

                  <span className="tracking-wide uppercase text-[11px] truncate max-w-[160px]">
                    {item.title}
                  </span>
                </Link>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

