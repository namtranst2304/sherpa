'use client'

import * as React from 'react'
import { Target, Sword, Users, Copy, Check } from 'lucide-react'
import { CyberCard, CyberBadge } from '@/components/common/CyberComponents'
import { MagneticButton } from '@/components/common/MagneticButton'
import { ActivityRole, ActivityEncounter } from '@/types'
import { copyToClipboard } from '@/lib/clipboard'

interface EncounterRolesProps {
  roles?: ActivityEncounter['roles']
  encounterName?: string
}

function formatRoleLabel(roleKey: string) {
  return roleKey
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

const ROLE_ICON_STYLES = {
  cyan: { bg: 'bg-neon-cyan/10', text: 'text-neon-cyan' },
  orange: { bg: 'bg-neon-orange/10', text: 'text-neon-orange' },
  zinc: { bg: 'bg-zinc-800/60', text: 'text-zinc-400' },
} as const

function RoleCard({
  roleKey,
  roleVal,
}: {
  roleKey: string
  roleVal: ActivityRole
}) {
  const isRunner = roleKey.toLowerCase().includes('runner') || roleKey.toLowerCase().includes('relic')
  const isShooter = roleKey.toLowerCase().includes('shooter') || roleKey.toLowerCase().includes('ad_clear')
  const Icon = isRunner ? Target : isShooter ? Sword : Users
  const variant = isRunner ? 'cyan' : isShooter ? 'orange' : 'zinc'
  const quantity = roleVal.quantity || 1
  const iconStyle = ROLE_ICON_STYLES[variant]

  return (
    <CyberCard
      variant={variant}
      padding="sm"
      withCorners
      className="flex flex-col gap-3 transition-all hover:-translate-y-1 hover:shadow-lg group"
    >
      <h5 className="flex items-center gap-2 font-bold text-foreground">
        <div className={`shrink-0 rounded-md p-1.5 ${iconStyle.bg}`}>
          <Icon className={`h-4 w-4 ${iconStyle.text}`} />
        </div>
        <span className="min-w-0 flex-1 text-sm leading-tight break-words text-zinc-100 sm:text-base group-hover:text-white transition-colors">
          {formatRoleLabel(roleKey)}
        </span>
        <CyberBadge
          variant="zinc"
          className="ml-auto shrink-0"
          withIndicator={false}
        >
          x{quantity}
        </CyberBadge>
      </h5>

      <p className="font-mono text-xs leading-relaxed break-words text-muted-foreground sm:text-sm">
        {roleVal.description || 'N/A'}
      </p>

      {roleVal.types && (
        <div className="flex flex-wrap gap-1.5">
          {roleVal.types.map((t) => (
            <CyberBadge key={t} variant="cyan" size="sm" withIndicator={false}>
              {t}
            </CyberBadge>
          ))}
        </div>
      )}

    </CyberCard>
  )
}

export function EncounterRoles({
  roles,
  encounterName = 'Encounter',
}: EncounterRolesProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopyDiscord = async () => {
    let text = `⚔️ **PHÂN VAI: ${encounterName.toUpperCase()}** ⚔️\n`
    
    if (roles) {
      if (roles.option_1 || roles.option_2) {
        if (roles.option_1) {
          text += `\n**[Option 1]**\n`
          for (const [key, val] of Object.entries(roles.option_1 as Record<string, ActivityRole>)) {
            text += `• **${formatRoleLabel(key)}**: ${val.description || ''}\n`
          }
        }
        if (roles.option_2) {
          text += `\n**[Option 2]**\n`
          for (const [key, val] of Object.entries(roles.option_2 as Record<string, ActivityRole>)) {
            text += `• **${formatRoleLabel(key)}**: ${val.description || ''}\n`
          }
        }
      } else {
        for (const [key, val] of Object.entries(roles as Record<string, ActivityRole>)) {
          text += `• **${formatRoleLabel(key)}**: ${val.description || ''}\n`
        }
      }
    }

    const success = await copyToClipboard(text)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  if (!roles) return null

  const hasStrategyOptions = Boolean(roles.option_1 || roles.option_2)

  return (
    <div className="flex flex-col gap-4">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between border border-zinc-800 bg-zinc-950/80 p-2.5">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-neon-cyan" />
          <span className="font-mono text-xs font-bold text-zinc-300 uppercase">
            Bảng phân vai Fireteam
          </span>
        </div>
        <MagneticButton
          type="button"
          onClick={handleCopyDiscord}
          className="flex cursor-pointer items-center gap-1.5 border border-neon-cyan/50 bg-neon-cyan/15 px-3 py-1.5 font-mono text-xs font-bold text-neon-cyan uppercase shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all hover:border-neon-cyan hover:bg-neon-cyan/25 active:scale-95"
          title="Sao chép bảng phân vai gửi vào Discord"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-neon-green" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          <span>{copied ? 'Đã chép Discord!' : 'Chép Discord'}</span>
        </MagneticButton>
      </div>

      {hasStrategyOptions ? (
        <div className="grid grid-cols-1 gap-6">
          {[
            roles.option_1 && {
              name: 'Option 1',
              roles: roles.option_1 as Record<string, ActivityRole>,
            },
            roles.option_2 && {
              name: 'Option 2',
              roles: roles.option_2 as Record<string, ActivityRole>,
            },
          ]
            .filter(
              (s): s is { name: string; roles: Record<string, ActivityRole> } =>
                Boolean(s),
            )
            .map((strat) => (
              <CyberCard
                key={strat.name}
                variant="zinc"
                withCorners
                className="group relative"
              >
                <div className="absolute top-0 left-0 h-full w-1 bg-neon-cyan/50 transition-colors group-hover:bg-neon-cyan" />
                <h4 className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3 text-lg font-black tracking-wider text-neon-cyan uppercase glow-text-cyan sm:text-xl">
                  {strat.name}
                  <CyberBadge variant="zinc">Strategy</CyberBadge>
                </h4>
                <div className="space-y-4">
                  {Object.entries(strat.roles).map(([key, val]) => (
                    <RoleCard
                      key={key}
                      roleKey={key}
                      roleVal={val}
                    />
                  ))}
                </div>
              </CyberCard>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {Object.entries(roles as Record<string, ActivityRole>).map(
            ([key, val]) => (
              <RoleCard
                key={key}
                roleKey={key}
                roleVal={val}
              />
            ),
          )}
        </div>
      )}
    </div>
  )
}
