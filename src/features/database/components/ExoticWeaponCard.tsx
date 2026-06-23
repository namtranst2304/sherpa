import React from 'react';
import Image from 'next/image';
import { Sparkles, Zap, Orbit, Snowflake, Combine } from 'lucide-react';

export interface ExoticWeapon {
  id: number;
  name: string;
  icon: string;
  flavorText: string;
  weaponType: string;
  damageType: string;
  ammoType: string;
  slot: string;
  trait: {
    name: string;
    description: string;
    icon: string;
    perkPool?: {
      column1: { name: string; description: string; icon: string }[];
      column2: { name: string; description: string; icon: string }[];
    };
  };
  catalysts?: {
    name: string;
    icon: string;
    description: string;
    effects: { name: string; description: string; icon: string }[];
    objectives: { description: string; completionValue: number }[];
  }[];
}

const DamageTypeIcon = ({ type }: { type: string }) => {
  switch (type.toLowerCase()) {
    case 'kinetic': return <div className="w-3 h-3 rounded-full bg-zinc-300" />;
    case 'solar': return <Zap className="w-3 h-3 text-orange-500" />;
    case 'arc': return <Zap className="w-3 h-3 text-cyan-400" />;
    case 'void': return <Orbit className="w-3 h-3 text-purple-500" />;
    case 'stasis': return <Snowflake className="w-3 h-3 text-blue-400" />;
    case 'strand': return <Combine className="w-3 h-3 text-green-500" />;
    default: return <div className="w-3 h-3 rounded-full bg-zinc-500" />;
  }
};

const AmmoTypeIcon = ({ type }: { type: string }) => {
  switch (type.toLowerCase()) {
    case 'primary': return <div className="w-3 h-4 bg-white rounded-sm" />;
    case 'special': return <div className="w-3 h-4 bg-green-500 rounded-sm" />;
    case 'heavy': return <div className="w-3 h-4 bg-purple-500 rounded-sm" />;
    default: return <div className="w-3 h-4 bg-zinc-500 rounded-sm" />;
  }
};

