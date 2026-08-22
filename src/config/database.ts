import { Shield, Sparkles, Shirt } from 'lucide-react'

export const DATABASE_TABS = [
  { name: 'Giáp Exotic', href: '/database/exotic-armor', icon: Shirt },
  { name: 'Vũ khí Exotic', href: '/database/exotic-weapons', icon: Sparkles },
  { name: 'Armor Sets', href: '/database/armor-sets', icon: Shield },
] as const

export const WEAPON_SLOT_FILTERS = ['All', 'Kinetic', 'Energy', 'Power'] as const
