"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Menu, X, ChevronDown } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { DESTINY_ACTIVITIES } from "@/config/constants"

const THEME_TEXT = {
  cyan: "text-neon-cyan",
  green: "text-neon-green",
  red: "text-neon-red",
  orange: "text-neon-orange",
  yellow: "text-neon-yellow",
  zinc: "text-zinc-400",
} as const

const THEME_BORDER = {
  cyan: "border-neon-cyan",
  green: "border-neon-green",
  red: "border-neon-red",
  orange: "border-neon-orange",
  yellow: "border-neon-yellow",
  zinc: "border-zinc-500",
} as const

const THEME_HOVER = {
  cyan: "hover:text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan",
  green: "hover:text-neon-green hover:bg-neon-green/10 hover:border-neon-green",
  red: "hover:text-neon-red hover:bg-neon-red/10 hover:border-neon-red",
  orange: "hover:text-neon-orange hover:bg-neon-orange/10 hover:border-neon-orange",
  yellow: "hover:text-neon-yellow hover:bg-neon-yellow/10 hover:border-neon-yellow",
  zinc: "hover:text-zinc-200 hover:bg-zinc-800/50 hover:border-zinc-500",
} as const

const THEME_ACTIVE_CAT = {
  cyan: "bg-neon-cyan/10 border-neon-cyan/40",
  green: "bg-neon-green/10 border-neon-green/40",
  red: "bg-neon-red/10 border-neon-red/40",
  orange: "bg-neon-orange/10 border-neon-orange/40",
  yellow: "bg-neon-yellow/10 border-neon-yellow/40",
  zinc: "bg-zinc-800/50 border-zinc-600/40",
} as const

type ThemeKey = keyof typeof THEME_TEXT

