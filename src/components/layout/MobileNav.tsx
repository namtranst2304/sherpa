"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { DESTINY_ACTIVITIES } from "@/config/constants";

const THEME_TEXT = {
  cyan: 'text-neon-cyan',
  green: 'text-neon-green',
  red: 'text-neon-red',
  orange: 'text-neon-orange',
  yellow: 'text-neon-yellow',
  zinc: 'text-zinc-400'
} as const;

export function MobileNav() {
  const activities = Object.values(DESTINY_ACTIVITIES);
  
  const [openCategories, setOpenCategories] = React.useState<Record<string, boolean>>({
    // Keep the first category open by default to show some content immediately
    [activities[0]?.id]: true
  });

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  return (
    <Popover>
      <div className="group flex items-center gap-2 w-fit bg-[#030303]/95 backdrop-blur-xl rounded-full pl-1 py-1 shadow-[0_0_15px_rgba(0,243,255,0.2)] border border-neon-cyan/40 relative z-[70] transition-all has-[[data-state=open]]:pr-6 pr-1">
        
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="peer flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black hover:bg-white/10 transition-colors text-neon-cyan border border-neon-cyan/30 active:scale-95 outline-none"
          >
            <Menu className="h-5 w-5 peer-data-[state=open]:hidden group-has-[[data-state=open]]:hidden" />
            <X className="h-5 w-5 hidden peer-data-[state=open]:block group-has-[[data-state=open]]:block" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </PopoverTrigger>
        
        <Link href="/" className="hidden group-has-[[data-state=open]]:flex items-center gap-2 ml-1 cursor-pointer hover:opacity-80 transition-opacity">
          <Image src="/logo.ico" alt="Logo" width={24} height={24} className="w-6 h-6 object-contain drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" unoptimized />
          <span className="font-bold text-[15px] tracking-wide cyber-text uppercase whitespace-nowrap">D2 Sherpa</span>
        </Link>

        <PopoverContent 
          side="bottom"
          align="start"
          sideOffset={16}
          className="w-[92vw] sm:w-[400px] border-none bg-transparent shadow-none p-0 z-[100] data-[side=bottom]:slide-in-from-top-4 outline-none"
        >
          {/* Main Menu Box - Dark frosted glass with neon accents */}
          <div className="w-full bg-[#030303]/95 backdrop-blur-2xl rounded-3xl overflow-hidden border border-neon-cyan/40 shadow-[15px_15px_40px_rgba(0,243,255,0.15)] flex flex-col max-h-[75vh] relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/10 blur-3xl -mr-10 -mt-10 pointer-events-none" />

            {/* Scrollable Navigation Content */}
            <nav className="flex-1 overflow-y-auto px-6 py-8 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              
              {/* Global Navigation Links */}
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-500 delay-100 fill-mode-both">
                {activities.map((act) => {
                  const theme = act.themeColor || "cyan";
                  const titleColor = act.locked ? 'text-neon-red' : THEME_TEXT[theme as keyof typeof THEME_TEXT] || THEME_TEXT.zinc;
                  const isOpen = openCategories[act.id];
                  
                  return (
                    <div key={`mobile-${act.id}`} className="flex flex-col gap-2 group">
                      <button 
                        onClick={() => toggleCategory(act.id)}
                        className={`w-full text-left text-[13px] font-bold tracking-[0.2em] uppercase flex items-center gap-3 ${titleColor} outline-none py-2 rounded-md hover:bg-white/5 active:bg-white/10 px-2 -mx-2 transition-colors`}
                      >
                        <div className={cn("w-2 h-2 rotate-45 transition-transform group-hover:scale-125 shrink-0", `bg-${theme}-500/50`, `border border-${theme}-500`)} />
                        <span className="truncate">{act.title}</span>
                        
                        <div className="ml-auto flex items-center gap-3 shrink-0">
                          {act.locked && (
                            <span className="text-[9px] font-mono font-bold tracking-wider border border-neon-red/50 px-2 py-0.5 bg-neon-red/10 text-neon-red shadow-[0_0_8px_rgba(255,0,51,0.2)]">
                              LOCKED
                            </span>
                          )}
                          <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isOpen ? "rotate-180" : "rotate-0 opacity-50")} />
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="flex flex-col gap-1 pl-4 border-l border-zinc-800/50 ml-1 animate-in slide-in-from-top-2 fade-in duration-200">
                          {act.items.map((item) => (
                            <PopoverClose asChild key={`mobile-item-${item.title}`}>
                              <Link 
                                href={act.locked ? "#" : item.href} 
                                className={cn(
                                  "py-2.5 px-4 text-sm font-mono transition-all break-words whitespace-normal rounded-r-md outline-none",
                                  act.locked 
                                    ? "text-zinc-700 cursor-not-allowed" 
                                    : "text-zinc-400 hover:text-white hover:bg-white/5 active:bg-white/10 hover:translate-x-1"
                                )}
                                onClick={(e) => {
                                  if (act.locked) e.preventDefault();
                                }}
                              >
                                {item.title}
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
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
}
