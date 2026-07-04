"use client"

import React, { useState } from 'react';

import exoticArmorData from '@/data/database/exotic-armor.json';
import { ExoticArmorCard, ExoticArmor } from '@/features/database/components/ExoticArmorCard';

import { DatabaseHeader } from '@/features/database/components/DatabaseHeader';

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

  const headerActions = (
    <div className="flex gap-2 p-1 bg-zinc-900/50 rounded-lg w-full sm:w-fit">
      {classes.map(cls => (
        <button
          key={cls}
          onClick={() => setActiveClass(cls)}
          className={`flex-1 sm:flex-none px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${activeClass === cls
              ? 'bg-neon-cyan text-black shadow-[0_0_15px_rgba(0,255,255,0.3)]'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
        >
          {cls}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-8 max-w-[1600px] w-full mx-auto relative min-h-screen pb-20">
      <DatabaseHeader
        title="Exotic Armor"
        description="Dữ liệu chi tiết về toàn bộ các giáp Exotic trong Destiny 2."
        searchPlaceholder="Tìm kiếm giáp hoặc perks..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        actions={headerActions}
      />

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
