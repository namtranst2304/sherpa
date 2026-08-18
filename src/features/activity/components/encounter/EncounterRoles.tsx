'use client'

import * as React from 'react'
import { Target, Sword, Users, Copy, Check, UserCheck } from 'lucide-react'
import { CyberCard, CyberBadge } from '@/components/common/CyberComponents'
import { ActivityRole, ActivityEncounter } from '@/types'
import { copyToClipboard } from '@/lib/clipboard'
import { playClearSound, playToggleSound } from '@/lib/cyber-audio'

interface EncounterRolesProps {
  roles?: ActivityEncounter['roles']
  encounterName?: string
}

function formatRoleLabel(roleKey: string) {
  return roleKey
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function RoleCard({
  roleKey,
  roleVal,
  assignedNames,
  onAssignChange,
}: {
  roleKey: string
  roleVal: ActivityRole
  assignedNames: string[]
  onAssignChange: (names: string[]) => void
}) {
  const isRunner = roleKey.toLowerCase().includes('runner')
  const isShooter = roleKey.toLowerCase().includes('shooter')
  const Icon = isRunner || isShooter ? Target : Sword
  const quantity = roleVal.quantity || 1

  const handleNameChange = (idx: number, value: string) => {
    const next = [...assignedNames]
    next[idx] = value
    onAssignChange(next)
  }

  return (
    <div className="flex flex-col gap-3 border border-zinc-800 bg-black/60 p-4 transition-all hover:border-neon-cyan/50 hover:shadow-neon-cyan">
      <h5 className="flex items-center gap-2 font-bold text-foreground">
        <div className="shrink-0 rounded-md bg-neon-cyan/10 p-1.5">
          <Icon className="h-4 w-4 text-neon-cyan" />
        </div>
        <span className="min-w-0 flex-1 text-sm leading-tight break-words text-zinc-100 sm:text-base">
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

      {/* Interactive Fireteam Slot Assigner */}
      <div className="mt-1 flex flex-col gap-1.5 border-t border-zinc-800/80 pt-3">
        <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-zinc-400 uppercase">
          <UserCheck className="h-3 w-3 text-neon-cyan" />
          <span>Gán Guardian ({quantity} slot):</span>
        </div>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {Array.from({ length: quantity }).map((_, slotIdx) => (
            <div key={slotIdx} className="relative flex items-center">
              <span className="pointer-events-none absolute left-2.5 font-mono text-[10px] text-zinc-500">
                #{slotIdx + 1}
              </span>
              <input
                type="text"
                value={assignedNames[slotIdx] || ''}
                onChange={(e) => handleNameChange(slotIdx, e.target.value)}
                placeholder="Tên Guardian..."
                className="w-full border border-zinc-700/60 bg-zinc-950/80 py-1.5 pr-2.5 pl-8 font-mono text-xs text-zinc-200 transition-colors outline-none placeholder:text-zinc-600 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const ROLE_SYNC_EVENT = 'sherpa_role_sync'

export function EncounterRoles({
  roles,
  encounterName = 'Encounter',
}: EncounterRolesProps) {
  const storageKey = `sherpa_assigned_roles_${encounterName}`
  const [copied, setCopied] = React.useState(false)

  const subscribe = React.useCallback((callback: () => void) => {
    if (typeof window === 'undefined') return () => {}
    window.addEventListener('storage', callback)
    window.addEventListener(ROLE_SYNC_EVENT, callback)
    return () => {
      window.removeEventListener('storage', callback)
      window.removeEventListener(ROLE_SYNC_EVENT, callback)
    }
  }, [])

  const getSnapshot = React.useCallback(() => {
    if (typeof window === 'undefined') return '{}'
    try {
      return localStorage.getItem(storageKey) || '{}'
    } catch {
      return '{}'
    }
  }, [storageKey])

  const rawJson = React.useSyncExternalStore(subscribe, getSnapshot, () => '{}')
  const assignments: Record<string, string[]> = React.useMemo(() => {
    try {
      return JSON.parse(rawJson)
    } catch {
      return {}
    }
  }, [rawJson])

  const handleAssignChange = (roleKey: string, names: string[]) => {
    playToggleSound()
    const next = { ...assignments, [roleKey]: names }
    try {
      localStorage.setItem(storageKey, JSON.stringify(next))
      window.dispatchEvent(new Event(ROLE_SYNC_EVENT))
    } catch {
      // Ignore
    }
  }

  const handleCopyDiscord = async () => {
    playClearSound()
    let text = `⚔️ **PHÂN VAI: ${encounterName.toUpperCase()}** ⚔️\n`
    for (const [key, names] of Object.entries(assignments)) {
      const activeNames = names.filter(Boolean)
      if (activeNames.length > 0) {
        text += `• **${formatRoleLabel(key)}**: ${activeNames.map((n) => `@${n}`).join(', ')}\n`
      }
    }

    if (Object.values(assignments).flat().filter(Boolean).length === 0) {
      text += `(Chưa có thành viên nào được gán tên)\n`
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
        <button
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
        </button>
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
                      assignedNames={assignments[key] || []}
                      onAssignChange={(names) => handleAssignChange(key, names)}
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
                assignedNames={assignments[key] || []}
                onAssignChange={(names) => handleAssignChange(key, names)}
              />
            ),
          )}
        </div>
      )}
    </div>
  )
}
