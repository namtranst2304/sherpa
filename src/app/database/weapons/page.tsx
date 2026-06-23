import * as React from "react"
import Image from "next/image"
import { DATABASE_WEAPONS } from "@/data"

export default function WeaponsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl md:text-5xl font-black tracking-widest uppercase text-neon-cyan text-glow-cyan mb-4">
          Meta Weapons
        </h1>
        <p className="text-zinc-400 font-mono">
          Danh sách các vũ khí mạnh nhất đang làm mưa làm gió trong PvE & PvP kèm God Roll do D2 Sherpa khuyên dùng.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {DATABASE_WEAPONS.map((weapon) => (
          <div key={weapon.id} className="relative group bg-zinc-900/30 border-2 border-zinc-800 hover:border-neon-cyan/50 rounded-lg p-6 flex flex-col gap-4 overflow-hidden transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-neon-cyan/20 transition-colors" />
            
            <div className="flex gap-4 items-start relative z-10">
              <div className="w-16 h-16 shrink-0 rounded border-2 border-zinc-800 overflow-hidden group-hover:border-neon-cyan/50 transition-colors">
                <Image src={weapon.image} alt={weapon.name} width={64} height={64} className="w-full h-full object-cover" unoptimized />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-black uppercase tracking-wider text-zinc-100 group-hover:text-neon-cyan transition-colors">{weapon.name}</h3>
                <span className="text-xs font-mono text-zinc-500 uppercase">{weapon.type} • {weapon.element}</span>
                <span className="text-xs font-mono text-zinc-600 mt-1">{weapon.frame}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-2 relative z-10">
              <div className="flex flex-col gap-1 p-3 bg-black/40 rounded border border-zinc-800/50">
                <span className="text-[10px] uppercase font-bold text-neon-green tracking-widest">PvE God Roll</span>
                <div className="flex items-center gap-2">
                  {weapon.pve_god_roll.map((perk, i) => (
                    <React.Fragment key={perk}>
                      <span className="text-sm font-mono text-zinc-300">{perk}</span>
                      {i < weapon.pve_god_roll.length - 1 && <span className="text-zinc-700">+</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1 p-3 bg-black/40 rounded border border-zinc-800/50">
                <span className="text-[10px] uppercase font-bold text-neon-red tracking-widest">PvP God Roll</span>
                <div className="flex items-center gap-2">
                  {weapon.pvp_god_roll.map((perk, i) => (
                    <React.Fragment key={perk}>
                      <span className="text-sm font-mono text-zinc-300">{perk}</span>
                      {i < weapon.pvp_god_roll.length - 1 && <span className="text-zinc-700">+</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-4 flex justify-between items-center relative z-10">
              <span className="text-xs font-mono text-zinc-600">Source: {weapon.source}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
