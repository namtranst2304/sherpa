import * as React from "react"
import { CyberCard } from "@/components/common/CyberComponents"
import { Sparkles, Target, Crosshair } from "lucide-react"

import MOCK_CATALYSTS from "@/data/database/catalysts.json"

export default function CatalystsPage() {
  return (
    <div className="flex flex-col gap-12 mt-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black uppercase tracking-wider text-neon-cyan">
          Exotic Catalysts
        </h2>
        <p className="text-zinc-400 font-mono text-sm max-w-3xl">
          [MOCK DATA] Tra cứu hiệu ứng nâng cấp (Catalyst) của các vũ khí Exotic, cách lấy và yêu cầu mở khóa.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {MOCK_CATALYSTS.map((cat) => (
          <CyberCard key={cat.id} variant="zinc" className="p-0 overflow-hidden flex flex-col md:flex-row group">
            
            {/* Weapon Info Sidebar */}
            <div className="w-full md:w-64 bg-zinc-900/50 border-r border-zinc-800 p-6 flex flex-col gap-4 items-center md:items-start justify-center">
              <div className="w-20 h-20 bg-black/50 rounded border border-amber-500/30 flex items-center justify-center text-4xl group-hover:border-amber-500 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.1)] group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                {cat.icon}
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg font-black uppercase text-amber-500 tracking-wider leading-tight">{cat.weaponName}</h3>
                <span className="text-xs font-mono text-amber-500/50 uppercase">{cat.weaponType}</span>
              </div>
            </div>

            {/* Catalyst Info Area */}
            <div className="flex-1 p-6 flex flex-col gap-6">
              
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-neon-cyan" />
                    <h4 className="text-xl font-bold text-zinc-100 uppercase tracking-widest">{cat.catalystName}</h4>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
                    {cat.effect}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
                <div className="bg-black/30 rounded border border-zinc-800/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">Cách Lấy (Source)</span>
                  </div>
                  <p className="text-sm text-zinc-400">{cat.source}</p>
                </div>
                
                <div className="bg-black/30 rounded border border-zinc-800/50 p-4 relative overflow-hidden">
                  {/* Progress Bar Mock */}
                  <div className="absolute bottom-0 left-0 h-1 bg-zinc-800 w-full">
                    <div className={`h-full ${cat.isCompleted ? 'bg-neon-green w-full' : 'bg-neon-cyan w-1/3'}`} />
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Crosshair className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">Yêu Cầu (Objective)</span>
                  </div>
                  <p className="text-sm text-zinc-400">{cat.objective}</p>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded ${cat.isCompleted ? 'bg-neon-green/10 text-neon-green border border-neon-green/20' : 'bg-zinc-800 text-zinc-400'}`}>
                      {cat.isCompleted ? 'Đã Hoàn Thành' : 'Chưa Mở Khóa'}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </CyberCard>
        ))}
      </div>
    </div>
  )
}
