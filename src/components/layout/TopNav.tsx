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
                return (
                  <NavigationMenuItem key={category.id}>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-neon-cyan/10 hover:text-neon-cyan text-zinc-300 uppercase tracking-widest font-mono text-sm border border-transparent hover:border-neon-cyan/30 rounded-none transition-all data-[state=open]:bg-neon-cyan/10 data-[state=open]:text-neon-cyan data-[state=open]:border-neon-cyan/30">
                      {category.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-black/95 backdrop-blur-xl border border-neon-cyan/30 shadow-[0_10px_40px_rgba(0,243,255,0.2)]">
                        <li className="row-span-3">
                          {category.id === "raids" ? (
                            <div
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-black p-6 outline-none border border-neon-red/30 shadow-[inset_0_0_20px_rgba(255,0,0,0.1)] relative overflow-hidden"
                            >
                              <div className="absolute inset-0 bg-neon-red/5 animate-pulse" />
                              <Icon className="h-6 w-6 text-neon-red mb-2 opacity-60" />
                              <div className="mb-2 mt-4 text-lg font-black uppercase text-neon-red text-glow-red tracking-widest flex items-center gap-2">
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
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-neon-cyan/5 p-6 outline-none border border-neon-cyan/30 shadow-[inset_0_0_20px_rgba(0,243,255,0.05)] relative overflow-hidden"
                            >
                              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/10 blur-3xl -mr-10 -mt-10 pointer-events-none" />
                              <Icon className="h-6 w-6 text-neon-cyan mb-2" />
                              <div className="mb-2 mt-4 text-lg font-medium uppercase text-neon-cyan text-glow-cyan tracking-widest">
                                {category.title}
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground font-mono">
                                {category.description}
                              </p>
                            </div>
                          )}
                        </li>

                        {/* Map qua từng item nhỏ bên trong */}
                        {category.items.slice(0, 3).map((item) => (
                          <ListItem key={item.title} href={item.href} title={item.title}>
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

        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Sign In removed */}
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { title: string }>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-none p-3 leading-none no-underline outline-none transition-all hover:bg-neon-cyan/10 border-l-2 border-transparent hover:border-neon-cyan group",
              className
            )}
            {...props}
          >
            <div className="text-sm font-bold uppercase tracking-wider text-zinc-300 group-hover:text-neon-cyan group-hover:text-glow-cyan transition-colors">{title}</div>
            <p className="line-clamp-2 text-xs leading-snug text-zinc-500 font-mono mt-2 group-hover:text-neon-cyan/70 transition-colors">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"