export function ExoticWeaponCard({ weapon }: { weapon: ExoticWeapon }) {
  const iconUrl = weapon.icon ? `https://www.bungie.net${weapon.icon}` : null;
  const traitIconUrl = weapon.trait.icon ? `https://www.bungie.net${weapon.trait.icon}` : null;

  return (
    <div className="flex flex-col h-full bg-zinc-900/50 rounded-lg border border-zinc-800/50 overflow-hidden hover:border-neon-cyan/50 transition-colors">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-zinc-800 bg-zinc-950/50">
        <div className="relative w-12 h-12 flex-shrink-0 bg-zinc-800 rounded">
          {iconUrl ? (
            <Image src={iconUrl} alt={weapon.name} fill className="object-cover rounded" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600">?</div>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-white leading-tight">{weapon.name}</h3>
          <div className="flex items-center gap-3 text-sm text-neon-cyan font-mono mt-1">
            <span>{weapon.weaponType}</span>
            <div className="flex items-center gap-1 opacity-80" title={weapon.slot}>
              <span className="text-zinc-400 text-xs uppercase bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">{weapon.slot}</span>
            </div>
            <div className="flex items-center gap-1 opacity-80" title={weapon.damageType}>
              <DamageTypeIcon type={weapon.damageType} />
            </div>
            <div className="flex items-center gap-1 opacity-80" title={weapon.ammoType}>
              <AmmoTypeIcon type={weapon.ammoType} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-4 flex-grow">
        {weapon.flavorText && (
          <p className="text-xs italic text-zinc-500 border-l-2 border-zinc-700 pl-3">
            &quot;{weapon.flavorText}&quot;
          </p>
        )}
        
        <div>
          <div className="flex items-center gap-2 mb-3 text-neon-cyan text-sm font-black tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            <span>INTRINSIC TRAIT</span>
          </div>
          
          <div className="flex gap-3 items-start p-3 rounded bg-black/30 border border-zinc-800/50 h-full">
            {traitIconUrl && (
              <Image src={traitIconUrl} alt={weapon.trait.name} width={32} height={32} className="rounded-sm shrink-0 bg-zinc-900" unoptimized />
            )}
            <div className="flex flex-col flex-1">
              <span className="font-bold text-white mb-1">{weapon.trait.name || 'Unknown Trait'}</span>
              <span className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap">{weapon.trait.description || 'No description available.'}</span>
              
              {/* Perk Pool for Randomized Weapons like Ergo Sum */}
              {weapon.trait.perkPool && (
                <div className="mt-6 border-t border-zinc-800 pt-6">
                  {/* Mobile Layout: Stacked Columns */}
                  <div className="flex flex-col gap-6 lg:hidden">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-300 uppercase mb-3 tracking-wider text-neon-cyan/80">Column 1 (Frames)</h4>
                      <div className="flex flex-col gap-4">
                        {weapon.trait.perkPool.column1.map((perk, i) => (
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
                      <h4 className="text-sm font-bold text-zinc-300 uppercase mb-3 tracking-wider text-neon-cyan/80">Column 2 (Exotic Traits)</h4>
                      <div className="flex flex-col gap-4">
                        {weapon.trait.perkPool.column2.map((perk, i) => (
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
                    <div className="text-sm font-bold text-zinc-300 uppercase tracking-wider text-neon-cyan/80 pb-2 border-b border-zinc-800/50">Column 1 (Frames)</div>
                    <div className="text-sm font-bold text-zinc-300 uppercase tracking-wider text-neon-cyan/80 pb-2 border-b border-zinc-800/50">Column 2 (Exotic Traits)</div>
                    
                    {Array.from({ length: Math.max(weapon.trait.perkPool.column1.length, weapon.trait.perkPool.column2.length) }).map((_, i) => {
                      const perk1 = weapon.trait.perkPool!.column1[i];
                      const perk2 = weapon.trait.perkPool!.column2[i];
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

        {/* Catalysts Section */}
        {weapon.catalysts && weapon.catalysts.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3 text-neon-cyan text-sm font-black tracking-widest uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Catalyst(s)</span>
            </div>
            
            <div className="flex flex-col gap-4">
              {weapon.catalysts.map((cat, idx) => (
                <div key={idx} className="flex flex-col gap-3 p-3 rounded bg-zinc-950/80 border border-zinc-800/80">
                  <div className="flex gap-3 items-start">
                    {cat.icon && (
                      <Image src={`https://www.bungie.net${cat.icon}`} alt={cat.name} width={32} height={32} className="rounded-sm shrink-0 bg-zinc-900 border border-zinc-800" unoptimized />
                    )}
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-sm">{cat.name}</span>
                      <span className="text-xs text-zinc-400 mt-1 whitespace-pre-wrap leading-relaxed">{cat.description}</span>
                    </div>
                  </div>

                  {/* Catalyst Effects */}
                  {cat.effects && cat.effects.length > 0 && (
                    <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-zinc-800/50">
                      {cat.effects.map((effect, eIdx) => (
                        <div key={eIdx} className="flex gap-2 items-start">
                          {effect.icon && (
                            <Image src={`https://www.bungie.net${effect.icon}`} alt={effect.name} width={20} height={20} className="rounded-sm shrink-0" unoptimized />
                          )}
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-zinc-300">{effect.name}</span>
                            <span className="text-xs text-zinc-500 leading-relaxed">{effect.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Catalyst Objectives */}
                  {cat.objectives && cat.objectives.length > 0 && (
                    <div className="mt-2 text-xs text-zinc-500 flex flex-col gap-1">
                      <div className="font-semibold text-zinc-400">Unlock Requirements:</div>
                      {cat.objectives.map((obj, oIdx) => (
                        <div key={oIdx} className="flex items-center justify-between">
                          <span>{obj.description || 'Kills'}</span>
                          <span className="text-neon-cyan font-mono">{obj.completionValue}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
