"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function TopNav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/raids", label: "Raids" },
    { href: "/dungeons", label: "Dungeons" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto px-4">
        {/* Only show SidebarTrigger if we are inside a route that has the sidebar, 
            but since SidebarProvider wraps everything, we can show it here for mobile */}
        <div className="md:hidden mr-2">
          <SidebarTrigger />
        </div>
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block text-primary tracking-widest">
              SHERPA
            </span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {links.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <NavigationMenuItem key={link.href}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        active={isActive}
                        className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
