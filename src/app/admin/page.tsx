import Link from "next/link"
import { AdminShell } from "@/components/admin-shell"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { mockEventRepository } from "@/lib/events/repository"
import type { EventStatus } from "@/lib/types"
import { formatEventDate } from "@/lib/utils"

export default async function AdminDashboard() {
  const events = await mockEventRepository.listAdminEvents()
  const counts = (["pending", "approved", "rejected", "archived"] as EventStatus[]).map((status) => ({ label: status, value: events.filter((event) => event.status === status).length }))
  const upcoming = events.filter((event) => new Date(event.startsAt) >= new Date()).slice(0, 5)

  return (
    <AdminShell>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><h1 className="font-display text-4xl font-semibold text-navy">Dashboard</h1><p className="mt-2 text-muted-foreground">Operational overview for submitted and approved events.</p></div>
        <Button href="/admin/events">Review Pending</Button>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <Stat label="Total" value={events.length} />
        {counts.map((item) => <Stat label={item.label} value={item.value} key={item.label} />)}
        <Stat label="Upcoming" value={upcoming.length} />
      </div>
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel title="Recent submissions" events={events.slice(0, 5)} />
        <Panel title="Upcoming events" events={upcoming} />
      </section>
    </AdminShell>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="rounded-lg border border-border bg-card p-4"><p className="text-sm capitalize text-muted-foreground">{label}</p><p className="mt-2 font-mono text-3xl font-semibold text-navy tabular-nums">{value}</p></div>
}

function Panel({ title, events }: { title: string; events: Awaited<ReturnType<typeof mockEventRepository.listAdminEvents>> }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h2 className="font-display text-2xl font-semibold text-navy">{title}</h2>
      <div className="mt-4 grid gap-3">
        {events.map((event) => <Link href={`/admin/events/${event.id}`} className="focus-ring rounded-md border border-border p-3 hover:border-primary/50" key={event.id}><div className="flex justify-between gap-3"><span className="font-semibold text-navy">{event.title}</span><StatusBadge status={event.status} /></div><p className="mt-1 text-sm text-muted-foreground">{formatEventDate(event.startsAt)} · {event.city}</p></Link>)}
      </div>
    </div>
  )
}
