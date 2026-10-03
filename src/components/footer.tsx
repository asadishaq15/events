import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <h2 className="font-display text-2xl font-semibold text-navy">Bay Area Desis Events</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">A curated place for Indian and South Asian community gatherings, professional events, celebrations, and service opportunities.</p>
        </div>
        <div className="grid gap-2 text-sm">
          <Link href="/events">Browse Events</Link>
          <Link href="/events/submit">Submit an Event</Link>
          <Link href="/admin/login">Admin Login</Link>
        </div>
        <div>
          <p className="mb-3 text-sm text-muted-foreground">Have something the community should know about?</p>
          <Button href="/events/submit">Share It</Button>
        </div>
      </div>
    </footer>
  )
}
