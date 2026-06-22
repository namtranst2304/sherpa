import React from "react"
import { Map, Users, Settings, Sparkles } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { CyberCard } from "@/components/ui/CyberComponents"

interface GuideTemplateProps {
    title: string
    description: string
    mechanics: React.ReactNode
    map: React.ReactNode
    roles: React.ReactNode
    secrets?: React.ReactNode
}

export function GuideTemplate({ title, description, mechanics, map, roles, secrets }: GuideTemplateProps) {
    return (
        <div className="flex-1 overflow-y-auto w-full bg-background p-4 md:p-8 relative">
            {/* Subtle background scanlines for the whole guide */}
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-scanline z-0" />
            
            <div className="max-w-6xl mx-auto space-y-8 relative z-10">

                {/* Header with mobile sidebar toggle */}
                <div className="flex items-center gap-4 border-b border-primary/30 pb-6">
                    <SidebarTrigger className="md:hidden" />
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-blue-400 to-neon-orange text-glow-cyan">
                            {title}
                        </h1>
                        <p className="text-muted-foreground mt-2 text-lg font-mono tracking-wide">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px] gap-8 items-start">

                    {/* Left Column: Mechanics */}
                    <div className="flex flex-col gap-8 w-full">
                        <CyberCard variant="zinc" withCorners className="cyber-grid relative">
                            <div className="border-b border-zinc-800 pb-4 mb-4 flex items-center gap-3 relative z-10">
                                <div className="p-2 bg-neon-cyan/10 rounded-md">
                                    <Settings className="w-5 h-5 text-neon-cyan" />
                                </div>
                                <h2 className="text-xl font-bold uppercase tracking-wider text-foreground">Encounter Mechanics</h2>
                            </div>
                            <div className="text-muted-foreground leading-relaxed relative z-10">
                                {mechanics}
                            </div>
                        </CyberCard>
                    </div>

                    {/* Right Column: Map, Roles, Secrets */}
                    <div className="flex flex-col gap-8 w-full lg:sticky lg:top-8">
                        {/* Map */}
                        <CyberCard variant="zinc" withCorners className="flex flex-col">
                            <div className="border-b border-zinc-800 pb-4 mb-4 flex items-center gap-3 relative z-10">
                                <div className="p-2 bg-neon-cyan/10 rounded-md">
                                    <Map className="w-5 h-5 text-neon-cyan" />
                                </div>
                                <h2 className="text-xl font-bold uppercase tracking-wider text-foreground">Callout Map</h2>
                            </div>
                            <div className="flex-1 flex items-center justify-center min-h-[300px] bg-background/50 rounded-md border border-zinc-800 overflow-hidden relative z-10">
                                {/* Inner cyber frame for map */}
                                <div className="absolute inset-0 pointer-events-none border border-neon-cyan/20 m-2" />
                                {map}
                            </div>
                        </CyberCard>

                        {/* Roles */}
                        <CyberCard variant="zinc" withCorners className="cyber-grid relative">
                            <div className="border-b border-zinc-800 pb-4 mb-4 flex items-center gap-3 relative z-10">
                                <div className="p-2 bg-neon-cyan/10 rounded-md">
                                    <Users className="w-5 h-5 text-neon-cyan" />
                                </div>
                                <h2 className="text-xl font-bold uppercase tracking-wider text-foreground">What to do (Roles)</h2>
                            </div>
                            <div className="relative z-10">
                                {roles}
                            </div>
                        </CyberCard>

                        {/* Secrets & Hidden Chests */}
                        {secrets && (
                            <CyberCard variant="zinc" withCorners className="cyber-grid relative">
                                <div className="border-b border-zinc-800 pb-4 mb-4 flex items-center gap-3 relative z-10">
                                    <div className="p-2 bg-neon-cyan/10 rounded-md">
                                        <Sparkles className="w-5 h-5 text-neon-cyan" />
                                    </div>
                                    <h2 className="text-xl font-bold uppercase tracking-wider text-foreground">Hidden Chests & Secrets</h2>
                                </div>
                                <div className="relative z-10">
                                    {secrets}
                                </div>
                            </CyberCard>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}