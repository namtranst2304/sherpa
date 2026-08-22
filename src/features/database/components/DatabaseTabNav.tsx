'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, Sparkles, Shirt } from 'lucide-react'
import { cn } from '@/lib/utils'

import { DATABASE_TABS } from '@/config/database'

export function DatabaseTabNav() {
  const pathname = usePathname()

  return (
    <div className="sticky top-0 z-30 -mx-4 border-b border-white/5 bg-background/50 px-4 backdrop-blur-xl md:top-14 md:mx-0 md:px-0">
      <div className="flex [scrollbar-width:'none'] gap-4 overflow-x-auto pt-2 pb-0 [-ms-overflow-style:'none'] sm:gap-6 [&::-webkit-scrollbar]:hidden">
        {/* Left Spacer for Menu Button */}
        <div className="w-[60px] shrink-0 md:hidden" />

        {DATABASE_TABS.map((tab) => {
          const isActive = pathname.startsWith(tab.href)
          const Icon = tab.icon
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'group relative flex min-h-11 shrink-0 items-center gap-2 px-2 py-3 text-xs font-black tracking-wider whitespace-nowrap uppercase transition-colors sm:text-sm',
                isActive
                  ? 'text-neon-cyan glow-text-cyan'
                  : 'text-zinc-500 hover:text-zinc-200',
              )}
            >
              {isActive && (
                <div className="absolute -bottom-[1px] left-0 h-[2px] w-full bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.8)]" />
              )}
              {/* Subtle hover underline */}
              {!isActive && (
                <div className="absolute -bottom-[1px] left-0 h-[2px] w-full origin-left scale-x-0 bg-zinc-600 opacity-50 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              )}
              <Icon className="h-4 w-4 shrink-0" />
              {tab.name}
            </Link>
          )
        })}

        {/* Right Spacer for Search Button */}
        <div className="w-[60px] shrink-0 md:hidden" />
      </div>
    </div>
  )
}
