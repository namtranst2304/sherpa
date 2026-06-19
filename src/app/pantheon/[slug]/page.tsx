import { notFound } from "next/navigation"
import { PANTHEON_DATA } from "@/data"
import { ActivityEncounterView } from "@/components/layout/ActivityEncounterView"

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ enc?: string }>
}

export async function generateStaticParams() {
  return Object.keys(PANTHEON_DATA).map((slug) => ({
    slug,
  }))
}

export default async function PantheonEncounterPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  const pantheonData = PANTHEON_DATA[resolvedParams.slug]

  if (!pantheonData) {
    notFound()
  }

  return (
    <ActivityEncounterView 
      activityData={pantheonData} 
      activeEncounterId={resolvedSearchParams.enc}
    />
  )
}
