import type { MetadataRoute } from 'next'
import {
  RAID_SLUGS,
  DUNGEON_SLUGS,
  PANTHEON_SLUGS,
  EXOTIC_MISSION_SLUGS,
} from '@/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://d2sherpa.com'
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/timeline`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/database/exotic-weapons`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/database/exotic-armor`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/database/armor-sets`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const raidRoutes: MetadataRoute.Sitemap = RAID_SLUGS.map((slug) => ({
    url: `${baseUrl}/raids/${slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const dungeonRoutes: MetadataRoute.Sitemap = DUNGEON_SLUGS.map((slug) => ({
    url: `${baseUrl}/dungeons/${slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const pantheonRoutes: MetadataRoute.Sitemap = PANTHEON_SLUGS.map((slug) => ({
    url: `${baseUrl}/pantheon/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const exoticMissionRoutes: MetadataRoute.Sitemap = EXOTIC_MISSION_SLUGS.map(
    (slug) => ({
      url: `${baseUrl}/exotic-missions/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
  )

  return [
    ...staticRoutes,
    ...raidRoutes,
    ...dungeonRoutes,
    ...pantheonRoutes,
    ...exoticMissionRoutes,
  ]
}
