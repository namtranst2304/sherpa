import * as React from "react"
import Image from "next/image"
import { CyberCard } from "@/components/common/CyberComponents"
import { Shield } from "lucide-react"

import MOCK_ARMOR_SETS from "@/data/database/armor-sets.json"

export default function ArmorSetsPage() {
  return (
    <div className="flex flex-col gap-12 mt-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black uppercase tracking-wider text-neon-cyan">
          Armor Sets Library
        </h2>
        <p className="text-zinc-400 font-mono text-sm max-w-3xl">
          [MOCK DATA] Thư viện các bộ giáp hoàn chỉnh từ các hoạt động End-game.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {MOCK_ARMOR_SETS.map((set) => (
          <CyberCard key={set.id} variant="zinc" className="p-0 overflow-hidden flex flex-col group">
            {/* Header / Banner Area */}
            <div className="h-32 bg-zinc-900 border-b border-zinc-800 relative flex items-end p-6 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-zinc-950 to-transparent z-10" />
              {/* Fake Background Pattern */}
              <div className="absolute inset-0 opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                {set.pieces[0]?.icon && (
                  <Image src={set.pieces[0].icon} alt="Background" fill className="object-cover blur-md" unoptimized />
                )}
              </div>
              
              <div className="relative z-20 flex justify-between items-end w-full">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-widest text-zinc-100 group-hover:text-neon-cyan transition-colors">
                    {set.setName}
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">{set.source}</span>
                </div>
                <div className="w-12 h-12 rounded bg-black/50 border border-zinc-700 flex items-center justify-center overflow-hidden backdrop-blur-sm">
                  {set.pieces[0]?.icon ? (
                    <Image src={set.pieces[0].icon} alt="Icon" width={48} height={48} unoptimized />
                  ) : (
                    <span className="text-2xl">🪖</span>
                  )}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col gap-6">
              <p className="text-sm font-mono text-zinc-400">
                Class: <span className="text-neon-cyan uppercase">{set.class}</span>
              </p>

              <div className="bg-black/30 rounded border border-zinc-800/50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-zinc-500" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">Armor Pieces</span>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  {set.pieces.map((item) => (
                    <div key={item.name} className="flex items-center gap-3 bg-black/40 p-2 rounded border border-zinc-800 hover:border-zinc-500 transition-colors group">
                      <div className="w-12 h-12 bg-zinc-900 rounded overflow-hidden flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-zinc-500/50">
                        {item.icon ? (
                          <Image src={item.icon} alt={item.name} width={48} height={48} className="w-full h-full object-cover" unoptimized />
                        ) : (
                          <span className="text-2xl">🪖</span>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-zinc-200 truncate">{item.name}</span>
                        <span className="text-[10px] font-mono uppercase text-zinc-500">{item.slot}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-4 flex flex-col gap-2 border-t border-zinc-800/50">
                <span className="text-xs font-mono text-zinc-600 mb-1">SET BONUS / ORIGIN TRAIT</span>
                {set.setBonus ? Object.entries(set.setBonus).map(([key, desc]) => (
                  <div key={key} className="bg-black/40 p-3 rounded border border-zinc-800/50 flex flex-col gap-1">
                    <span className="text-xs font-bold text-neon-cyan uppercase">
                      {key === 'raid_mod' ? 'Raid Mod Socket' : 
                       key === 'origin_trait' ? 'Origin Trait' : 
                       key === 'rep_bonus' ? 'Reputation Bonus' : key}
                    </span>
                    <span className="text-sm text-zinc-400">{String(desc)}</span>
                  </div>
                )) : null}
              </div>
            </div>
          </CyberCard>
        ))}
      </div>
    </div>
  )
}
