import { Shield, Target, Sword } from "lucide-react"
import { CyberCard, CyberBadge } from "@/components/common/CyberComponents"
import { ActivityRole, ActivityEncounter } from "@/types"

interface EncounterRolesProps {
  roles?: ActivityEncounter['roles']
}

export function EncounterRoles({ roles }: EncounterRolesProps) {
  if (!roles) return null;

  if (roles.option_1 || roles.option_2) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {['option_1', 'option_2'].map((opt) => {
            if (!roles[opt]) return null;
            const rolesForOption = roles[opt] as Record<string, ActivityRole>;
            return (
              <CyberCard key={opt} variant="zinc" withCorners className="relative group">
                <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan/50 group-hover:bg-neon-cyan transition-colors"></div>
                <h4 className="text-xl font-black text-neon-cyan mb-5 uppercase tracking-wider border-b border-zinc-800 pb-3 flex items-center justify-between text-glow-cyan">
                  {opt.replace('_', ' ')}
                  <CyberBadge variant="zinc">Strategy</CyberBadge>
                </h4>
                <div className="space-y-4">
                  {Object.entries(rolesForOption).map(([roleKey, roleVal]: [string, ActivityRole], idx) => {
                    const isRunner = roleKey.toLowerCase().includes("runner");
                    const Icon = isRunner ? Target : Shield;
                    return (
                      <div key={idx} className="bg-black/60 p-4 border border-zinc-800 hover:border-neon-cyan/50 hover:shadow-neon-cyan transition-all">
                        <h5 className="font-bold text-foreground flex items-center gap-2 mb-2">
                          <div className="p-1.5 bg-neon-cyan/10 rounded-md">
                            <Icon className="w-4 h-4 text-neon-cyan" />
                          </div>
                          {roleKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          <CyberBadge variant="zinc" className="ml-auto" withIndicator={false}>x{roleVal.quantity || 1}</CyberBadge>
                        </h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {roleVal.description || "N/A"}
                        </p>
                        {roleVal.types && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {roleVal.types.map((t: string) => (
                              <CyberBadge key={t} variant="cyan" withIndicator={false}>{t}</CyberBadge>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CyberCard>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {Object.entries(roles as Record<string, ActivityRole>).map(([roleKey, roleVal], idx) => {
          const isRunner = roleKey.toLowerCase().includes("runner");
          const isShooter = roleKey.toLowerCase().includes("shooter");
          const Icon = (isRunner || isShooter) ? Target : Sword;
          return (
            <CyberCard key={idx} variant="zinc" withCorners className="hover:bg-zinc-900/50 relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon className="w-24 h-24 text-neon-cyan" />
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-lg text-foreground flex items-center gap-3 mb-3">
                  <div className="p-2 bg-neon-cyan/10 rounded-md shadow-sm">
                    <Icon className="w-5 h-5 text-neon-cyan" />
                  </div>
                  {roleKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  <CyberBadge variant="zinc" className="ml-auto" withIndicator={false}>x{roleVal.quantity || 1}</CyberBadge>
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {roleVal.description}
                </p>
                {roleVal.types && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {roleVal.types.map((t: string) => (
                      <CyberBadge key={t} variant="cyan" withIndicator={false}>{t}</CyberBadge>
                    ))}
                  </div>
                )}
              </div>
            </CyberCard>
          )
        })}
      </div>
    </div>
  )
}
