import { EXOTIC_MISSION_SLUGS, getExoticMissionData } from '@/data'
import { ExoticMissionView } from '@/features/activity'
import { slimExoticMissionForClient } from '@/lib/activity-payload'
import { createActivityMetadata } from '@/lib/page-utils'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ tab?: string }>
}

export async function generateStaticParams() {
  return EXOTIC_MISSION_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  return await createActivityMetadata(
    params,
    getExoticMissionData,
    'Exotic Mission',
  )
}

export default async function ExoticMissionPage({
  params,
  searchParams,
}: PageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const tab = resolvedSearchParams.tab || 'overview'

  const data = await getExoticMissionData(resolvedParams.slug)

  if (!data) {
    notFound()
  }

  return (
    <ExoticMissionView
      activityData={slimExoticMissionForClient(data, tab)}
      activeTabId={tab}
    />
  )
}
