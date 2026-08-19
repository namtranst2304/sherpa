import * as React from 'react'
import { DESTINY_ACTIVITIES } from '@/config/constants'
import { getDestinyTimelineSummaries } from '@/data/timeline/index'
import { getLeanExoticWeaponsData, getLeanExoticArmorData } from '@/data/index'

export interface SearchItem {
  id: string
  title: string
  subtitle: string
  href: string
  category:
    | 'Raid'
    | 'Dungeon'
    | 'Pantheon'
    | 'Exotic Mission'
    | 'Database'
    | 'Timeline'
    | 'Weapon'
    | 'Armor'
  color: 'cyan' | 'green' | 'yellow' | 'orange' | 'zinc'
}

export function useCommandPaletteData(query: string) {
  const [dynamicItems, setDynamicItems] = React.useState<SearchItem[]>([])

  // Build static index
  const staticItems = React.useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = [
      {
        id: 'timeline-root',
        title: 'Destiny 2 Timeline',
        subtitle: 'Lịch sử điện ảnh toàn bộ các kỷ nguyên Destiny',
        href: '/timeline',
        category: 'Timeline',
        color: 'orange',
      },
    ]

    Object.values(DESTINY_ACTIVITIES).forEach((cat) => {
      let categoryType: SearchItem['category'] = 'Database'
      let categoryColor: SearchItem['color'] = 'zinc'

      if (cat.id === 'raids') {
        categoryType = 'Raid'
        categoryColor = 'cyan'
      } else if (cat.id === 'dungeons') {
        categoryType = 'Dungeon'
        categoryColor = 'green'
      } else if (cat.id === 'pantheon') {
        categoryType = 'Pantheon'
        categoryColor = 'cyan'
      } else if (cat.id === 'exotic-missions') {
        categoryType = 'Exotic Mission'
        categoryColor = 'yellow'
      }

      cat.items.forEach((item) => {
        items.push({
          id: `${cat.id}-${item.title}`,
          title: item.title,
          subtitle: item.description,
          href: item.href,
          category: categoryType,
          color: categoryColor,
        })
      })
    })

    return items
  }, [])

  // Load dynamic data on mount
  React.useEffect(() => {
    let mounted = true
    Promise.all([
      getDestinyTimelineSummaries().catch(() => []),
      getLeanExoticWeaponsData().catch(() => []),
      getLeanExoticArmorData().catch(() => []),
    ]).then(([eras, weapons, armors]) => {
      if (!mounted) return

      const dyn: SearchItem[] = []

      eras.forEach((e) => {
        dyn.push({
          id: `era-${e.id}`,
          title: e.name,
          subtitle: 'Kỷ nguyên Timeline',
          href: `/timeline#${e.id}`,
          category: 'Timeline',
          color: 'orange',
        })
      })

      weapons.forEach((w) => {
        const damageColor =
          w.damageType === 'Solar'
            ? 'orange'
            : w.damageType === 'Void'
              ? 'zinc' // no purple yet, fallback zinc
              : w.damageType === 'Arc'
                ? 'cyan'
                : w.damageType === 'Strand'
                  ? 'green'
                  : 'zinc'

        dyn.push({
          id: `wep-${w.id}`,
          title: w.name,
          subtitle: `${w.weaponType} • ${w.damageType}`,
          href: `/database/exotic-weapons#${w.id}`,
          category: 'Weapon',
          color: damageColor as SearchItem['color'],
        })
      })

      armors.forEach((a) => {
        dyn.push({
          id: `arm-${a.id}`,
          title: a.name,
          subtitle: `${a.class} • ${a.type}`,
          href: `/database/exotic-armor#${a.id}`,
          category: 'Armor',
          color: 'zinc',
        })
      })

      setDynamicItems(dyn)
    })

    return () => {
      mounted = false
    }
  }, [])

  const allItems = React.useMemo(
    () => [...staticItems, ...dynamicItems],
    [staticItems, dynamicItems],
  )

  // Filter items based on query
  const filteredItems = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return staticItems // show static by default
    return allItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q),
      )
      .slice(0, 15) // Limit to 15 results for performance
  }, [allItems, query, staticItems])

  return { filteredItems }
}
