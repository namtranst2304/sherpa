export default function PerksPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl md:text-5xl font-black tracking-widest uppercase text-neon-cyan text-glow-cyan mb-4">
          Perks & Traits
        </h1>
        <p className="text-zinc-400 font-mono">
          Danh sách thông số chi tiết (sát thương, thời gian tác dụng) của các Perk đang được Sherpa khuyên dùng. Đang được cập nhật...
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-zinc-800 rounded-lg">
        <span className="text-zinc-500 font-mono animate-pulse">COMING SOON</span>
      </div>
    </div>
  )
}
