import { notFound } from "next/navigation"
import { RAIDS_DATA } from "@/data"
import { GuideSidebar } from "@/components/layout/GuideSidebar"
import { GuideTemplate } from "@/components/layout/GuideTemplate"
import { Shield, Target, Sword, Map } from "lucide-react"

const RoleIconMap: Record<string, any> = {
  shield: Shield,
  target: Target,
  sword: Sword,
}

// 1. Cập nhật Type: params và searchParams đều là Promise trong Next.js 15
interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ enc?: string }>
}

// 2. Thêm async vào function
export default async function RaidEncounterPage({ params, searchParams }: PageProps) {
  // 3. Await cả params và searchParams trước khi sử dụng
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  const raidData = RAIDS_DATA[resolvedParams.slug]

  if (!raidData) {
    notFound()
  }

  const sidebarGroups = [
    {
      title: "Encounters",
      items: raidData.encounters.map((enc: any) => ({
        id: enc.id,
        title: enc.name,
        href: `?enc=${enc.id}`,
      }))
    }
  ]

  // Sử dụng searchParams đã được await
  const activeEncounterId = resolvedSearchParams.enc
  const activeEncounter =
    raidData.encounters.find((enc: any) => enc.id === activeEncounterId) ||
    raidData.encounters[0]

  const getMechanicsList = (encounter: any): string[] => {
    const list: string[] = []
    if (!encounter.walkthrough) return list

    Object.entries(encounter.walkthrough).forEach(([phaseKey, phaseVal]: [string, any]) => {
      const phaseTitle = phaseVal.name || phaseKey.toUpperCase()
      const phaseObjective = phaseVal.objective ? ` - ${phaseVal.objective}` : ""
      list.push(`📍 ${phaseTitle}${phaseObjective}`)

      const steps = phaseVal.steps || phaseVal.details || []
      steps.forEach((step: string) => {
        list.push(`• ${step}`)
      })

      if (phaseVal.mine_locations) {
        list.push("🔍 Vị trí phân bổ Mìn:")
        phaseVal.mine_locations.forEach((loc: string) => {
          list.push(`  - ${loc}`)
        })
      }
    })
    return list
  }

  const getMappedRoles = (encounter: any) => {
    const mapped: any[] = []
    if (!encounter.roles) return mapped

    if (encounter.roles.option_1 || encounter.roles.option_2) {
      Object.entries(encounter.roles).forEach(([optionKey, optionVal]: [string, any]) => {
        Object.entries(optionVal).forEach(([roleKey, roleVal]: [string, any]) => {
          const isRunner = roleKey.toLowerCase().includes("runner")
          const iconType = isRunner ? "target" : "shield"

          mapped.push({
            name: `${optionKey.toUpperCase()} - ${roleKey.charAt(0).toUpperCase() + roleKey.slice(1)} (x${roleVal.quantity || 1})`,
            task: roleVal.description,
            icon: iconType
          })
        })
      })
    } else {
      Object.entries(encounter.roles).forEach(([roleKey, roleVal]: [string, any]) => {
        const isRunner = roleKey.toLowerCase().includes("runner")
        const isShooter = roleKey.toLowerCase().includes("shooter")
        const iconType = (isRunner || isShooter) ? "target" : "sword"

        mapped.push({
          name: `${roleKey.charAt(0).toUpperCase() + roleKey.slice(1)} (x${roleVal.quantity || 1})`,
          task: roleVal.description,
          icon: iconType
        })
      })
    }
    return mapped
  }

  const activeMechanics = getMechanicsList(activeEncounter)
  const activeRoles = getMappedRoles(activeEncounter)

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-full overflow-hidden">
      <GuideSidebar groups={sidebarGroups} title={raidData.raid_name} subtitle="Raid Guide" />

      <GuideTemplate
        title={activeEncounter.name}
        description={raidData.preface?.author_notes}
        mechanics={
          <ul className="list-none space-y-3 ml-2">
            {activeMechanics.map((line: string, i: number) => {
              const isHeader = line.startsWith("📍")
              const isSubHeader = line.startsWith("🔍")
              return (
                <li
                  key={i}
                  className={`
                    ${isHeader ? "font-bold text-primary mt-4 border-b border-border pb-1" : ""}
                    ${isSubHeader ? "font-semibold text-amber-500 mt-2 pl-4" : ""}
                    ${!isHeader && !isSubHeader ? "text-muted-foreground text-sm pl-6 leading-relaxed" : ""}
                  `}
                >
                  {line}
                </li>
              )
            })}
          </ul>
        }
        map={
          <div className="text-center text-muted-foreground flex flex-col items-center gap-2 p-6 border border-dashed border-border rounded-xl">
            <Map className="w-12 h-12 opacity-50" />
            <p className="text-sm font-medium">Bản đồ lượng tử: {activeEncounter.name}</p>
            <p className="text-xs opacity-60">Sơ đồ bệ đứng, bẫy điện và hướng dịch chuyển của Iatros.</p>
          </div>
        }
        roles={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeRoles.map((role: any, idx: number) => {
              const Icon = RoleIconMap[role.icon] || Sword
              return (
                <div key={idx} className="p-4 border border-border rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-all duration-300">
                  <h3 className="font-bold text-lg text-primary flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-vexteal" /> {role.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {role.task}
                  </p>
                </div>
              )
            })}
          </div>
        }
      />
    </div>
  )
}