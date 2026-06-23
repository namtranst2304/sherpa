import * as React from "react"
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
              <div className="absolute inset-0 opacity-10 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-700">
                {set.icon}
              </div>
              
              <div className="relative z-20 flex justify-between items-end w-full">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-widest text-zinc-100 group-hover:text-neon-cyan transition-colors">
                    {set.name}
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">{set.source}</span>
                </div>
                <div className="w-12 h-12 rounded bg-black/50 border border-zinc-700 flex items-center justify-center text-2xl backdrop-blur-sm">
                  {set.icon}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col gap-6">
              <p className="text-sm text-zinc-400">
                {set.description}
              </p>

              <div className="bg-black/30 rounded border border-zinc-800/50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-zinc-500" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">Armor Pieces</span>
                </div>
                
                <div className="grid grid-cols-5 gap-2">
                  {set.pieces.map(piece => (
                    <div key={piece.name} className="flex flex-col items-center gap-2 group/piece cursor-help" title={piece.name}>
                      <div className="w-full aspect-square bg-zinc-900 rounded border border-zinc-800 flex items-center justify-center text-2xl group-hover/piece:border-neon-cyan/50 transition-colors">
                        {piece.icon}
                      </div>
                      <span className="text-[9px] font-mono uppercase text-zinc-600 text-center">{piece.slot}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-2 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-600">Stat Bias: <span className="text-zinc-300">{set.stats}</span></span>
              </div>
            </div>
          </CyberCard>
        ))}
      </div>
    </div>
  )
}
