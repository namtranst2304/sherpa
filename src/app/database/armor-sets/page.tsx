import * as React from "react"
import Image from "next/image"

export default function ArmorSetsPage() {
  return (
    <div className="flex flex-col gap-8 mt-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black uppercase tracking-wider text-neon-cyan">
          Armor Sets Library
        </h2>
        <p className="text-zinc-400 font-mono text-sm max-w-3xl">
          Tổng hợp các bộ giáp và hiệu ứng Set Bonus trong Destiny 2. Click vào ảnh để xem toàn màn hình.
        </p>
      </div>

      <div className="flex justify-center">
        <a
          href="/images/database/armorbonus.jpeg"
          target="_blank"
          rel="noopener noreferrer"
          className="block group relative rounded-lg overflow-hidden border border-zinc-800 hover:border-neon-cyan/50 transition-all duration-300 shadow-lg hover:shadow-neon-cyan/10"
        >
          <div className="absolute inset-0 bg-neon-cyan/0 group-hover:bg-neon-cyan/5 transition-colors duration-300 z-10 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 text-neon-cyan text-sm font-mono font-bold px-4 py-2 rounded border border-neon-cyan/50 backdrop-blur-sm">
              🔍 Mở ảnh toàn màn hình
            </span>
          </div>
          <Image
            src="/images/database/armorbonus.jpeg"
            alt="Destiny 2 Armor Set Bonuses - Synergies Reference Chart"
            width={1200}
            height={1600}
            className="w-full max-w-5xl h-auto object-contain"
            priority
            unoptimized
          />
        </a>
      </div>
    </div>
  )
}
