"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup as ShadcnSidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export type SidebarSection = {
  id: string;
  title: string;
  label?: string;
  isFinal?: boolean;
};

export type SidebarGroup = {
  title?: string;
  items: SidebarSection[];
};

export function GuideSidebar({
  title,
  subtitle,
  orbit,
  groups,
}: {
  title: string;
  subtitle: string;
  orbit?: string;
  groups: SidebarGroup[];
}) {
  const [activeId, setActiveId] = useState<string>("");
  const { setOpenMobile } = useSidebar();

  useEffect(() => {
    const handleScroll = () => {
      const sections = groups.flatMap((g) => g.items).map((item) => document.getElementById(item.id));
      let currentId = "";
      
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          // Adjust threshold based on your top nav height
          if (rect.top <= 120) {
            currentId = section.id;
          }
        }
      }
      
      if (currentId !== activeId) {
        setActiveId(currentId);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [groups, activeId]);

  return (
    <Sidebar className="top-[3.5rem] h-[calc(100vh-3.5rem)] border-r-border z-40 bg-background" collapsible="icon">
      <SidebarHeader className="border-b border-border p-4">
        <h1 className="text-xl font-extrabold text-foreground tracking-wider uppercase truncate">
          {title}
        </h1>
        <h2 className="text-xs font-black text-primary tracking-widest uppercase mt-1 truncate">
          {subtitle}
        </h2>
        {orbit && (
          <p className="text-[10px] text-muted-foreground mt-2 truncate">Active Orbit: {orbit}</p>
        )}
      </SidebarHeader>
      <SidebarContent>
        {groups.map((group, idx) => (
          <ShadcnSidebarGroup key={idx}>
            {group.title && <SidebarGroupLabel>{group.title}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        onClick={() => setOpenMobile(false)}
                        className={cn(
                          "transition-all",
                          isActive ? "text-primary font-bold bg-muted/50" : "text-foreground/70"
                        )}
                        tooltip={item.title}
                      >
                        <Link href={`#${item.id}`} className="flex items-center justify-between w-full">
                          <span className={cn("truncate", item.isFinal && "text-destructive font-extrabold")}>
                            {item.title}
                          </span>
                          {item.label && (
                            <span
                              className={cn(
                                "text-[9px] px-1.5 py-0.5 rounded font-bold font-mono ml-2 shrink-0",
                                item.isFinal
                                  ? "bg-destructive/20 text-destructive"
                                  : "bg-primary/20 text-primary"
                              )}
                            >
                              {item.label}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </ShadcnSidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
