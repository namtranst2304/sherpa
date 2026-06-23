import React from "react"
import Image from "next/image"
import { Target, CheckCircle2, Sparkles } from "lucide-react"

export interface CatalystObjective {
  description: string;
  completionValue: number;
}

export interface CatalystEffect {
  name: string;
  description: string;
  icon: string | null;
}

export interface CatalystData {
  id: number;
  name: string;
  weaponName: string;
  weaponIcon: string | null;
  icon: string | null;
  description: string;
  objectives: CatalystObjective[];
  effects?: CatalystEffect[];
  source: string;
}

export function CatalystCard({ catalyst }: { catalyst: CatalystData }) {
  const iconUrl = catalyst.icon ? `https://www.bungie.net${catalyst.icon}` : null;
  const weaponIconUrl = catalyst.weaponIcon ? `https://www.bungie.net${catalyst.weaponIcon}` : null;

  return (
    <div className="flex flex-col rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden shadow-lg hover:border-neon-cyan/50 transition-colors h-full">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-zinc-800 bg-zinc-950/50">
        <div className="relative w-12 h-12 flex-shrink-0 bg-zinc-800 rounded">
          {weaponIconUrl ? (
            <Image src={weaponIconUrl} alt={catalyst.weaponName} fill className="object-cover rounded" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600">?</div>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-white leading-tight">{catalyst.name}</h3>
          <div className="flex items-center gap-2 text-sm text-neon-cyan font-mono mt-1">
            {iconUrl && (
              <img src={iconUrl} alt="Catalyst Icon" className="h-4 w-auto rounded-sm object-contain" />
            )}
            <span>{catalyst.weaponName}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-4 flex-grow">
        {catalyst.effects && catalyst.effects.length > 0 ? (
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neon-cyan/70 flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Catalyst Effects
            </h4>
            {catalyst.effects.map((effect, i) => (
              <div key={i} className="flex gap-3 items-start p-2.5 rounded bg-black/30 border border-zinc-800/50">
                {effect.icon && (
                  <img src={`https://www.bungie.net${effect.icon}`} alt={effect.name} className="w-6 h-6 rounded-sm bg-zinc-900" />
                )}
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-zinc-200">{effect.name}</span>
                  <span className="text-zinc-400 text-sm mt-0.5">{effect.description}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-400 text-sm italic border-l-2 border-zinc-700 pl-3">
            {catalyst.description.replace(/(\n)/g, " ")}
          </p>
        )}

      </div>
    </div>
  )
}
