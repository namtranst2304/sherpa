import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export interface ExoticArmor {
  id: number;
  name: string;
  icon: string;
  class: string;
  type: string;
  trait: {
    name: string;
    description: string;
    icon: string;
    perkPool?: {
      column1: { name: string; description: string; icon: string }[];
      column2: { name: string; description: string; icon: string }[];
    };
  };
}

export function ExoticArmorCard({ armor }: { armor: ExoticArmor }) {
  const iconUrl = armor.icon ? `https://www.bungie.net${armor.icon}` : null;
  const traitIconUrl = armor.trait.icon ? `https://www.bungie.net${armor.trait.icon}` : null;

  return (
    <div className="flex flex-col bg-zinc-900/50 rounded-lg border border-zinc-800/50 overflow-hidden hover:border-neon-cyan/50 transition-colors">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-zinc-800 bg-zinc-950/50">
        <div className="relative w-12 h-12 flex-shrink-0 bg-zinc-800 rounded">
          {iconUrl ? (
            <Image src={iconUrl} alt={armor.name} fill className="object-cover rounded" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600">?</div>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-white leading-tight">{armor.name}</h3>
          <div className="flex items-center gap-2 text-sm text-neon-cyan font-mono mt-1">
            <span>{armor.type}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3 text-neon-cyan text-sm font-black tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            <span>EXOTIC TRAIT</span>
          </div>
          
          <div className="flex gap-3 items-start p-3 rounded bg-black/30 border border-zinc-800/50">
            {traitIconUrl && (
              <Image src={traitIconUrl} alt={armor.trait.name} width={32} height={32} className="rounded-sm shrink-0" unoptimized />
            )}
            <div className="flex flex-col flex-1">
              <span className="font-bold text-white mb-1">{armor.trait.name}</span>
              <span className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap">{armor.trait.description}</span>
              
              {/* Perk Pool for Class Items */}
              {armor.trait.perkPool && (
                <div className="mt-6 border-t border-zinc-800 pt-6">
                  {/* Mobile Layout: Stacked Columns */}
                  <div className="flex flex-col gap-6 lg:hidden">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-300 uppercase mb-3 tracking-wider text-neon-cyan/80">Column 1</h4>
                      <div className="flex flex-col gap-4">
                        {armor.trait.perkPool.column1.map((perk, i) => (
                          <div key={i} className="flex gap-3">
                            {perk.icon && <Image src={`https://www.bungie.net${perk.icon}`} alt={perk.name} width={32} height={32} className="rounded shrink-0 bg-black" unoptimized />}
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-zinc-200">{perk.name}</span>
                              <span className="text-xs text-zinc-500 leading-relaxed">{perk.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-300 uppercase mb-3 tracking-wider text-neon-cyan/80">Column 2</h4>
                      <div className="flex flex-col gap-4">
                        {armor.trait.perkPool.column2.map((perk, i) => (
                          <div key={i} className="flex gap-3">
                            {perk.icon && <Image src={`https://www.bungie.net${perk.icon}`} alt={perk.name} width={32} height={32} className="rounded shrink-0 bg-black" unoptimized />}
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-zinc-200">{perk.name}</span>
                              <span className="text-xs text-zinc-500 leading-relaxed">{perk.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout: Aligned Rows Grid */}
                  <div className="hidden lg:grid grid-cols-2 gap-x-8 gap-y-4">
                    <div className="text-sm font-bold text-zinc-300 uppercase tracking-wider text-neon-cyan/80 pb-2 border-b border-zinc-800/50">Column 1</div>
                    <div className="text-sm font-bold text-zinc-300 uppercase tracking-wider text-neon-cyan/80 pb-2 border-b border-zinc-800/50">Column 2</div>
                    
                    {Array.from({ length: Math.max(armor.trait.perkPool.column1.length, armor.trait.perkPool.column2.length) }).map((_, i) => {
                      const perk1 = armor.trait.perkPool!.column1[i];
                      const perk2 = armor.trait.perkPool!.column2[i];
                      return (
                        <React.Fragment key={i}>
                          {/* Column 1 Perk */}
                          {perk1 ? (
                            <div className="flex gap-3">
                              {perk1.icon && <Image src={`https://www.bungie.net${perk1.icon}`} alt={perk1.name} width={32} height={32} className="rounded shrink-0 bg-black shadow-md border border-zinc-700/50" unoptimized />}
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-zinc-200">{perk1.name}</span>
                                <span className="text-xs text-zinc-500 leading-relaxed">{perk1.description}</span>
                              </div>
                            </div>
                          ) : <div />}

                          {/* Column 2 Perk */}
                          {perk2 ? (
                            <div className="flex gap-3">
                              {perk2.icon && <Image src={`https://www.bungie.net${perk2.icon}`} alt={perk2.name} width={32} height={32} className="rounded shrink-0 bg-black shadow-md border border-zinc-700/50" unoptimized />}
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-zinc-200">{perk2.name}</span>
                                <span className="text-xs text-zinc-500 leading-relaxed">{perk2.description}</span>
                              </div>
                            </div>
                          ) : <div />}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
