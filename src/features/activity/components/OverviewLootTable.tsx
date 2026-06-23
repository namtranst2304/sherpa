import { Gem } from "lucide-react"
import { CyberCard } from "@/components/ui/CyberComponents"
import { ActivityData } from "@/types"

interface OverviewLootTableProps {
  loot_table: ActivityData['loot_table']
}

export function OverviewLootTable({ loot_table }: OverviewLootTableProps) {
  if (!loot_table || loot_table.length === 0) return null;

  return (
    <div className="space-y-8">
      <CyberCard variant="orange" withCorners className="h-full">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Gem className="w-32 h-32 text-neon-orange" />
        </div>
        <div className="border-b border-neon-orange/30 pb-4 mb-4 flex items-center gap-3 relative z-10">
          <div className="p-2 bg-neon-orange/20 rounded-md">
            <Gem className="w-5 h-5 text-neon-orange" />
          </div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-neon-orange text-glow-orange">Loot Table</h2>
        </div>
        <div className="relative z-10 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-secondary/50 text-muted-foreground border-b border-border/50">
              <tr>
                <th scope="col" className="px-4 py-3 font-bold">Weapon</th>
                <th scope="col" className="px-4 py-3 font-bold">Type</th>
                <th scope="col" className="px-4 py-3 font-bold">Frame</th>
                <th scope="col" className="px-4 py-3 font-bold">Source</th>
              </tr>
            </thead>
            <tbody>
              {loot_table.map((item, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-secondary/20">
                  <td className="px-4 py-3 font-bold text-foreground flex items-center gap-2">
                    {item.weapon.includes('(Exotic)') ? (
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    )}
                    {item.weapon}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{item.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.frame}</td>
                  <td className="px-4 py-3 font-medium text-foreground/80">{item.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CyberCard>
    </div>
  )
}
