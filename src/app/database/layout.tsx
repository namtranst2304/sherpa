import { DatabaseTabNav } from '@/features/database/components/DatabaseTabNav'

export default function DatabaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-7xl py-8 pr-4 pl-14 md:px-4">
      <div className="flex flex-col gap-6 md:gap-8">
        <div>
          <h1 className="mb-3 text-2xl font-black tracking-widest break-words text-neon-cyan uppercase text-glow-cyan sm:text-3xl md:mb-4 md:text-5xl">
            Destiny 2 Database
          </h1>
          <p className="max-w-2xl font-mono text-sm text-zinc-400 md:text-base">
            Trung tâm dữ liệu Sherpa. Tra cứu Loot Tables, Armor Sets và
            Catalysts.
          </p>
        </div>

        <DatabaseTabNav />

        <div className="min-h-[500px]">{children}</div>
      </div>
    </div>
  )
}
