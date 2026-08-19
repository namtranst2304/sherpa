'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { DESTINY_ACTIVITIES } from '@/config/constants'
import { MobileNav } from './MobileNav'
import { CommandPalette } from './CommandPalette'

import {
  topNavTriggerVariants,
  topNavDropdownVariants,
  topNavCardBgVariants,
  topNavIconVariants,
  topNavTitleVariants,
  topNavHoverItemVariants,
  topNavCardGlowVariants,
  topNavDescVariants,
} from './top-nav-variants'

export function TopNav() {
  const pathname = usePathname()
  const activities = Object.values(DESTINY_ACTIVITIES)

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
        {/* Desktop Logo */}
        <div className="mr-8 hidden md:flex">
          <Link
            href="/"
            className="cyber-text-container group flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-sm mix-blend-screen transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]">
              <Image
                src="/logo.ico"
                alt="D2 Sherpa Logo"
                width={40}
                height={40}
                className="h-full w-full object-contain"
                unoptimized
              />
            </div>
            <div className="relative flex items-center">
              <span className="cyber-text hidden sm:inline-block">
                D2 Sherpa
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Loop */}
        <div className="hidden flex-1 items-center space-x-2 md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {activities.map((category) => {
                const Icon = category.icon
                const currentVariant = category.locked
                  ? 'red'
                  : category.themeColor || 'cyan'

                return (
                  <NavigationMenuItem key={category.id}>
                    <NavigationMenuTrigger
                      className={topNavTriggerVariants({
                        variant: currentVariant,
                      })}
                    >
                      {category.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul
                        className={topNavDropdownVariants({
                          variant: currentVariant,
                        })}
                      >
                        <li className="w-[30%] shrink-0">
                          <div
                            className={topNavCardBgVariants({
                              variant: currentVariant,
                            })}
                          >
                            {category.locked ? (
                              <div className="absolute inset-0 animate-pulse bg-neon-red/5" />
                            ) : (
                              <div
                                className={topNavCardGlowVariants({
                                  variant: currentVariant,
                                })}
                              />
                            )}
                            <Icon
                              className={topNavIconVariants({
                                variant: currentVariant,
                              })}
                            />
                            <div
                              className={topNavTitleVariants({
                                variant: currentVariant,
                              })}
                            >
                              {category.title}
                              {category.locked && (
                                <span className="animate-pulse border border-neon-red bg-neon-red/20 px-1.5 py-0.5 text-[10px] text-neon-red">
                                  ĐANG CẬP NHẬT
                                </span>
                              )}
                            </div>
                            <p
                              className={cn(
                                'font-mono text-sm leading-tight',
                                category.locked
                                  ? 'text-neon-red/70'
                                  : 'text-muted-foreground',
                              )}
                            >
                              {category.description}
                            </p>
                          </div>
                        </li>

                        <li className="flex-1 overflow-hidden">
                          <ul className="grid grid-cols-2 content-start gap-3 lg:grid-cols-3">
                            {category.items.map((item) => (
                              <ListItem
                                key={item.title}
                                href={item.href}
                                title={item.title}
                                hoverClass={topNavHoverItemVariants({
                                  variant: currentVariant,
                                })}
                                descClass={topNavDescVariants({
                                  variant: currentVariant,
                                })}
                              >
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

        {/* Right Action Area: Portal Target & Command Palette Search */}
        <div className="ml-auto flex h-full items-center gap-3">
          <div id="topnav-portal-target" className="flex h-full items-center" />
          <CommandPalette />
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
            isHome ? 'absolute top-0 left-0' : 'sticky top-0',
          )}
        >
          {headerElement}
        </div>
      )}

      {/* Mobile Floating Menu Button (Always floating on mobile) */}
      <div className="fixed left-4 top-2 z-[70] md:hidden">
        <MobileNav />
      </div>

      {/* Mobile Floating Search Button */}
      <div className="fixed right-4 top-2 z-[70] md:hidden">
        <CommandPalette />
      </div>
    </>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    title: string
    hoverClass?: string
    descClass?: string
  }
>(({ className, title, children, hoverClass, descClass, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'group block space-y-1 rounded-none border-l-2 border-transparent p-3 leading-none no-underline transition-all outline-none select-none',
            hoverClass || 'hover:border-neon-cyan hover:bg-neon-cyan/10',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-bold tracking-wider text-zinc-300 uppercase transition-colors">
            {title}
          </div>
          <p
            className={cn(
              'mt-2 line-clamp-2 font-mono text-xs leading-snug text-zinc-500 transition-colors',
              descClass,
            )}
          >
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
