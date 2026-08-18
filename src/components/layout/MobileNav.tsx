'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronDown } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { DESTINY_ACTIVITIES } from '@/config/constants'

const THEME_TEXT = {
  cyan: 'text-neon-cyan',
  green: 'text-neon-green',
  red: 'text-neon-red',
  orange: 'text-neon-orange',
  yellow: 'text-neon-yellow',
  zinc: 'text-zinc-400',
} as const

const THEME_BORDER = {
  cyan: 'border-neon-cyan',
  green: 'border-neon-green',
  red: 'border-neon-red',
  orange: 'border-neon-orange',
  yellow: 'border-neon-yellow',
  zinc: 'border-zinc-500',
} as const

const THEME_HOVER = {
  cyan: 'hover:text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan',
  green: 'hover:text-neon-green hover:bg-neon-green/10 hover:border-neon-green',
  red: 'hover:text-neon-red hover:bg-neon-red/10 hover:border-neon-red',
  orange:
    'hover:text-neon-orange hover:bg-neon-orange/10 hover:border-neon-orange',
  yellow:
    'hover:text-neon-yellow hover:bg-neon-yellow/10 hover:border-neon-yellow',
  zinc: 'hover:text-zinc-200 hover:bg-zinc-800/50 hover:border-zinc-500',
} as const

const THEME_ACTIVE_CAT = {
  cyan: 'bg-neon-cyan/10 border-neon-cyan/40',
  green: 'bg-neon-green/10 border-neon-green/40',
  red: 'bg-neon-red/10 border-neon-red/40',
  orange: 'bg-neon-orange/10 border-neon-orange/40',
  yellow: 'bg-neon-yellow/10 border-neon-yellow/40',
  zinc: 'bg-zinc-800/50 border-zinc-600/40',
} as const

type ThemeKey = keyof typeof THEME_TEXT

