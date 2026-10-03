import Link from "next/link"
import { CalendarHeart } from "lucide-react"
import { Button } from "@/components/ui/button"

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/events/submit", label: "Submit" },
  { href: "/admin", label: "Admin" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-md font-display text-xl font-semibold text-navy">
          <CalendarHeart className="h-6 w-6 text-primary" />
          Bay Area Desis Events
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link className="focus-ring rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-navy" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Button href="/events/submit" className="hidden md:inline-flex">Submit Event</Button>
      </div>
    </header>
  )
}
