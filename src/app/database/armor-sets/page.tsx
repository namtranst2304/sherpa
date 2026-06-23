import * as React from "react"
import Image from "next/image"

export default function ArmorSetsPage() {
  return (
    <div className="flex flex-col gap-6 mt-4">
      <div>
        <h2 className="text-2xl font-black uppercase tracking-wider text-neon-cyan mb-2">
          Armor Sets Library
        </h2>
        <p className="text-zinc-400 font-mono text-sm">
          Tổng hợp các bộ giáp và hiệu ứng Set Bonus trong Destiny 2. Click vào ảnh để xem toàn màn hình.
        </p>
      </div>

      <a 
        href="/images/database/armorbonus.jpeg" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full hover:opacity-80 transition-opacity"
        title="Mở ảnh toàn màn hình"
      >
        <Image
          src="/images/database/armorbonus.jpeg"
          alt="Destiny 2 Armor Set Bonuses"
          width={3840}
          height={2160}
          className="w-full h-auto rounded-lg border border-zinc-800 shadow-lg"
          priority
          unoptimized
        />
      </a>
    </div>
  )
}