export function MobileNav() {
  const activities = Object.values(DESTINY_ACTIVITIES)

  const [openCategories, setOpenCategories] = React.useState<Record<string, boolean>>({
    [activities[0]?.id]: true,
  })

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <Popover>
      <div className="group flex items-center gap-0 w-fit relative z-[70] transition-all">
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="peer flex h-11 w-11 shrink-0 items-center justify-center rounded-none bg-black/90 backdrop-blur-md hover:bg-neon-cyan/10 transition-colors text-neon-cyan border-2 border-neon-cyan/50 shadow-[0_0_15px_rgba(0,243,255,0.25)] active:scale-95 outline-none data-[state=open]:bg-neon-cyan/15 data-[state=open]:border-neon-cyan"
          >
            <Menu className="h-5 w-5 peer-data-[state=open]:hidden group-has-[[data-state=open]]:hidden" />
            <X className="h-5 w-5 hidden peer-data-[state=open]:block group-has-[[data-state=open]]:block" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </PopoverTrigger>

        <Link
          href="/"
          className="hidden group-has-[[data-state=open]]:flex items-center gap-2 h-11 px-3 bg-black/90 backdrop-blur-md border-2 border-l-0 border-neon-cyan/50 shadow-[0_0_15px_rgba(0,243,255,0.15)] cursor-pointer hover:bg-neon-cyan/5 transition-colors"
        >
          <Image
            src="/logo.ico"
            alt="Logo"
            width={22}
            height={22}
            className="w-[22px] h-[22px] object-contain drop-shadow-[0_0_6px_rgba(0,243,255,0.6)]"
            unoptimized
          />
          <span className="font-black text-xs tracking-[0.2em] cyber-text uppercase whitespace-nowrap text-neon-cyan">
            D2 Sherpa
          </span>
        </Link>

        <PopoverContent
          side="bottom"
          align="start"
          sideOffset={10}
          className="w-[min(92vw,400px)] border-none bg-transparent shadow-none p-0 z-[100] data-[side=bottom]:slide-in-from-top-4 outline-none"
        >
          <div className="relative w-full max-h-[75vh] flex flex-col overflow-hidden bg-black/95 backdrop-blur-xl border-2 border-neon-cyan/40 shadow-[0_0_40px_rgba(0,243,255,0.2)] cyber-grid">
            {/* Corner brackets */}
            <div className="pointer-events-none absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan z-20" />
            <div className="pointer-events-none absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-cyan z-20" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-cyan z-20" />
            <div className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-cyan z-20" />

            {/* Top scan line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-60 z-10" />

            {/* Header strip */}
            <div className="relative shrink-0 border-b border-neon-cyan/30 bg-zinc-950/80 px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-neon-cyan/70">
                  sys.nav // mobile
                </p>
                <p className="text-sm font-black uppercase tracking-widest text-neon-cyan text-glow-cyan mt-0.5">
                  Select Destination
                </p>
              </div>
              <div className="w-2 h-2 rotate-45 border border-neon-cyan bg-neon-cyan/40 shadow-[0_0_8px_rgba(0,243,255,0.6)]" />
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4 pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-400 fill-mode-both">
                {activities.map((act) => {
                  const theme = (act.themeColor || "cyan") as ThemeKey
                  const titleColor = act.locked
                    ? "text-neon-red"
                    : THEME_TEXT[theme] || THEME_TEXT.zinc
                  const borderColor = act.locked
                    ? THEME_BORDER.red
                    : THEME_BORDER[theme] || THEME_BORDER.zinc
                  const hoverClass = act.locked
                    ? ""
                    : THEME_HOVER[theme] || THEME_HOVER.zinc
                  const activeCat = act.locked
                    ? THEME_ACTIVE_CAT.red
                    : THEME_ACTIVE_CAT[theme] || THEME_ACTIVE_CAT.zinc
                  const isOpen = openCategories[act.id]
                  const Icon = act.icon

                  return (
                    <div key={`mobile-${act.id}`} className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => toggleCategory(act.id)}
                        className={cn(
                          "w-full text-left font-mono text-[11px] font-black tracking-[0.2em] uppercase flex items-center gap-3 outline-none min-h-11 px-3 py-2.5 border-l-4 transition-colors",
                          titleColor,
                          isOpen
                            ? cn(activeCat, borderColor)
                            : "border-transparent hover:bg-white/5"
                        )}
                      >
                        <Icon className={cn("w-4 h-4 shrink-0", titleColor)} />
                        <span className="truncate flex-1">{act.title}</span>

                        <div className="ml-auto flex items-center gap-2 shrink-0">
                          {act.locked && (
                            <span className="text-[9px] font-mono font-bold tracking-wider border border-neon-red/60 px-1.5 py-0.5 bg-neon-red/15 text-neon-red shadow-[0_0_8px_rgba(255,0,51,0.25)]">
                              KHÓA
                            </span>
                          )}
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-300",
                              isOpen ? "rotate-180 opacity-100" : "rotate-0 opacity-40"
                            )}
                          />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="flex flex-col gap-0.5 ml-2 pl-3 border-l border-zinc-800 animate-in slide-in-from-top-2 fade-in duration-200">
                          {act.items.map((item) => (
                            <PopoverClose asChild key={`mobile-item-${item.title}`}>
                              <Link
                                href={act.locked ? "#" : item.href}
                                className={cn(
                                  "py-2.5 px-3 text-sm font-mono transition-all break-words whitespace-normal outline-none border-l-2 border-transparent min-h-11 flex items-center",
                                  act.locked
                                    ? "text-zinc-700 cursor-not-allowed"
                                    : cn("text-zinc-400", hoverClass)
                                )}
                                onClick={(e) => {
                                  if (act.locked) e.preventDefault()
                                }}
                              >
                                <span className="uppercase tracking-wider text-xs font-bold">
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
            <div className="shrink-0 border-t border-neon-cyan/20 bg-zinc-950/90 px-4 py-2 flex items-center justify-between">
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-600">
                orbit.link // ready
              </span>
              <span className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider text-neon-green">
                <span className="w-1.5 h-1.5 bg-neon-green shadow-[0_0_6px_#39ff14]" />
                online
              </span>
            </div>
          </div>
        </PopoverContent>
      </div>
    </Popover>
  )
}
