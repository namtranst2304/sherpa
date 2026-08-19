'use client'

import * as React from 'react'
import * as HoverCard from '@radix-ui/react-hover-card'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlossaryTerm } from '@/config/glossary'

interface GhostTooltipProps {
  children: React.ReactNode
  term: GlossaryTerm
}

export function GhostTooltip({ children, term }: GhostTooltipProps) {
  const getBadgeColor = (type: GlossaryTerm['type']) => {
    switch (type) {
      case 'buff':
        return 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan'
      case 'debuff':
        return 'border-neon-red/40 bg-neon-red/10 text-neon-red'
      case 'mechanic':
        return 'border-neon-yellow/40 bg-neon-yellow/10 text-neon-yellow'
      case 'tactic':
        return 'border-neon-orange/40 bg-neon-orange/10 text-neon-orange'
      default:
        return 'border-zinc-700 bg-zinc-800 text-zinc-300'
    }
  }

  return (
    <HoverCard.Root openDelay={200} closeDelay={100}>
      <HoverCard.Trigger asChild>
        <span className="cursor-help border-b border-dashed border-neon-cyan text-neon-cyan font-bold hover:bg-neon-cyan/10 hover:text-white transition-colors">
          {children}
        </span>
      </HoverCard.Trigger>
      
      <HoverCard.Portal>
        <HoverCard.Content
          sideOffset={5}
          className="z-[9999] w-64 md:w-80 p-0 animate-in zoom-in-95 fade-in duration-200"
        >
          <div className="relative border-2 border-neon-cyan/60 bg-zinc-950/95 cyber-grid p-4 shadow-[0_0_40px_rgba(0,243,255,0.25)] backdrop-blur-xl">
            {/* Cyber Corner Brackets */}
            <div className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-neon-cyan" />
            <div className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-neon-cyan" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-neon-cyan" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-neon-cyan" />
            
            {/* Scanline effect */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50" />

            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-neon-cyan animate-pulse" />
                <h4 className="font-mono text-sm font-bold text-white uppercase glow-text-cyan tracking-wider">
                  {term.term}
                </h4>
              </div>
              <span className={cn('border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest', getBadgeColor(term.type))}>
                {term.type}
              </span>
            </div>
            
            <div className="space-y-2 font-mono text-xs text-zinc-300">
              <p className="font-bold text-zinc-100">{term.short_desc}</p>
              {term.full_desc && (
                <p className="text-zinc-400 leading-relaxed border-l-2 border-zinc-700 pl-2">
                  {term.full_desc}
                </p>
              )}
            </div>
            
            <div className="mt-3 border-t border-zinc-800/80 pt-2 text-right">
              <span className="font-mono text-[9px] tracking-widest text-neon-cyan/60 uppercase">
                Ghost Scan Data // Match Found
              </span>
            </div>
          </div>
          <HoverCard.Arrow className="fill-neon-cyan/60" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
