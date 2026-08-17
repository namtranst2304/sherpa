import { Target, Sword } from "lucide-react"
import { CyberCard, CyberBadge } from "@/components/common/CyberComponents"
import { ActivityRole, ActivityEncounter } from "@/types"

interface EncounterRolesProps {
  roles?: ActivityEncounter["roles"]
}

function formatRoleLabel(roleKey: string) {
  return roleKey.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}

function RoleCard({ roleKey, roleVal }: { roleKey: string; roleVal: ActivityRole }) {
  const isRunner = roleKey.toLowerCase().includes("runner")
  const isShooter = roleKey.toLowerCase().includes("shooter")
  const Icon = isRunner || isShooter ? Target : Sword

  return (
    <div className="bg-black/60 p-4 border border-zinc-800 hover:border-neon-cyan/50 hover:shadow-neon-cyan transition-all">
      <h5 className="font-bold text-foreground flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-neon-cyan/10 rounded-md shrink-0">
          <Icon className="w-4 h-4 text-neon-cyan" />
        </div>
        <span className="break-words min-w-0 flex-1 leading-tight">
          {formatRoleLabel(roleKey)}
        </span>
        <CyberBadge variant="zinc" className="ml-auto shrink-0" withIndicator={false}>
          x{roleVal.quantity || 1}
        </CyberBadge>
      </h5>
      <p className="text-sm text-muted-foreground leading-relaxed break-words">
        {roleVal.description || "N/A"}
      </p>
      {roleVal.types && (
        <div className="mt-3 flex flex-wrap gap-2">
          {roleVal.types.map((t) => (
            <CyberBadge key={t} variant="cyan" withIndicator={false}>
              {t}
            </CyberBadge>
          ))}
        </div>
      )}
    </div>
  )
}

export function EncounterRoles({ roles }: EncounterRolesProps) {
  if (!roles) return null

  const hasStrategyOptions = Boolean(roles.option_1 || roles.option_2)

  if (hasStrategyOptions) {
    const strategies = [
      roles.option_1 && { name: "Option 1", roles: roles.option_1 as Record<string, ActivityRole> },
      roles.option_2 && { name: "Option 2", roles: roles.option_2 as Record<string, ActivityRole> },
    ].filter((s): s is { name: string; roles: Record<string, ActivityRole> } => Boolean(s))

    return (
      <div className="grid grid-cols-1 gap-6">
        {strategies.map((strat) => (
          <CyberCard key={strat.name} variant="zinc" withCorners className="relative group">
            <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan/50 group-hover:bg-neon-cyan transition-colors" />
            <h4 className="text-xl font-black text-neon-cyan mb-5 uppercase tracking-wider border-b border-zinc-800 pb-3 flex items-center justify-between text-glow-cyan">
              {strat.name}
              <CyberBadge variant="zinc">Strategy</CyberBadge>
            </h4>
            <div className="space-y-4">
              {Object.entries(strat.roles).map(([key, val]) => (
                <RoleCard key={key} roleKey={key} roleVal={val} />
              ))}
            </div>
          </CyberCard>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {Object.entries(roles as Record<string, ActivityRole>).map(([key, val]) => (
        <RoleCard key={key} roleKey={key} roleVal={val} />
      ))}
    </div>
  )
}
