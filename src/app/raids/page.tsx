import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RaidsPage() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-black mb-6 text-primary">Raids</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:border-primary transition-colors">
          <CardHeader>
            <CardTitle>The Desert Perpetual</CardTitle>
            <CardDescription>Vex Raid • Kepler Sector</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/raids/the-desert-perpetual">
              <Button className="w-full">View Guide</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
