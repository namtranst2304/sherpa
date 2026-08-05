"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Sparkles, Shirt } from "lucide-react"
import { cn } from "@/lib/utils"

const TABS = [
  { name: "Giáp Exotic", href: "/database/exotic-armor", icon: Shirt },
  { name: "Vũ khí Exotic", href: "/database/exotic-weapons", icon: Sparkles },
  { name: "Armor Sets", href: "/database/armor-sets", icon: Shield },
] as const

export function DatabaseTabNav() {
  const pathname = usePathname()

  return (
    <div className="sticky top-0 md:top-14 z-30 -mx-4 md:mx-0 px-4 md:px-0 bg-background/90 backdrop-blur-md border-b border-zinc-800">
      <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-0 pt-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {TABS.map((tab) => {
          const isActive = pathname.startsWith(tab.href)
          const Icon = tab.icon
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex items-center gap-2 min-h-11 px-4 sm:px-6 py-2.5 rounded-t-lg transition-all border-b-2 font-black uppercase tracking-wider text-xs sm:text-sm whitespace-nowrap shrink-0",
                isActive
                  ? "border-neon-cyan text-neon-cyan bg-neon-cyan/10"
                  : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {tab.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
