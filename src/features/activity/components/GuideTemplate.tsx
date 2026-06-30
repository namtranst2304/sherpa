import React from "react"
import { Map, Users, Settings, Sparkles, LucideIcon } from "lucide-react"
import { CyberCard, CyberHeading } from "@/components/common/CyberComponents"
import { cn } from "@/lib/utils"

interface GuideTemplateProps {
    title: string
    description: string
    mechanics: React.ReactNode
    map: React.ReactNode
    roles: React.ReactNode
    secrets?: React.ReactNode
}

interface GuideSectionProps {
    icon: LucideIcon;
    title: string;
    children: React.ReactNode;
    className?: string;
    contentClassName?: string;
}

function GuideSection({ icon: Icon, title, children, className, contentClassName }: GuideSectionProps) {
    if (!children) return null;
    
    return (
        <CyberCard variant="zinc" withCorners className={className}>
            <div className="border-b border-zinc-800 pb-4 mb-4 flex items-center gap-3 relative z-10">
                <div className="p-2 bg-neon-cyan/10 rounded-md">
                    <Icon className="w-5 h-5 text-neon-cyan" />
                </div>
                <h2 className="text-xl font-bold uppercase tracking-wider text-foreground">{title}</h2>
            </div>
            <div className={cn("relative z-10", contentClassName)}>
                {children}
            </div>
        </CyberCard>
    )
}

export function GuideTemplate({ title, description, mechanics, map, roles, secrets }: GuideTemplateProps) {
    return (
        <div className="flex-1 overflow-y-auto w-full bg-background p-4 md:p-8 relative">
            {/* Subtle background scanlines for the whole guide */}
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-scanline z-0" />
            
            <div className="w-full space-y-8 relative z-10">

                {/* Header with mobile sidebar toggle */}
                <div className="border-b border-primary/30 pb-6">
                    <div>
                        <CyberHeading variant="gradient" size="lg">
                            {title}
                        </CyberHeading>
                        <p className="text-muted-foreground mt-2 text-lg font-mono tracking-wide">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px] gap-8 items-start">

                    {/* Left Column: Map and Mechanics */}
                    <div className="flex flex-col gap-8 w-full">
                        {/* Map */}
                        <GuideSection 
                            icon={Map} 
                            title="Callout Map" 
                            className="flex flex-col relative" 
                            contentClassName="flex-1 flex items-center justify-center min-h-[300px] bg-background/50 rounded-md border border-zinc-800 overflow-hidden"
                        >
                            <div className="absolute inset-0 pointer-events-none border border-neon-cyan/20 m-2" />
                            {map}
                        </GuideSection>

                        {/* Mechanics */}
                        <GuideSection 
                            icon={Settings} 
                            title="Encounter Mechanics" 
                            className="cyber-grid relative" 
                            contentClassName="text-muted-foreground leading-relaxed"
                        >
                            {mechanics}
                        </GuideSection>
                    </div>

                    {/* Right Column: Roles, Secrets */}
                    <div className="flex flex-col gap-8 w-full lg:sticky lg:top-8">
                        {/* Roles */}
                        <GuideSection icon={Users} title="What to do (Roles)" className="cyber-grid relative">
                            {roles}
                        </GuideSection>

                        {/* Secrets & Hidden Chests */}
                        <GuideSection icon={Sparkles} title="Hidden Chests & Secrets" className="cyber-grid relative">
                            {secrets}
                        </GuideSection>
                    </div>

                </div>
            </div>
        </div>
    )
}