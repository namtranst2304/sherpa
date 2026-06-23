import * as React from "react"
import Image from "next/image"
import { DATABASE_ARMORS } from "@/data"

export default function ArmorsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl md:text-5xl font-black tracking-widest uppercase text-neon-cyan text-glow-cyan mb-4">
          Exotic Armors
        </h1>
        <p className="text-zinc-400 font-mono">
          Danh sách các trang bị Exotic mạnh nhất giúp định hình Meta và phong cách chơi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DATABASE_ARMORS.map((armor) => (
          <div key={armor.id} className="relative group bg-zinc-900/30 border-2 border-zinc-800 hover:border-neon-cyan/50 rounded-lg p-6 flex flex-col gap-4 overflow-hidden transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-neon-cyan/20 transition-colors" />
            
            <div className="flex gap-4 items-start relative z-10">
              <div className="w-16 h-16 shrink-0 rounded border-2 border-zinc-800 overflow-hidden group-hover:border-neon-cyan/50 transition-colors">
                <Image src={armor.image} alt={armor.name} width={64} height={64} className="w-full h-full object-cover" unoptimized />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-black uppercase tracking-wider text-zinc-100 group-hover:text-neon-cyan transition-colors">{armor.name}</h3>
                <span className="text-xs font-mono text-zinc-500 uppercase">{armor.class} • {armor.element}</span>
                <span className="inline-block mt-2 px-2 py-1 bg-zinc-800 text-zinc-300 text-xs font-mono rounded w-max">
                  {armor.perk_name}
                </span>
              </div>
            </div>

            <div className="flex flex-col mt-2 relative z-10 p-4 bg-black/40 rounded border border-zinc-800/50">
              <p className="text-sm font-mono text-zinc-400 leading-relaxed">
                {armor.perk_description}
              </p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}
