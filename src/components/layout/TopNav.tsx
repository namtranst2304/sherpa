"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import { AstronautIcon } from "@/components/ui/icons"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DESTINY_ACTIVITIES } from "@/lib/constants"

export function TopNav() {
  const activities = Object.values(DESTINY_ACTIVITIES)

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-neon-cyan/40 bg-black/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,243,255,0.15)] relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50" />
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 mx-auto">

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center mr-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                  <AstronautIcon className="h-5 w-5" />
                  <span>D2 Sherpa</span>
                </Link>
                {activities.map((act) => (
                  <Link key={`mobile-${act.id}`} href={act.href} className="text-muted-foreground hover:text-foreground uppercase font-medium">
                    {act.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Logo */}
        <div className="mr-8 hidden md:flex">
          <Link href="/" className="flex items-center gap-3 space-x-2 group">
            <div className="p-1.5 bg-neon-cyan/10 border border-neon-cyan/30 rounded-sm group-hover:bg-neon-cyan/20 transition-colors">
              <AstronautIcon className="h-6 w-6 text-neon-cyan drop-shadow-[0_0_8px_rgba(0,243,255,0.8)] group-hover:animate-pulse" />
            </div>
            <span className="hidden font-black sm:inline-block tracking-widest uppercase text-neon-cyan text-glow-cyan text-lg">
              D2 Sherpa
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Loop */}
        <div className="hidden md:flex flex-1 items-center space-x-2">
          <NavigationMenu>
            <NavigationMenuList>
              {activities.map((category) => {
                const Icon = category.icon
                const theme = category.themeColor || "cyan"
                
                const themeStyles = {
                  cyan: {
                    trigger: 'hover:bg-neon-cyan/10 hover:text-neon-cyan hover:border-neon-cyan/30 data-[state=open]:bg-neon-cyan/10 data-[state=open]:text-neon-cyan data-[state=open]:border-neon-cyan/30',
                    dropdown: 'border-neon-cyan/30 shadow-[0_10px_40px_rgba(0,243,255,0.2)]',
                    cardBg: 'bg-neon-cyan/5 border-neon-cyan/30 shadow-[inset_0_0_20px_rgba(0,243,255,0.05)]',
                    cardGlow: 'bg-neon-cyan/10',
                    icon: 'text-neon-cyan',
                    title: 'text-neon-cyan text-glow-cyan',
                    hoverItem: 'hover:bg-neon-cyan/10 hover:border-neon-cyan group-hover:text-neon-cyan group-hover:text-glow-cyan',
                    arrow: 'group-hover:text-neon-cyan/70'
                  },
                  green: {
                    trigger: 'hover:bg-neon-green/10 hover:text-neon-green hover:border-neon-green/30 data-[state=open]:bg-neon-green/10 data-[state=open]:text-neon-green data-[state=open]:border-neon-green/30',
                    dropdown: 'border-neon-green/30 shadow-[0_10px_40px_rgba(57,255,20,0.2)]',
                    cardBg: 'bg-neon-green/5 border-neon-green/30 shadow-[inset_0_0_20px_rgba(57,255,20,0.05)]',
                    cardGlow: 'bg-neon-green/10',
                    icon: 'text-neon-green',
                    title: 'text-neon-green text-glow-green',
                    hoverItem: 'hover:bg-neon-green/10 hover:border-neon-green group-hover:text-neon-green group-hover:text-glow-green',
                    arrow: 'group-hover:text-neon-green/70'
                  },
                  red: {
                    trigger: 'hover:bg-neon-red/10 hover:text-neon-red hover:border-neon-red/30 data-[state=open]:bg-neon-red/10 data-[state=open]:text-neon-red data-[state=open]:border-neon-red/30',
                    dropdown: 'border-neon-red/30 shadow-[0_10px_40px_rgba(255,0,0,0.2)]',
                    cardBg: 'bg-black border-neon-red/30 shadow-[inset_0_0_20px_rgba(255,0,0,0.1)]',
                    cardGlow: 'bg-neon-red/5',
                    icon: 'text-neon-red opacity-60',
                    title: 'text-neon-red text-glow-red',
                    hoverItem: 'hover:bg-neon-red/10 hover:border-neon-red group-hover:text-neon-red group-hover:text-glow-red',
                    arrow: 'group-hover:text-neon-red/70'
                  },
                  orange: {
                    trigger: 'hover:bg-neon-orange/10 hover:text-neon-orange hover:border-neon-orange/30 data-[state=open]:bg-neon-orange/10 data-[state=open]:text-neon-orange data-[state=open]:border-neon-orange/30',
                    dropdown: 'border-neon-orange/30 shadow-[0_10px_40px_rgba(255,140,0,0.2)]',
                    cardBg: 'bg-neon-orange/5 border-neon-orange/30 shadow-[inset_0_0_20px_rgba(255,140,0,0.05)]',
                    cardGlow: 'bg-neon-orange/10',
                    icon: 'text-neon-orange',
                    title: 'text-neon-orange text-glow-orange',
                    hoverItem: 'hover:bg-neon-orange/10 hover:border-neon-orange group-hover:text-neon-orange group-hover:text-glow-orange',
                    arrow: 'group-hover:text-neon-orange/70'
                  },
                  yellow: {
                    trigger: 'hover:bg-neon-yellow/10 hover:text-neon-yellow hover:border-neon-yellow/30 data-[state=open]:bg-neon-yellow/10 data-[state=open]:text-neon-yellow data-[state=open]:border-neon-yellow/30',
                    dropdown: 'border-neon-yellow/30 shadow-[0_10px_40px_rgba(252,226,5,0.2)]',
                    cardBg: 'bg-neon-yellow/5 border-neon-yellow/30 shadow-[inset_0_0_20px_rgba(252,226,5,0.05)]',
                    cardGlow: 'bg-neon-yellow/10',
                    icon: 'text-neon-yellow',
                    title: 'text-neon-yellow text-glow-yellow',
                    hoverItem: 'hover:bg-neon-yellow/10 hover:border-neon-yellow group-hover:text-neon-yellow group-hover:text-glow-yellow',
                    arrow: 'group-hover:text-neon-yellow/70'
                  },
                  zinc: {
                    trigger: 'hover:bg-zinc-800/50 hover:text-zinc-300 hover:border-zinc-500/30 data-[state=open]:bg-zinc-800/50 data-[state=open]:text-zinc-300 data-[state=open]:border-zinc-500/30',
                    dropdown: 'border-zinc-800/50 shadow-[0_10px_40px_rgba(0,0,0,0.5)]',
                    cardBg: 'bg-zinc-900/20 border-zinc-800/50 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]',
                    cardGlow: 'bg-zinc-800/20',
                    icon: 'text-zinc-400',
                    title: 'text-zinc-300',
                    hoverItem: 'hover:bg-zinc-800/30 hover:border-zinc-500 group-hover:text-zinc-300',
                    arrow: 'group-hover:text-zinc-400'
                  }
                }

                const currentStyle = category.locked ? themeStyles.red : themeStyles[theme]

                return (
                  <NavigationMenuItem key={category.id}>
                    <NavigationMenuTrigger className={`bg-transparent text-zinc-300 uppercase tracking-widest font-mono text-sm border border-transparent rounded-none transition-all ${currentStyle.trigger}`}>
                      {category.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className={`grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-black/95 backdrop-blur-xl border ${currentStyle.dropdown}`}>
                        <li className="row-span-4">
                          {category.locked ? (
                            <div
                              className={`flex h-full w-full select-none flex-col justify-start rounded-md p-6 outline-none relative overflow-hidden ${currentStyle.cardBg}`}
                            >
                              <div className="absolute inset-0 bg-neon-red/5 animate-pulse" />
                              <Icon className={`h-6 w-6 mb-2 ${currentStyle.icon}`} />
                              <div className={`mb-2 mt-4 text-lg font-black uppercase tracking-widest flex items-center gap-2 ${currentStyle.title}`}>
                                {category.title}
                                <span className="text-[10px] px-1.5 py-0.5 border border-neon-red bg-neon-red/20 text-neon-red animate-pulse">
                                  UPDATING
                                </span>
                              </div>
                              <p className="text-sm leading-tight text-neon-red/70 font-mono">
                                {category.description}
                              </p>
                            </div>
                          ) : (
                            <div
                              className={`flex h-full w-full select-none flex-col justify-start rounded-md p-6 outline-none relative overflow-hidden ${currentStyle.cardBg}`}
                            >
                              <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl -mr-10 -mt-10 pointer-events-none ${currentStyle.cardGlow}`} />
                              <Icon className={`h-6 w-6 mb-2 ${currentStyle.icon}`} />
                              <div className={`mb-2 mt-4 text-lg font-medium uppercase tracking-widest ${currentStyle.title}`}>
                                {category.title}
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground font-mono">
                                {category.description}
                              </p>
                            </div>
                          )}
                        </li>

                        {/* Map qua từng item nhỏ bên trong */}
                        {category.items.slice(0, 4).map((item) => (
                          <ListItem key={item.title} href={item.href} title={item.title} hoverClass={currentStyle.hoverItem} arrowClass={currentStyle.arrow}>
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { title: string, hoverClass?: string, arrowClass?: string }>(
  ({ className, title, children, hoverClass, arrowClass, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-none p-3 leading-none no-underline outline-none transition-all border-l-2 border-transparent group",
              hoverClass || "hover:bg-neon-cyan/10 hover:border-neon-cyan",
              className
            )}
            {...props}
          >
            <div className="text-sm font-bold uppercase tracking-wider text-zinc-300 transition-colors">{title}</div>
            <p className={cn("line-clamp-2 text-xs leading-snug text-zinc-500 font-mono mt-2 transition-colors", arrowClass)}>
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"