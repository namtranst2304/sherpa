"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface TOCGroup {
  title?: string
  items: { id: string; title: string; href?: string }[]
}

interface MobileGuideTOCProps {
  groups: TOCGroup[]
  activeEncounterId?: string | null
}

export function MobileGuideTOC({ groups, activeEncounterId }: MobileGuideTOCProps) {
  const activeRef = React.useRef<HTMLAnchorElement | null>(null)

  React.useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    })
  }, [activeEncounterId])

  if (!groups.length) return null

  return (
    <div className="md:hidden w-full bg-[#030303]/95 backdrop-blur-md border-b border-zinc-800 z-40 sticky top-0 min-h-14 flex items-center py-2">
      <div className="flex items-center overflow-x-auto w-full gap-2 pl-14 pr-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {groups.map((group, gIdx) => (
          <React.Fragment key={`group-${group.title || gIdx}`}>
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
                      : "bg-zinc-900/50 text-zinc-400 border-transparent hover:text-zinc-200"
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
