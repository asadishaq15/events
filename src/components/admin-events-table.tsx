"use client"

import { useMemo, useState } from "react"
import { Archive, Check, Eye, Pencil, X } from "lucide-react"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Input, Label } from "@/components/ui/input"
import type { CommunityEvent, EventStatus } from "@/lib/types"
import { formatEventDate } from "@/lib/utils"

export function AdminEventsTable({ events }: { events: CommunityEvent[] }) {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<EventStatus | "all">("all")
  const [sort, setSort] = useState("submitted")
  const filtered = useMemo(() => events.filter((event) => {
    const matchesQuery = `${event.title} ${event.city} ${event.category}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (status === "all" || event.status === status)
  }).sort((a, b) => sort === "date" ? +new Date(a.startsAt) - +new Date(b.startsAt) : +new Date(b.submittedAt) - +new Date(a.submittedAt)), [events, query, sort, status])

  return (
    <div className="mt-6">
      <div className="grid gap-4 rounded-lg border border-border bg-card p-4 md:grid-cols-3">
        <div><Label htmlFor="admin-search">Search</Label><Input id="admin-search" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
        <div><Label htmlFor="status">Status</Label><select id="status" value={status} onChange={(event) => setStatus(event.target.value as EventStatus | "all")} className="focus-ring min-h-11 w-full rounded-md border border-border bg-white px-3 text-sm"><option value="all">All statuses</option>{["draft","pending","approved","rejected","archived"].map((item) => <option key={item}>{item}</option>)}</select></div>
        <div><Label htmlFor="sort">Sort</Label><select id="sort" value={sort} onChange={(event) => setSort(event.target.value)} className="focus-ring min-h-11 w-full rounded-md border border-border bg-white px-3 text-sm"><option value="submitted">Submission time</option><option value="date">Event date</option></select></div>
      </div>
      <div className="mt-5 hidden overflow-hidden rounded-lg border border-border bg-card lg:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-navy"><tr><th className="p-3">Event</th><th className="p-3">Category</th><th className="p-3">City</th><th className="p-3">Date</th><th className="p-3">Status</th><th className="p-3">Actions</th></tr></thead>
          <tbody>{filtered.map((event) => <tr className="border-t border-border" key={event.id}><td className="p-3 font-semibold text-navy">{event.title}</td><td className="p-3">{event.category}</td><td className="p-3">{event.city}</td><td className="p-3">{formatEventDate(event.startsAt)}</td><td className="p-3"><StatusBadge status={event.status} /></td><td className="p-3"><Actions id={event.id} /></td></tr>)}</tbody>
        </table>
      </div>
      <div className="mt-5 grid gap-4 lg:hidden">{filtered.map((event) => <article className="rounded-lg border border-border bg-card p-4" key={event.id}><div className="flex justify-between gap-3"><h2 className="font-semibold text-navy">{event.title}</h2><StatusBadge status={event.status} /></div><p className="mt-2 text-sm text-muted-foreground">{event.category} · {event.city} · {formatEventDate(event.startsAt)}</p><div className="mt-4"><Actions id={event.id} /></div></article>)}</div>
    </div>
  )
}

function Actions({ id }: { id: string }) {
  return <div className="flex flex-wrap gap-2"><Button href={`/admin/events/${id}`} variant="secondary"><Eye className="h-4 w-4" /></Button><Button href={`/admin/events/${id}`} variant="secondary"><Pencil className="h-4 w-4" /></Button><Button variant="secondary"><Check className="h-4 w-4" /></Button><Button variant="secondary"><X className="h-4 w-4" /></Button><Button variant="danger"><Archive className="h-4 w-4" /></Button></div>
}
