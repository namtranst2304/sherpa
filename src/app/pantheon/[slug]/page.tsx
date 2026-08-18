import { PANTHEON_SLUGS, getPantheonData } from '@/data'
import { createActivityPage, createActivityMetadata } from '@/lib/page-utils'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ enc?: string }>
}

export async function generateStaticParams() {
  return PANTHEON_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  return await createActivityMetadata(params, getPantheonData, 'Pantheon')
}

export default async function PantheonEncounterPage({
  params,
  searchParams,
}: PageProps) {
  return await createActivityPage(params, searchParams, getPantheonData)
}
