import * as React from "react"
import { Database, Swords, Shield } from "lucide-react"
import Link from "next/link"

export default function DatabaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black">
      {/* Database Sidebar */}
      <aside className="w-full md:w-64 border-r-2 border-zinc-800/50 bg-black/50 p-6 flex flex-col gap-6">
        <div className="flex items-center gap-3 text-neon-cyan mb-4">
          <Database className="w-6 h-6" />
          <h2 className="text-xl font-black tracking-widest uppercase">Database</h2>
        </div>
        
        <nav className="flex flex-col gap-2">
          <Link href="/database/weapons" className="flex items-center gap-3 px-4 py-3 rounded-md bg-zinc-900/50 hover:bg-neon-cyan/20 border border-transparent hover:border-neon-cyan/50 text-zinc-300 hover:text-neon-cyan transition-colors">
            <Swords className="w-4 h-4" />
            <span className="font-mono text-sm uppercase tracking-wider">Meta Weapons</span>
          </Link>
          <Link href="/database/armors" className="flex items-center gap-3 px-4 py-3 rounded-md bg-zinc-900/50 hover:bg-neon-cyan/20 border border-transparent hover:border-neon-cyan/50 text-zinc-300 hover:text-neon-cyan transition-colors">
            <Shield className="w-4 h-4" />
            <span className="font-mono text-sm uppercase tracking-wider">Exotic Armors</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
