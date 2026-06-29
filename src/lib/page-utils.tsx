
import { notFound } from "next/navigation"
import { ActivityEncounterView } from "@/features/activity/components/ActivityEncounterView"
import { ActivityData } from "@/types"

export async function createActivityPage(
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ enc?: string }>,
  dataLoader: (slug: string) => Promise<ActivityData | null>
) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  const data = await dataLoader(resolvedParams.slug)

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

