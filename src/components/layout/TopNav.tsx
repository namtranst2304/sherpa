"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { DESTINY_ACTIVITIES } from "@/config/constants"
import { MobileNav } from "./MobileNav"

import {
  topNavTriggerVariants,
  topNavDropdownVariants,
  topNavCardBgVariants,
  topNavIconVariants,
  topNavTitleVariants,
  topNavHoverItemVariants,
  topNavCardGlowVariants,
  topNavDescVariants
} from "./top-nav-variants"

export function TopNav() {
  const pathname = usePathname()
  const activities = Object.values(DESTINY_ACTIVITIES)

  const isTimeline = pathname === "/timeline";
  const isHome = pathname === "/";



  const headerElement = (
    <header className={cn(
      "w-full transition-all duration-300",
      isTimeline
        ? "absolute top-0 left-0 transition-all duration-500 ease-out -translate-y-full opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100 bg-transparent"
        : isHome
          ? "absolute top-0 left-0 z-50 bg-transparent"
          : "sticky top-0 z-50 border-b-2 border-neon-cyan/40 bg-black/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,243,255,0.15)]"
    )}>
      {(!isHome && !isTimeline) && <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50" />}
      <div className="flex h-14 w-full items-center px-4 md:px-6">

        {/* Desktop Logo */}
        <div className="mr-8 hidden md:flex">
          <Link href="/" className="flex items-center gap-2 cyber-text-container group">
            <div className="flex items-center justify-center w-10 h-10 rounded-sm overflow-hidden mix-blend-screen transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]">
              <Image src="/logo.ico" alt="D2 Sherpa Logo" width={40} height={40} className="w-full h-full object-contain" unoptimized />
            </div>
            <div className="relative flex items-center">
              <span className="hidden sm:inline-block cyber-text">
                D2 Sherpa
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Loop */}
        <div className="hidden md:flex flex-1 items-center space-x-2">
          <NavigationMenu>
            <NavigationMenuList>
              {activities.map((category) => {
                const Icon = category.icon
                const theme = category.themeColor || "cyan";
                const currentVariant = category.locked ? 'red' : (theme as "cyan" | "green" | "red" | "orange" | "yellow" | "zinc");

                return (
                  <NavigationMenuItem key={category.id}>
                    <NavigationMenuTrigger className={topNavTriggerVariants({ variant: currentVariant })}>
                      {category.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className={topNavDropdownVariants({ variant: currentVariant })}>
                        <li className="w-[30%] shrink-0">
                          {category.locked ? (
                            <div
                              className={topNavCardBgVariants({ variant: currentVariant })}
                            >
                              <div className="absolute inset-0 bg-neon-red/5 animate-pulse" />
                              <Icon className={topNavIconVariants({ variant: currentVariant })} />
                              <div className={topNavTitleVariants({ variant: currentVariant })}>
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
                              className={topNavCardBgVariants({ variant: currentVariant })}
                            >
                              <div className={topNavCardGlowVariants({ variant: currentVariant })} />
                              <Icon className={topNavIconVariants({ variant: currentVariant })} />
                              <div className={topNavTitleVariants({ variant: currentVariant })}>
                                {category.title}
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground font-mono">
                                {category.description}
                              </p>
                            </div>
                          )}
                        </li>

                        <li className="flex-1 overflow-hidden">
                          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3 content-start">
                            {/* Map qua từng item nhỏ bên trong */}
                            {category.items.map((item) => (
                              <ListItem key={item.title} href={item.href} title={item.title} hoverClass={topNavHoverItemVariants({ variant: currentVariant })} descClass={topNavDescVariants({ variant: currentVariant })}>
                                {item.description}
                              </ListItem>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Portal Target for Dynamic Headers (e.g., Timeline Active Chapter) */}
        <div id="topnav-portal-target" className="ml-auto flex h-full items-center" />
      </div>
    </header>
  )

  if (isTimeline) {
    return (
      <>
        {/* Desktop Hover Nav */}
        <div className="fixed top-0 left-0 w-full h-6 z-[60] group hidden md:block">
          {headerElement}
        </div>
        
        {/* Mobile Floating Menu Button (Always floating on mobile) */}
        <div className="fixed top-2 left-4 z-[70] md:hidden">
          <MobileNav />
        </div>
      </>
    )
  }

  return (
    <>
      <div className={cn("hidden md:block w-full z-[60]", isHome ? "absolute top-0 left-0" : "sticky top-0")}>
        {headerElement}
      </div>
      
      {/* Mobile Floating Menu Button (Always floating on mobile) */}
      <div className="fixed top-2 left-4 z-[70] md:hidden">
        <MobileNav />
      </div>
    </>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { title: string, hoverClass?: string, descClass?: string }>(
  ({ className, title, children, hoverClass, descClass, ...props }, ref) => {
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
            <p className={cn("line-clamp-2 text-xs leading-snug text-zinc-500 font-mono mt-2 transition-colors", descClass)}>
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"