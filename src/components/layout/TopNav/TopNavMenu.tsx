'use client'

import React from 'react'
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
import {
  topNavTriggerVariants,
  topNavDropdownVariants,
  topNavCardBgVariants,
  topNavIconVariants,
  topNavTitleVariants,
  topNavHoverItemVariants,
  topNavCardGlowVariants,
  topNavDescVariants,
} from '../top-nav-variants'

export function TopNavMenu() {
  const activities = Object.values(DESTINY_ACTIVITIES)

  return (
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
                              : 'text-muted-foreground'
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
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold tracking-wider text-zinc-300 uppercase transition-colors">
            {title}
          </div>
          <p
            className={cn(
              'mt-2 line-clamp-2 font-mono text-xs leading-snug text-zinc-500 transition-colors',
              descClass
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
