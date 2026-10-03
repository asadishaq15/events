import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="container-page flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="font-display text-4xl font-semibold text-navy">Page not found</h1>
      <p className="mt-3 max-w-md text-muted-foreground">The page or event you are looking for may have moved, expired, or not been approved for publication.</p>
      <Button href="/events" className="mt-6">Browse Events</Button>
    </main>
  )
}
