"use client"

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import exoticArmorData from '@/data/database/exotic-armor.json';
import { ExoticArmorCard, ExoticArmor } from '@/features/database/components/ExoticArmorCard';

type ClassType = 'Titan' | 'Hunter' | 'Warlock';

export default function ExoticArmorPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeClass, setActiveClass] = useState<ClassType>('Titan');

  const armors = exoticArmorData as ExoticArmor[];

  const filteredArmors = armors.filter(armor => {
    const matchesSearch = armor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      armor.trait.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = armor.class === activeClass;
    return matchesSearch && matchesClass;
  });

  const slotOrder = ['Helmet', 'Gauntlets', 'Chest', 'Leg', 'Mark', 'Cloak', 'Bond'];

  filteredArmors.sort((a, b) => {
    // Determine slot index for 'a'
    const aSlotIdx = slotOrder.findIndex(slot => a.type.includes(slot));
    const bSlotIdx = slotOrder.findIndex(slot => b.type.includes(slot));

    if (aSlotIdx !== bSlotIdx) {
      return aSlotIdx - bSlotIdx;
    }
    return a.name.localeCompare(b.name);
  });

  const classes: ClassType[] = ['Titan', 'Hunter', 'Warlock'];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-neon-cyan/50">|</span>
          Exotic Armor
        </h2>

        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-zinc-500" />
          </div>
          <input
            type="text"
            placeholder="Search armors or perks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-zinc-800 rounded-md leading-5 bg-zinc-950 text-zinc-300 placeholder-zinc-600 focus:outline-none focus:bg-black focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 sm:text-sm transition-colors font-mono"
          />
        </div>
      </div>

      {/* Class Tabs */}
      <div className="flex gap-2 p-1 bg-zinc-900/50 rounded-lg w-fit">
        {classes.map(cls => (
          <button
            key={cls}
            onClick={() => setActiveClass(cls)}
            className={`px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${activeClass === cls
                ? 'bg-neon-cyan text-black shadow-[0_0_15px_rgba(0,255,255,0.3)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
          >
            {cls}
          </button>
        ))}
      </div>

      {/* Armor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredArmors.length > 0 ? (
          filteredArmors.map(armor => (
            <div key={armor.id} className={armor.trait.perkPool ? "col-span-1 md:col-span-2 xl:col-span-3" : ""}>
              <ExoticArmorCard armor={armor} />
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-zinc-500 font-mono">
            No exotic armor found for {activeClass}.
          </div>
        )}
      </div>
    </div>
  );
}
