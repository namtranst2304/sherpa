import { ActivityData } from '@/types'
import { OverviewRules } from './OverviewRules'
import { OverviewLoadouts } from './OverviewLoadouts'
import { OverviewEpicMode } from './OverviewEpicMode'
import { OverviewLootTable } from './OverviewLootTable'
import { CyberHeading } from '@/components/common/CyberComponents'
import { motion } from 'motion/react'

interface ActivityOverviewTemplateProps {
  activityData: ActivityData
}

export function ActivityOverviewTemplate({
  activityData,
}: ActivityOverviewTemplateProps) {
  const {
    preface,
    loadout_tips,
    epic_mode,
    loot_table,
    raid_name,
    dungeon_name,
  } = activityData
  const title = raid_name || dungeon_name || 'Activity Overview'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 260,
        damping: 20,
      },
    },
  }

  return (
    <div className="relative w-full flex-1 overflow-y-auto bg-background p-4 pb-24 md:p-8 md:pb-28">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-neon-cyan/5 via-background to-background" />
      <div className="bg-scanline pointer-events-none absolute inset-0 z-0 opacity-5" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="border-b border-border pb-6 pt-12 md:pt-0">
          <div>
            <CyberHeading variant="gradient" size="lg">
              {title} - Overview
            </CyberHeading>
            {preface?.author_notes && (
              <p className="mt-2 font-mono text-lg tracking-wide text-muted-foreground">
                {preface.author_notes}
              </p>
            )}
          </div>
        </motion.div>

        <div className="flex flex-col gap-8">
          {preface && (
            <motion.div variants={itemVariants}>
              <OverviewRules preface={preface} />
            </motion.div>
          )}
          {loadout_tips && (
            <motion.div variants={itemVariants}>
              <OverviewLoadouts loadout_tips={loadout_tips} />
            </motion.div>
          )}
          {epic_mode && (
            <motion.div variants={itemVariants}>
              <OverviewEpicMode epic_mode={epic_mode} />
            </motion.div>
          )}
          {loot_table && (
            <motion.div variants={itemVariants}>
              <OverviewLootTable
                loot_table={loot_table}
                armor_table={activityData.armor_table}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
