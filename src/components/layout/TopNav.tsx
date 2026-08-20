'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

import { MobileNav } from './MobileNav'
import { TopNavLogo } from './TopNav/TopNavLogo'
import { TopNavMenu } from './TopNav/TopNavMenu'

export function TopNav() {
  const pathname = usePathname()

  const isTimeline = pathname === '/timeline'
  const isHome = pathname === '/'

  const headerPositionClass = isTimeline
    ? 'absolute top-0 left-0 transition-all duration-500 ease-out -translate-y-full opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100 bg-transparent'
    : isHome
      ? 'absolute top-0 left-0 z-50 bg-transparent'
      : 'sticky top-0 z-50 border-b-2 border-neon-cyan/40 bg-black/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,243,255,0.15)]'

  const headerElement = (
    <header
      className={cn('w-full transition-all duration-300', headerPositionClass)}
    >
      {!isHome && !isTimeline && (
        <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50" />
      )}
      <div className="flex h-14 w-full items-center px-4 md:px-6">
        <TopNavLogo />
        <TopNavMenu />

        {/* Right Action Area: Portal Target */}
        <div className="ml-auto flex h-full items-center gap-3">
          <div id="topnav-portal-target" className="flex h-full items-center" />
        </div>
      </div>
    </header>
  )

  return (
    <>
      {isTimeline ? (
        <div className="group fixed top-0 left-0 z-[60] hidden h-6 w-full md:block">
          {headerElement}
        </div>
      ) : (
        <div
          className={cn(
            'z-[60] hidden w-full md:block',
            isHome ? 'absolute top-0 left-0' : 'sticky top-0'
          )}
        >
          {headerElement}
        </div>
      )}

      {/* Mobile Floating Menu Button (Always floating on mobile) */}
      <div className="fixed left-4 top-2 z-[70] md:hidden">
        <MobileNav />
      </div>
    </>
  )
}
