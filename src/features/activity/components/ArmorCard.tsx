import { LootArmorSet } from "@/types";
import Image from "next/image";
import { CyberCard, CyberHeading } from "@/components/common/CyberComponents";
import { Shield } from "lucide-react";

export function ArmorCard({ armor }: { armor: LootArmorSet }) {
  const isTitan = armor.class === "Titan";
  const isHunter = armor.class === "Hunter";
  const isWarlock = armor.class === "Warlock";

  let classColor: "cyan" | "orange" | "yellow" | "zinc" = "cyan";
  if (isTitan) classColor = "orange";
  else if (isWarlock) classColor = "yellow";
  else if (isHunter) classColor = "zinc";

  return (
    <CyberCard variant={classColor} withCorners className="flex flex-col h-full p-4 relative group">
      <div className="flex gap-4 items-center">
        {/* Icon Area */}
        <div className="w-20 h-20 shrink-0 bg-zinc-950 relative overflow-hidden flex items-center justify-center border border-zinc-800 rounded-md group-hover:border-white/20 transition-colors">
          {armor.image ? (
            <Image 
              src={armor.image} 
              alt={armor.name} 
              width={64}
              height={64}
              unoptimized={true}
              className="opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 drop-shadow-md"
            />
          ) : (
            <Shield className="w-8 h-8 opacity-30" />
          )}
        </div>

        {/* Info Area */}
        <div className="flex-1 min-w-0">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">
            {armor.class} Armor Set
          </div>
          <CyberHeading variant="default" size="sm" className="truncate text-white">{armor.name}</CyberHeading>
          <div className="text-xs text-zinc-500 line-clamp-1 mt-1">
            Source: {armor.source}
          </div>
        </div>
      </div>

      {/* Set Bonus Area */}
      {armor.setBonus && (
        <div className="mt-4 pt-4 border-t border-zinc-800">
          <div className="text-xs font-mono uppercase text-zinc-500 mb-1">Raid Set Bonus</div>
          <div className="text-sm text-zinc-300 font-medium">
            {armor.setBonus}
          </div>
        </div>
      )}
    </CyberCard>
  );
}
