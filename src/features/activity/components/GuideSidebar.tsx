"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
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
  href?: string;
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
  activeEncounterId,
}: {
  title: string;
  subtitle: string;
  orbit?: string;
  groups: SidebarGroup[];
  activeEncounterId?: string;
}) {
  const { setOpenMobile } = useSidebar();
  
  // Flatten item IDs to pass to the hook
  const itemIds = groups.reduce((acc, g) => {
    g.items.forEach(item => acc.push(item.id));
    return acc;
  }, [] as string[]);

  const activeId = useScrollSpy(itemIds, 120, activeEncounterId);

  return (
    <Sidebar className="top-[3.5rem] h-[calc(100vh-3.5rem)] border-r-2 border-r-neon-yellow/50 z-40 bg-black cyber-grid" collapsible="icon">
      <SidebarHeader className="border-b-2 border-neon-yellow p-4 relative overflow-hidden bg-zinc-950">
        {/* Decorative cyber corner */}
        <div className="absolute top-0 right-0 w-8 h-8 bg-neon-yellow -rotate-45 translate-x-4 -translate-y-4" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-neon-yellow to-transparent" />
        
        <h1 className="text-xl font-extrabold text-neon-yellow tracking-widest uppercase break-words text-glow-yellow" title={title}>
          {title}
        </h1>
        <div className="mt-2">
          <h2 className="text-[10px] font-black text-black bg-neon-cyan tracking-widest uppercase break-words inline-block px-2 py-0.5">
            {subtitle}
          </h2>
        </div>
        {orbit && (
          <p className="text-[10px] text-zinc-500 mt-2 break-words font-mono uppercase">sys.orbit: {orbit}</p>
        )}
      </SidebarHeader>
      <SidebarContent>
        {groups.map((group, idx) => (
          <ShadcnSidebarGroup key={idx} className="mt-2">
            {group.title && <SidebarGroupLabel className="text-neon-red font-mono tracking-widest uppercase text-[10px] opacity-80">{group.title}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = activeId === item.id;
                  const linkHref = item.href || `#${item.id}`;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        onClick={() => setOpenMobile(false)}
                        className={cn(
                          "transition-all h-auto py-2.5 relative group overflow-hidden rounded-none font-mono text-sm",
                          isActive 
                            ? "text-black font-extrabold bg-neon-yellow hover:bg-neon-yellow/90 hover:text-black border-l-4 border-neon-red" 
                            : "text-zinc-400 hover:bg-neon-cyan/10 hover:text-neon-cyan hover:border-l-4 hover:border-neon-cyan border-l-4 border-transparent"
                        )}
                        tooltip={item.title}
                      >
                        <Link href={linkHref} className="flex items-start justify-between w-full gap-2 relative z-10">
                          <div className={cn("break-words whitespace-normal leading-tight tracking-wide", item.isFinal && !isActive && "text-neon-red font-extrabold text-glow-red", item.isFinal && isActive && "text-red-700 font-extrabold")}>
                            {item.title}
                          </div>
                          {item.label && (
                            <div
                              className={cn(
                                "text-[9px] px-1.5 py-0.5 rounded-none font-bold font-mono ml-2 shrink-0 border uppercase",
                                isActive 
                                  ? "bg-black text-neon-yellow border-black" 
                                  : (item.isFinal
                                    ? "bg-neon-red/20 text-neon-red border-neon-red/50"
                                    : "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50")
                              )}
                            >
                              {item.label}
                            </div>
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
