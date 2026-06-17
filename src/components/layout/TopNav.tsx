"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Menu, Ghost } from "lucide-react"

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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background shadow-md shadow-black/50">
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
                  <Ghost className="h-5 w-5" />
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
          <Link href="/" className="flex items-center gap-2 space-x-2">
            <Ghost className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block tracking-tight uppercase">
              Destiny 2 Sherpa
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
                    <NavigationMenuTrigger className="bg-transparent uppercase tracking-wider">
                      {category.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-secondary p-6 no-underline outline-none focus:shadow-md border border-border"
                              href={category.href}
                            >
                              <Icon className="h-6 w-6 text-primary mb-2" />
                              <div className="mb-2 mt-4 text-lg font-medium uppercase">
                                {category.title}
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                {category.description}
                              </p>
                            </a>
                          </NavigationMenuLink>
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
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"