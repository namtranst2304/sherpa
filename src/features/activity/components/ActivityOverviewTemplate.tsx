import { ActivityData } from "@/types"
import { OverviewRules } from "./OverviewRules"
import { OverviewLoadouts } from "./OverviewLoadouts"
import { OverviewEpicMode } from "./OverviewEpicMode"
import { OverviewLootTable } from "./OverviewLootTable"
import { CyberHeading } from "@/components/common/CyberComponents"

interface ActivityOverviewTemplateProps {
  activityData: ActivityData
}

export function ActivityOverviewTemplate({ activityData }: ActivityOverviewTemplateProps) {
  const { preface, loadout_tips, epic_mode, loot_table, raid_name, dungeon_name } = activityData
  const title = raid_name || dungeon_name || "Activity Overview"

  return (
    <div className="flex-1 overflow-y-auto w-full bg-background p-4 md:p-8">
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="border-b border-border pb-6">
          <div>
            <CyberHeading variant="gradient" size="lg">
              {title} - Overview
            </CyberHeading>
            {preface?.author_notes && (
              <p className="text-muted-foreground mt-2 text-lg font-mono tracking-wide">
                {preface.author_notes}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {preface && <OverviewRules preface={preface} />}
          {loadout_tips && <OverviewLoadouts loadout_tips={loadout_tips} />}
          {epic_mode && <OverviewEpicMode epic_mode={epic_mode} />}
          {loot_table && <OverviewLootTable loot_table={loot_table} armor_table={activityData.armor_table} />}
        </div>
      </div>
    </div>
  )
}
