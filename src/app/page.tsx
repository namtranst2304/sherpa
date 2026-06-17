import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24 bg-background text-foreground">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-primary">Destiny 2 Sherpa</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Welcome Guardian! This site contains comprehensive guides for Destiny 2 Dungeons and Raids.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button variant="default">View Raids</Button>
          <Button variant="outline">View Dungeons</Button>
        </CardContent>
      </Card>
    </main>
  );
}
