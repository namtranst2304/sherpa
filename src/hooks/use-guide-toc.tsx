"use client"

import * as React from "react"
import type { SidebarGroup } from "@/features/activity/components/GuideSidebar"

type GuideTOCContextType = {
  title: string
  subtitle: string
  orbit?: string
  groups: SidebarGroup[]
  activeEncounterId?: string
  setTOC: (title: string, subtitle: string, orbit: string | undefined, groups: SidebarGroup[], activeEncounterId?: string) => void
}

const GuideTOCContext = React.createContext<GuideTOCContextType | null>(null)

export function GuideTOCProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = React.useState("")
  const [subtitle, setSubtitle] = React.useState("")
  const [orbit, setOrbit] = React.useState<string | undefined>()
  const [groups, setGroups] = React.useState<SidebarGroup[]>([])
  const [activeEncounterId, setActiveEncounterId] = React.useState<string | undefined>()

  const setTOC = React.useCallback((t: string, s: string, o: string | undefined, g: SidebarGroup[], a?: string) => {
    setTitle(t)
    setSubtitle(s)
    setOrbit(o)
    setGroups(g)
    setActiveEncounterId(a)
  }, [])

  return (
    <GuideTOCContext.Provider value={{ title, subtitle, orbit, groups, activeEncounterId, setTOC }}>
      {children}
    </GuideTOCContext.Provider>
  )
}

export function useGuideTOC() {
  return React.useContext(GuideTOCContext)
}
