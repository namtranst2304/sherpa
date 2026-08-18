import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Destiny 2 Sherpa | Guides & Database',
    short_name: 'D2 Sherpa',
    description:
      'Comprehensive guides, loot tables, and mechanics for Destiny 2 endgame content.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f1115',
    theme_color: '#00f3ff',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/logo.ico',
        sizes: '48x48 32x32 16x16',
        type: 'image/x-icon',
      },
    ],
  }
}
