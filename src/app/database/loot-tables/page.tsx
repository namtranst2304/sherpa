import * as React from "react"
import Image from "next/image"
import { CyberCard } from "@/components/common/CyberComponents"

import MOCK_LOOT_TABLES from "@/data/database/loot-tables.json"

export default function LootTablesPage() {
  return (
    <div className="flex flex-col gap-12 mt-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black uppercase tracking-wider text-neon-cyan">
          Raid & Dungeon Loot
        </h2>
        <p className="text-zinc-400 font-mono text-sm max-w-3xl">
          [MOCK DATA] Bảng tra cứu phần thưởng của từng ải. Sau khi có API Key, các icon placeholder sẽ được thay thế bằng Icon gốc lấy từ Bungie.
        </p>
      </div>

      {MOCK_LOOT_TABLES.map((activity) => (
        <div key={activity.id} className="flex flex-col gap-6">
          <h3 className="text-xl font-bold uppercase tracking-widest text-zinc-100 border-b-2 border-neon-cyan pb-2 inline-block w-fit">
            {activity.name} <span className="text-xs font-mono text-zinc-500 ml-2 bg-zinc-900 px-2 py-1 rounded">{activity.type}</span>
          </h3>

          <div className="grid grid-cols-1 gap-6">
            {activity.encounters.map((enc) => (
              <CyberCard key={enc.order} variant="zinc" className="p-6">
                <h4 className="text-lg font-bold text-zinc-100 mb-6 pb-2 border-b border-zinc-800/50">
                  <span className="text-zinc-500 mr-2 font-mono">#{enc.order}</span>
                  {enc.name}
                </h4>
                
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Weapons Column */}
                  {enc.weapons.length > 0 && (
                    <div className="flex-1">
                      <h5 className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-3">Weapons Drop</h5>
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                        {enc.weapons.map(item => (
                          <div key={item.name} className="flex items-center gap-3 bg-black/40 p-2 rounded border border-zinc-800 hover:border-neon-cyan/50 transition-colors group">
                            <div className="w-10 h-10 bg-zinc-900 rounded overflow-hidden flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-neon-cyan/30">
                              {item.icon ? (
                                <Image src={item.icon} alt={item.name} width={40} height={40} className="w-full h-full object-cover" unoptimized />
                              ) : (
                                <span className="text-xl">🔫</span>
                              )}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className={`text-sm font-bold truncate ${item.tier === 'Exotic' ? 'text-amber-500' : 'text-zinc-200 group-hover:text-neon-cyan'}`}>
                                {item.name}
                              </span>
                              <span className="text-[10px] uppercase text-zinc-500">{item.type}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Armor Column */}
                  {enc.armor.length > 0 && (
                    <div className="flex-1">
                      <h5 className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-3">Armor Drop</h5>
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                        {enc.armor.map(item => (
                          <div key={item.name} className="flex items-center gap-3 bg-black/40 p-2 rounded border border-zinc-800 hover:border-zinc-500 transition-colors group">
                            <div className="w-10 h-10 bg-zinc-900 rounded overflow-hidden flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-zinc-500/50">
                              {item.icon ? (
                                <Image src={item.icon} alt={item.name} width={40} height={40} className="w-full h-full object-cover" unoptimized />
                              ) : (
                                <span className="text-xl">🪖</span>
                              )}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-bold text-zinc-200 truncate group-hover:text-white">
                                {item.name}
                              </span>
                              <span className="text-[10px] uppercase text-zinc-500">Armor Piece</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Exotic Column */}
                  {enc.exotic && (
                    <div className="w-full md:w-48 shrink-0">
                      <h5 className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500/50 mb-3">Exotic Drop</h5>
                      <div className="flex items-center gap-3 bg-amber-950/20 p-2 rounded border border-amber-900/50 hover:border-amber-500 transition-colors group">
                        <div className="w-10 h-10 bg-amber-900/30 rounded overflow-hidden flex items-center justify-center shrink-0 border border-amber-500/30">
                          {enc.exotic.icon ? (
                            <Image src={enc.exotic.icon} alt={enc.exotic.name} width={40} height={40} className="w-full h-full object-cover" unoptimized />
                          ) : (
                            <span className="text-xl">🌟</span>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-bold text-amber-500 truncate">{enc.exotic.name}</span>
                          <span className="text-[10px] uppercase text-amber-500/50">Exotic Drop</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CyberCard>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
