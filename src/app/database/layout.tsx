"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Sparkles, Shirt } from "lucide-react"

export default function DatabaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const tabs = [
    { name: "Exotic Armor", href: "/database/exotic-armor", icon: Shirt },
    { name: "Exotic Weapons", href: "/database/exotic-weapons", icon: Sparkles },
    { name: "Armor Sets", href: "/database/armor-sets", icon: Shield },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 w-full py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-widest uppercase text-neon-cyan text-glow-cyan mb-4">
            Destiny 2 Database
          </h1>
          <p className="text-zinc-400 font-mono max-w-2xl">
            Trung tâm dữ liệu Sherpa. Tra cứu Loot Tables, Armor Sets và Catalysts.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-2">
          {tabs.map((tab) => {
            const isActive = pathname.startsWith(tab.href)
            const Icon = tab.icon
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-all border-b-2 font-black uppercase tracking-wider text-sm ${isActive
                    ? "border-neon-cyan text-neon-cyan bg-neon-cyan/10"
                    : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </Link>
            )
          })}
        </div>

        {/* Tab Content Area */}
        <div className="min-h-[500px]">
          {children}
        </div>
      </div>
    </div>
  )
}