export function MobileNav() {
  const activities = Object.values(DESTINY_ACTIVITIES)

  const [openCategories, setOpenCategories] = React.useState<
    Record<string, boolean>
  >({
    [activities[0]?.id]: true,
  })

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <Popover>
      <div className="group relative z-[70] flex w-fit items-center gap-0 transition-all">
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="peer flex h-11 w-11 shrink-0 items-center justify-center rounded-none border-2 border-neon-cyan/50 bg-black/90 text-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.25)] backdrop-blur-md transition-colors outline-none hover:bg-neon-cyan/10 active:scale-95 data-[state=open]:border-neon-cyan data-[state=open]:bg-neon-cyan/15"
          >
            <Menu className="h-5 w-5 group-has-[[data-state=open]]:hidden peer-data-[state=open]:hidden" />
            <X className="hidden h-5 w-5 group-has-[[data-state=open]]:block peer-data-[state=open]:block" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </PopoverTrigger>

        <Link
          href="/"
          className="hidden h-11 cursor-pointer items-center gap-2 border-2 border-l-0 border-neon-cyan/50 bg-black/90 px-3 shadow-[0_0_15px_rgba(0,243,255,0.15)] backdrop-blur-md transition-colors group-has-[[data-state=open]]:flex hover:bg-neon-cyan/5"
        >
          <Image
            src="/logo.ico"
            alt="Logo"
            width={22}
            height={22}
            className="h-[22px] w-[22px] object-contain drop-shadow-[0_0_6px_rgba(0,243,255,0.6)]"
            unoptimized
          />
          <span className="cyber-text text-xs font-black tracking-[0.2em] whitespace-nowrap text-neon-cyan uppercase">
            D2 Sherpa
          </span>
        </Link>

        <PopoverContent
          side="bottom"
          align="start"
          sideOffset={10}
          className="z-[100] w-[min(92vw,400px)] border-none bg-transparent p-0 shadow-none outline-none data-[side=bottom]:slide-in-from-top-4"
        >
          <div className="relative flex max-h-[75vh] w-full flex-col overflow-hidden border-2 border-neon-cyan/40 bg-black/95 cyber-grid shadow-[0_0_40px_rgba(0,243,255,0.2)] backdrop-blur-xl">
            {/* Corner brackets */}
            <div className="pointer-events-none absolute top-0 left-0 z-20 h-4 w-4 border-t-2 border-l-2 border-neon-cyan" />
            <div className="pointer-events-none absolute top-0 right-0 z-20 h-4 w-4 border-t-2 border-r-2 border-neon-cyan" />
            <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-4 w-4 border-b-2 border-l-2 border-neon-cyan" />
            <div className="pointer-events-none absolute right-0 bottom-0 z-20 h-4 w-4 border-r-2 border-b-2 border-neon-cyan" />

            {/* Top scan line */}
            <div className="absolute top-0 left-0 z-10 h-px w-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-60" />

            {/* Header strip */}
            <div className="relative flex shrink-0 items-center justify-between border-b border-neon-cyan/30 bg-zinc-950/80 px-4 py-3">
              <div>
                <p className="font-mono text-[10px] tracking-[0.35em] text-neon-cyan/70 uppercase">
                  sys.nav // mobile
                </p>
                <p className="mt-0.5 text-sm font-black tracking-widest text-neon-cyan uppercase glow-text-cyan">
                  Select Destination
                </p>
              </div>
              <div className="h-2 w-2 rotate-45 border border-neon-cyan bg-neon-cyan/40 shadow-[0_0_8px_rgba(0,243,255,0.6)]" />
            </div>

            <nav className="flex-1 [scrollbar-width:'none'] overflow-y-auto px-3 py-4 pb-6 [-ms-overflow-style:'none'] [&::-webkit-scrollbar]:hidden">
              <div className="flex animate-in flex-col gap-3 duration-400 fill-mode-both fade-in slide-in-from-top-4">
                {activities.map((act) => {
                  const theme = (act.themeColor || 'cyan') as ThemeKey
                  const titleColor = act.locked
                    ? 'text-neon-red'
                    : THEME_TEXT[theme] || THEME_TEXT.zinc
                  const borderColor = act.locked
                    ? THEME_BORDER.red
                    : THEME_BORDER[theme] || THEME_BORDER.zinc
                  const hoverClass = act.locked
                    ? ''
                    : THEME_HOVER[theme] || THEME_HOVER.zinc
                  const activeCat = act.locked
                    ? THEME_ACTIVE_CAT.red
                    : THEME_ACTIVE_CAT[theme] || THEME_ACTIVE_CAT.zinc
                  const isOpen = openCategories[act.id]
                  const Icon = act.icon

                  return (
                    <div
                      key={`mobile-${act.id}`}
                      className="flex flex-col gap-1"
                    >
                      <button
                        type="button"
                        onClick={() => toggleCategory(act.id)}
                        className={cn(
                          'flex min-h-11 w-full items-center gap-3 border-l-4 px-3 py-2.5 text-left font-mono text-[11px] font-black tracking-[0.2em] uppercase transition-colors outline-none',
                          titleColor,
                          isOpen
                            ? cn(activeCat, borderColor)
                            : 'border-transparent hover:bg-white/5',
                        )}
                      >
                        <Icon className={cn('h-4 w-4 shrink-0', titleColor)} />
                        <span className="flex-1 truncate">{act.title}</span>

                        <div className="ml-auto flex shrink-0 items-center gap-2">
                          {act.locked && (
                            <span className="border border-neon-red/60 bg-neon-red/15 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-neon-red shadow-[0_0_8px_rgba(255,0,51,0.25)]">
                              KHÓA
                            </span>
                          )}
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 transition-transform duration-300',
                              isOpen
                                ? 'rotate-180 opacity-100'
                                : 'rotate-0 opacity-40',
                            )}
                          />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="ml-2 flex animate-in flex-col gap-0.5 border-l border-zinc-800 pl-3 duration-200 fade-in slide-in-from-top-2">
                          {act.items.map((item) => (
                            <PopoverClose
                              asChild
                              key={`mobile-item-${item.title}`}
                            >
                              <Link
                                href={act.locked ? '#' : item.href}
                                className={cn(
                                  'flex min-h-11 items-center border-l-2 border-transparent px-3 py-2.5 font-mono text-sm break-words whitespace-normal transition-all outline-none',
                                  act.locked
                                    ? 'cursor-not-allowed text-zinc-700'
                                    : cn('text-zinc-400', hoverClass),
                                )}
                                onClick={(e) => {
                                  if (act.locked) e.preventDefault()
                                }}
                              >
                                <span className="text-xs font-bold tracking-wider uppercase">
                                  {item.title}
                                </span>
                              </Link>
                            </PopoverClose>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </nav>

            {/* Bottom status bar */}
            <div className="flex shrink-0 items-center justify-between border-t border-neon-cyan/20 bg-zinc-950/90 px-4 py-2">
              <span className="font-mono text-[9px] tracking-[0.3em] text-zinc-600 uppercase">
                orbit.link // ready
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider text-neon-green uppercase">
                <span className="h-1.5 w-1.5 bg-neon-green shadow-[0_0_6px_#39ff14]" />
                online
              </span>
            </div>
          </div>
        </PopoverContent>
      </div>
    </Popover>
  )
}
