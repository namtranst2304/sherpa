"use client"

import * as React from "react"
import { Target, Sword, Users, Copy, Check, UserCheck } from "lucide-react"
import { CyberCard, CyberBadge } from "@/components/common/CyberComponents"
import { ActivityRole, ActivityEncounter } from "@/types"
import { copyToClipboard } from "@/lib/clipboard"
import { playClearSound, playToggleSound } from "@/lib/cyber-audio"

interface EncounterRolesProps {
  roles?: ActivityEncounter["roles"]
  encounterName?: string
}

function formatRoleLabel(roleKey: string) {
  return roleKey.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
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
  const isRunner = roleKey.toLowerCase().includes("runner")
  const isShooter = roleKey.toLowerCase().includes("shooter")
  const Icon = isRunner || isShooter ? Target : Sword
  const quantity = roleVal.quantity || 1

  const handleNameChange = (idx: number, value: string) => {
    const next = [...assignedNames]
    next[idx] = value
    onAssignChange(next)
  }

  return (
    <div className="bg-black/60 p-4 border border-zinc-800 hover:border-neon-cyan/50 hover:shadow-neon-cyan transition-all flex flex-col gap-3">
      <h5 className="font-bold text-foreground flex items-center gap-2">
        <div className="p-1.5 bg-neon-cyan/10 rounded-md shrink-0">
          <Icon className="w-4 h-4 text-neon-cyan" />
        </div>
        <span className="break-words min-w-0 flex-1 leading-tight text-sm sm:text-base text-zinc-100">
          {formatRoleLabel(roleKey)}
        </span>
        <CyberBadge variant="zinc" className="ml-auto shrink-0" withIndicator={false}>
          x{quantity}
        </CyberBadge>
      </h5>

      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed break-words font-mono">
        {roleVal.description || "N/A"}
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
      <div className="mt-1 pt-3 border-t border-zinc-800/80 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
          <UserCheck className="w-3 h-3 text-neon-cyan" />
          <span>Gán Guardian ({quantity} slot):</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {Array.from({ length: quantity }).map((_, slotIdx) => (
            <div key={slotIdx} className="relative flex items-center">
              <span className="absolute left-2.5 text-[10px] font-mono text-zinc-500 pointer-events-none">
                #{slotIdx + 1}
              </span>
              <input
                type="text"
                value={assignedNames[slotIdx] || ""}
                onChange={(e) => handleNameChange(slotIdx, e.target.value)}
                placeholder="Tên Guardian..."
                className="w-full pl-8 pr-2.5 py-1.5 bg-zinc-950/80 border border-zinc-700/60 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan text-xs font-mono text-zinc-200 placeholder:text-zinc-600 outline-none transition-colors"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const ROLE_SYNC_EVENT = "sherpa_role_sync"

export function EncounterRoles({ roles, encounterName = "Encounter" }: EncounterRolesProps) {
  const storageKey = `sherpa_assigned_roles_${encounterName}`
  const [copied, setCopied] = React.useState(false)

  const subscribe = React.useCallback((callback: () => void) => {
    if (typeof window === "undefined") return () => {}
    window.addEventListener("storage", callback)
    window.addEventListener(ROLE_SYNC_EVENT, callback)
    return () => {
      window.removeEventListener("storage", callback)
      window.removeEventListener(ROLE_SYNC_EVENT, callback)
    }
  }, [])

  const getSnapshot = React.useCallback(() => {
    if (typeof window === "undefined") return "{}"
    try {
      return localStorage.getItem(storageKey) || "{}"
    } catch {
      return "{}"
    }
  }, [storageKey])

  const rawJson = React.useSyncExternalStore(subscribe, getSnapshot, () => "{}")
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
        text += `• **${formatRoleLabel(key)}**: ${activeNames.map((n) => `@${n}`).join(", ")}\n`
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
      <div className="flex items-center justify-between bg-zinc-950/80 p-2.5 border border-zinc-800">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-neon-cyan" />
          <span className="text-xs font-mono font-bold uppercase text-zinc-300">
            Bảng phân vai Fireteam
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopyDiscord}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-neon-cyan/15 hover:bg-neon-cyan/25 border border-neon-cyan/50 hover:border-neon-cyan text-neon-cyan text-xs font-mono font-bold uppercase transition-all cursor-pointer shadow-[0_0_10px_rgba(0,243,255,0.2)] active:scale-95"
          title="Sao chép bảng phân vai gửi vào Discord"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-neon-green" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Đã chép Discord!" : "Chép Discord"}</span>
        </button>
      </div>

      {hasStrategyOptions ? (
        <div className="grid grid-cols-1 gap-6">
          {[
            roles.option_1 && { name: "Option 1", roles: roles.option_1 as Record<string, ActivityRole> },
            roles.option_2 && { name: "Option 2", roles: roles.option_2 as Record<string, ActivityRole> },
          ]
            .filter((s): s is { name: string; roles: Record<string, ActivityRole> } => Boolean(s))
            .map((strat) => (
              <CyberCard key={strat.name} variant="zinc" withCorners className="relative group">
                <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan/50 group-hover:bg-neon-cyan transition-colors" />
                <h4 className="text-lg sm:text-xl font-black text-neon-cyan mb-4 uppercase tracking-wider border-b border-zinc-800 pb-3 flex items-center justify-between text-glow-cyan">
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
          {Object.entries(roles as Record<string, ActivityRole>).map(([key, val]) => (
            <RoleCard
              key={key}
              roleKey={key}
              roleVal={val}
              assignedNames={assignments[key] || []}
              onAssignChange={(names) => handleAssignChange(key, names)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

