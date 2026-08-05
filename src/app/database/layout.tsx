import { DatabaseTabNav } from "@/features/database/components/DatabaseTabNav"

export default function DatabaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-7xl mx-auto w-full py-8 pl-14 pr-4 md:px-4">
      <div className="flex flex-col gap-6 md:gap-8">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-widest uppercase text-neon-cyan text-glow-cyan mb-3 md:mb-4 break-words">
            Destiny 2 Database
          </h1>
          <p className="text-zinc-400 font-mono text-sm md:text-base max-w-2xl">
            Trung tâm dữ liệu Sherpa. Tra cứu Loot Tables, Armor Sets và Catalysts.
          </p>
        </div>

        <DatabaseTabNav />

        <div className="min-h-[500px]">
          {children}
        </div>
      </div>
    </div>
  )
}
