import { ShieldAlert, Swords, Crown, Target, Database, type LucideIcon } from "lucide-react"

export type ActivityItem = {
  title: string
  href: string
  description: string
}

export type ActivityCategory = {
  id: string
  title: string
  href: string
  description: string
  icon: LucideIcon
  items: ActivityItem[]
  locked?: boolean
  themeColor: "cyan" | "green" | "yellow" | "orange" | "red" | "zinc"
}

// Lightweight nav manifest — only title + location for TopNav rendering.
// This avoids importing all 35 JSON activity data files (~550KB) just for navigation labels.
const RAID_NAV: { slug: string; name: string; location: string }[] = [
  { slug: "the-desert-perpetual", name: "The Desert Perpetual", location: "Unknown Space" },
  { slug: "garden-of-salvation", name: "Garden of Salvation", location: "The Black Garden" },
  { slug: "deep-stone-crypt", name: "Deep Stone Crypt", location: "Europa" },
  { slug: "crotas-end", name: "Crota's End", location: "The Moon" },
  { slug: "vault-of-glass", name: "Vault of Glass", location: "Venus" },
  { slug: "vow-of-the-disciple", name: "Vow of the Disciple", location: "Throne World" },
  { slug: "last-wish", name: "Last Wish", location: "Dreaming City" },
  { slug: "kings-fall", name: "King's Fall", location: "The Dreadnaught" },
  { slug: "root-of-nightmares", name: "Root of Nightmares", location: "Essence" },
  { slug: "salvations-edge", name: "Salvation's Edge", location: "The Pale Heart" },
];

const DUNGEON_NAV: { slug: string; name: string; location: string }[] = [
  { slug: "shattered-throne", name: "Shattered Throne", location: "Dreaming City" },
  { slug: "pit-of-heresy", name: "Pit of Heresy", location: "The Moon" },
  { slug: "prophecy", name: "Prophecy", location: "The Tower (IX Realm)" },
  { slug: "grasp-of-avarice", name: "Grasp of Avarice", location: "Cosmodrome" },
  { slug: "duality", name: "Duality", location: "The Mindscape" },
  { slug: "spire-of-the-watcher", name: "Spire of the Watcher", location: "Mars" },
  { slug: "ghosts-of-the-deep", name: "Ghosts of the Deep", location: "The Lucent Hive" },
  { slug: "warlords-ruin", name: "Warlord's Ruin", location: "EDZ" },
  { slug: "equilibrium", name: "Equilibrium", location: "Unknown Space" },
  { slug: "vespers-host", name: "Vesper's Host", location: "Old Chicago" },
  { slug: "sundered-doctrine", name: "Sundered Doctrine", location: "Mars" },
];

const PANTHEON_NAV: { slug: string; name: string; location: string }[] = [
  { slug: "calus-resplendent", name: "Calus, Resplendent", location: "Pantheon" },
  { slug: "morgeth-surpassing", name: "Morgeth, Surpassing", location: "Pantheon" },
  { slug: "insurrection-prime-revolution", name: "Insurrection Prime, Revolution", location: "Pantheon" },
];

const EXOTIC_MISSION_NAV: { slug: string; name: string; location: string }[] = [
  { slug: "the-whisper", name: "The Whisper", location: "Io" },
  { slug: "zero-hour", name: "Zero Hour", location: "The Tower" },
  { slug: "presage", name: "Presage", location: "Glykon Volatus" },
  { slug: "vox-obscura", name: "Vox Obscura", location: "Mars" },
  { slug: "seraphs-shield", name: "Seraph's Shield", location: "The Last City" },
  { slug: "avalon", name: "Avalon", location: "Vex Network" },
  { slug: "starcrossed", name: "Starcrossed", location: "The Black Garden" },
  { slug: "encore", name: "Encore", location: "Nessus" },
  { slug: "dual-destiny", name: "Dual Destiny", location: "The Pale Heart" },
  { slug: "derealize", name: "Derealize", location: "Unknown Space" },
  { slug: "heliostat", name: "Heliostat", location: "Mercury" },
];

export const DESTINY_ACTIVITIES: Record<string, ActivityCategory> = {
  raids: {
    id: "raids",
    title: "Raids",
    href: "/raids",
    description: "Hướng dẫn chi tiết từng bước cho các hoạt động endgame 6 người.",
    icon: Swords,
    items: RAID_NAV.map((r) => ({ title: r.name, href: `/raids/${r.slug}`, description: r.location })),
    themeColor: "cyan"
  },
  dungeons: {
    id: "dungeons",
    title: "Dungeons",
    href: "/dungeons",
    description: "Hướng dẫn toàn tập cho các mini-raid 3 người.",
    icon: ShieldAlert,
    items: DUNGEON_NAV.map((d) => ({ title: d.name, href: `/dungeons/${d.slug}`, description: d.location })),
    themeColor: "green"
  },
  pantheon: {
    id: "pantheon",
    title: "Pantheon",
    href: "/pantheon",
    description: "Trải nghiệm đánh boss liên hoàn đỉnh cao. Đối đầu với những kẻ thù khó nhằn nhất Destiny 2.",
    icon: Crown,
    items: PANTHEON_NAV.map((p) => ({ title: p.name, href: `/pantheon/${p.slug}`, description: p.location })),
    themeColor: "cyan"
  },
  exotic_missions: {
    id: "exotic-missions",
    title: "Exotic Missions",
    href: "/exotic-missions",
    description: "Nhiệm vụ đặc biệt ẩn chứa những món vũ khí Exotic uy lực nhất.",
    icon: Target,
    items: EXOTIC_MISSION_NAV.map((e) => ({ title: e.name, href: `/exotic-missions/${e.slug}`, description: e.location })),
    themeColor: "yellow"
  },
  database: {
    id: "database",
    title: "Database",
    href: "/database",
    description: "Cơ sở dữ liệu chọn lọc các trang bị META và mạnh nhất Destiny 2.",
    icon: Database,
    items: [
      { title: "Exotic Armor", href: "/database/exotic-armor", description: "Tra cứu hệ thống giáp Exotic của 3 class và Exotic Class Items." },
      { title: "Exotic Weapons", href: "/database/exotic-weapons", description: "Tra cứu thông tin và cách lấy các loại vũ khí Exotic." },
      { title: "Armor Sets", href: "/database/armor-sets", description: "Tổng hợp các bộ giáp và hiệu ứng Set Bonus trong Destiny 2." }
    ],
    themeColor: "zinc"
  }
}