"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useGuideTOC } from "@/hooks/use-guide-toc"

interface TOCGroup {
  title: string
  items: { id: string; title: string; href?: string }[]
}

interface MobileGuideTOCProps {
  groups?: TOCGroup[]
  activeEncounterId?: string | null
}

export function MobileGuideTOC({ groups, activeEncounterId: activeProp }: MobileGuideTOCProps) {
  const tocContext = useGuideTOC()
  const tocGroups = groups || tocContext?.groups || []
  const activeEncounterId = activeProp !== undefined ? activeProp : (tocContext?.activeEncounterId || null)
  const activeRef = React.useRef<HTMLAnchorElement | null>(null)

  React.useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    })
  }, [activeEncounterId])

  if (!tocGroups || tocGroups.length === 0) return null

  return (
    <div className="md:hidden w-full bg-[#030303]/95 backdrop-blur-md border-b border-zinc-800 z-40 sticky top-0 min-h-14 flex items-center py-2">
      <div className="flex items-center overflow-x-auto w-full gap-2 pl-14 pr-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {tocGroups.map((group) => (
          <React.Fragment key={`group-${group.title}`}>
            {group.items.map((item) => {
              const isActive = activeEncounterId === item.id
              return (
                <Link
                  key={`toc-item-${item.id}`}
                  ref={isActive ? activeRef : undefined}
                  href={item.href || `#${item.id}`}
                  scroll={false}
                  className={cn(
                    "whitespace-nowrap shrink-0 inline-flex items-center min-h-11 px-4 py-2 rounded-none text-xs font-mono font-bold transition-all border-l-2",
                    isActive
                      ? "bg-neon-cyan/10 text-neon-cyan border-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.2)]"
                      : "bg-white/5 text-zinc-400 border-transparent hover:text-white hover:bg-white/10 hover:border-neon-cyan/40"
                  )}
                >
                  {item.title}
                </Link>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
