"use client"

import { useMemo, useState } from "react"
import { EventCard } from "@/components/event-card"
import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { Input, Label } from "@/components/ui/input"
import type { CommunityEvent } from "@/lib/types"

export function EventsExplorer({ events }: { events: CommunityEvent[] }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [city, setCity] = useState("all")
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming")
  const categories = [...new Set(events.map((event) => event.category))]
  const cities = [...new Set(events.map((event) => event.city))]
  const today = new Date()

  const filtered = useMemo(() => {
    return events.filter((event) => {
      const haystack = `${event.title} ${event.shortDescription} ${event.description} ${event.venueName} ${event.city}`.toLowerCase()
      const matchesQuery = haystack.includes(query.toLowerCase())
      const matchesCategory = category === "all" || event.category === category
      const matchesCity = city === "all" || event.city === city
      const isPast = new Date(event.startsAt) < today
      return matchesQuery && matchesCategory && matchesCity && (tab === "past" ? isPast : !isPast)
    })
  }, [category, city, events, query, tab, today])

  return (
    <div className="mt-8">
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Label htmlFor="search">Search</Label>
            <Input id="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, venue, description, or city" />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <select id="category" className="focus-ring min-h-11 w-full rounded-md border border-border bg-white px-3 text-sm" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">All categories</option>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <select id="city" className="focus-ring min-h-11 w-full rounded-md border border-border bg-white px-3 text-sm" value={city} onChange={(event) => setCity(event.target.value)}>
              <option value="all">All cities</option>
              {cities.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex rounded-md border border-border p-1">
            {(["upcoming", "past"] as const).map((item) => (
              <button className={`focus-ring min-h-10 rounded px-4 text-sm font-semibold capitalize ${tab === item ? "bg-primary text-white" : "text-muted-foreground"}`} key={item} onClick={() => setTab(item)} type="button">{item}</button>
            ))}
          </div>
          <Button variant="ghost" onClick={() => { setQuery(""); setCategory("all"); setCity("all") }}>Clear Filters</Button>
        </div>
      </div>
      <p className="mt-5 text-sm font-medium text-muted-foreground">{filtered.length} result{filtered.length === 1 ? "" : "s"}</p>
      {filtered.length ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => <EventCard event={event} key={event.id} />)}
        </div>
      ) : (
        <div className="mt-5"><EmptyState title="No matching events" description="Try another search, category, city, or date tab." /></div>
      )}
      <div className="mt-8 flex justify-center">
        <Button variant="secondary">Pagination Ready</Button>
      </div>
    </div>
  )
}
