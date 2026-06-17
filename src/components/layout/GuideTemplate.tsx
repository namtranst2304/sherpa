import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Map, Users, Settings } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface GuideTemplateProps {
    title: string
    description: string
    mechanics: React.ReactNode
    map: React.ReactNode
    roles: React.ReactNode
}

export function GuideTemplate({ title, description, mechanics, map, roles }: GuideTemplateProps) {
    return (
        <div className="flex-1 overflow-y-auto w-full bg-background p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header với nút bật/tắt Sidebar trên mobile */}
                <div className="flex items-center gap-4 border-b border-border pb-6">
                    <SidebarTrigger className="md:hidden" />
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                            {title}
                        </h1>
                        <p className="text-muted-foreground mt-2 text-lg">
                            {description}
                        </p>
                    </div>
                </div>

                {/* 3 Cards Nội Dung */}
                <div className="flex flex-col gap-8">

                    {/* Card 1: Mechanics (Cơ chế cốt lõi) */}
                    <Card className="bg-card border-border hover:border-primary transition-colors hover:shadow-[0_0_15px_rgba(0,195,255,0.1)]">
                        <CardHeader className="border-b border-border/50 pb-4 mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-md">
                                    <Settings className="w-5 h-5 text-primary" />
                                </div>
                                <CardTitle className="uppercase tracking-wider">Encounter Mechanics</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-muted-foreground leading-relaxed">
                            {mechanics}
                        </CardContent>
                    </Card>

                    {/* Card 2: Map (Bản đồ) */}
                    <Card className="bg-card border-border hover:border-primary transition-colors hover:shadow-[0_0_15px_rgba(0,195,255,0.1)] flex flex-col">
                        <CardHeader className="border-b border-border/50 pb-4 mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-md">
                                    <Map className="w-5 h-5 text-primary" />
                                </div>
                                <CardTitle className="uppercase tracking-wider">Callout Map</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex items-center justify-center min-h-[300px] bg-secondary/50 rounded-md m-4 mt-0 border border-border">
                            {map}
                        </CardContent>
                    </Card>

                    {/* Card 3: What to do (Nhiệm vụ cho từng Role) */}
                    <Card className="bg-card border-border hover:border-primary transition-colors hover:shadow-[0_0_15px_rgba(0,195,255,0.1)]">
                        <CardHeader className="border-b border-border/50 pb-4 mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-md">
                                    <Users className="w-5 h-5 text-primary" />
                                </div>
                                <CardTitle className="uppercase tracking-wider">What to do (Roles)</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {roles}
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    )
}