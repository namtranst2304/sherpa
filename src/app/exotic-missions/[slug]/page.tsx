import { EXOTIC_MISSION_SLUGS, getExoticMissionData } from "@/data"
import { ExoticMissionView } from "@/features/activity/components/ExoticMissionView"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ tab?: string }>
}

export async function generateStaticParams() {
  return EXOTIC_MISSION_SLUGS.map((slug) => ({ slug }))
}

export default async function ExoticMissionPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  const data = await getExoticMissionData(resolvedParams.slug)

  if (!data) {
    notFound()
  }

  return (
    <ExoticMissionView 
      activityData={data} 
      activeTabId={resolvedSearchParams.tab || "overview"}
    />
  )
}
