import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DESTINY_ACTIVITIES } from "@/lib/constants"

export default function Home() {
  const activities = Object.values(DESTINY_ACTIVITIES)

  return (
    <div className="flex-1 overflow-y-auto w-full">
      <main className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)]">

        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-3xl mb-16 mt-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 uppercase">
            Destiny 2 Sherpa
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Welcome Guardian! Your ultimate hub for comprehensive guides on Destiny 2 Dungeons and Raids.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            {activities.map((act) => (
              <Button key={`hero-btn-${act.id}`} asChild size="lg" variant={act.id === "raids" ? "default" : "outline"} className="font-bold tracking-wide">
                <Link href={act.href}>Explore {act.title}</Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Features / Quick Navigation Mapped */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
          {activities.map((category) => {
            const Icon = category.icon
            return (
              <Card key={category.id} className="flex flex-col hover:border-primary transition-colors bg-card border-border hover:shadow-[0_0_15px_rgba(0,195,255,0.2)]">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl uppercase tracking-wider">{category.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    {category.items.map((item) => (
                      <li key={item.title}>{item.title}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="secondary" className="w-full group">
                    <Link href={category.href}>
                      View All {category.title}
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

      </main>
    </div>
  )
}