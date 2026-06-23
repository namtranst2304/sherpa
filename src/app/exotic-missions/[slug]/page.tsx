import { EXOTIC_MISSIONS_DATA } from "@/data"
import { ExoticMissionView } from "@/features/activity/components/ExoticMissionView"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ tab?: string }>
}

export async function generateStaticParams() {
  return Object.keys(EXOTIC_MISSIONS_DATA).map((slug) => ({ slug }))
}

export default async function ExoticMissionPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  const data = EXOTIC_MISSIONS_DATA[resolvedParams.slug]

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
