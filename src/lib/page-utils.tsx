import React from "react"
import { notFound } from "next/navigation"
import { ActivityEncounterView } from "@/components/layout/ActivityEncounterView"
import { ActivityData } from "@/types"

export async function createActivityPage(
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ enc?: string }>,
  dataSource: Record<string, ActivityData>
) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  const data = dataSource[resolvedParams.slug]

  if (!data) {
    notFound()
  }

  return (
    <ActivityEncounterView 
      activityData={data} 
      activeEncounterId={resolvedSearchParams.enc}
    />
  )
}
