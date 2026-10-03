import Link from "next/link"
import { CalendarCheck, LayoutDashboard, LogOut } from "lucide-react"

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/events", label: "Events", icon: CalendarCheck },
  { href: "/admin/login", label: "Mock Login", icon: LogOut },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden border-r border-border bg-card lg:block">
        <div className="sticky top-0 p-5">
          <h1 className="font-display text-2xl font-semibold text-navy">Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Mock authentication until Supabase is connected.</p>
          <nav className="mt-8 grid gap-2">
            {nav.map((item) => <Link className="focus-ring flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-navy" href={item.href} key={item.href}><item.icon className="h-4 w-4" />{item.label}</Link>)}
          </nav>
        </div>
      </aside>
      <div>
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 p-4 backdrop-blur lg:hidden">
          <nav className="flex gap-2 overflow-x-auto">{nav.map((item) => <Link className="min-h-11 whitespace-nowrap rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold" href={item.href} key={item.href}>{item.label}</Link>)}</nav>
        </header>
        <main className="container-page py-8">{children}</main>
      </div>
    </div>
  )
}
