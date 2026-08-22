'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, Sparkles, Shirt } from 'lucide-react'
import { cn } from '@/lib/utils'

const TABS = [
  { name: 'Giáp Exotic', href: '/database/exotic-armor', icon: Shirt },
  { name: 'Vũ khí Exotic', href: '/database/exotic-weapons', icon: Sparkles },
  { name: 'Armor Sets', href: '/database/armor-sets', icon: Shield },
] as const

export function DatabaseTabNav() {
  const pathname = usePathname()

  return (
    <div className="sticky top-0 z-30 -mx-4 border-b border-zinc-800 bg-background/90 px-4 backdrop-blur-md md:top-14 md:mx-0 md:px-0">
      <div className="flex [scrollbar-width:'none'] gap-1 overflow-x-auto pt-1 pb-0 [-ms-overflow-style:'none'] sm:gap-2 [&::-webkit-scrollbar]:hidden">
        {/* Left Spacer for Menu Button */}
        <div className="w-[60px] shrink-0 md:hidden" />

        {TABS.map((tab) => {
          const isActive = pathname.startsWith(tab.href)
          const Icon = tab.icon
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex min-h-11 shrink-0 items-center gap-2 rounded-t-lg border-b-2 px-4 py-2.5 text-xs font-black tracking-wider whitespace-nowrap uppercase transition-all sm:px-6 sm:text-sm',
                isActive
                  ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                  : 'border-transparent text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-300',
              )}
            >
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
