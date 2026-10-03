import { ArrowRight, Search } from "lucide-react"
import { EventCard } from "@/components/event-card"
import { EventImage } from "@/components/event-image"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { mockEventRepository } from "@/lib/events/repository"
import { formatEventDate } from "@/lib/utils"

export default async function HomePage() {
  const events = await mockEventRepository.listApprovedEvents()
  const featured = events[0]
  const upcoming = events.slice(0, 6)
  const categories = [...new Set(events.map((event) => event.category))].slice(0, 8)

  return (
    <>
      <SiteHeader />
      <main>
        <section className="container-page grid gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-14">
          <div className="flex flex-col justify-center">
            <span className="mb-4 text-sm font-semibold text-primary">Curated community calendar</span>
            <h1 className="font-display text-4xl font-bold leading-tight text-navy sm:text-5xl">Find Indian and South Asian events across the Bay Area.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Festivals, founder breakfasts, performances, service days, family outings, and local gatherings reviewed for the community.</p>
            <form action="/events" className="mt-8 flex max-w-xl gap-2 rounded-lg border border-border bg-card p-2 shadow-sm">
              <label className="sr-only" htmlFor="home-search">Search events</label>
              <Search className="ml-2 mt-3 h-5 w-5 text-muted-foreground" />
              <input id="home-search" name="q" placeholder="Search by city, venue, or event" className="focus-ring min-h-11 flex-1 rounded-md bg-transparent px-2 text-sm outline-none" />
              <Button type="submit">Search</Button>
            </form>
          </div>
          <article className="rounded-lg border border-border bg-card p-4 shadow-soft">
            <EventImage src={featured.bannerPath} alt="" />
            <div className="pt-5">
              <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{featured.category}</span>
              <h2 className="mt-3 font-display text-3xl font-semibold text-navy">{featured.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{featured.shortDescription}</p>
              <p className="mt-4 text-sm font-semibold text-navy">{formatEventDate(featured.startsAt)} · {featured.city}</p>
              <Button href={`/events/${featured.slug}`} className="mt-5 gap-2">View Featured <ArrowRight className="h-4 w-4" /></Button>
            </div>
          </article>
        </section>
        <section className="bg-muted py-10">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="font-display text-3xl font-semibold text-navy">Upcoming Events</h2>
                <p className="mt-2 text-muted-foreground">Approved gatherings coming up soon.</p>
              </div>
              <Button href="/events" variant="secondary">Browse All</Button>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => <EventCard event={event} key={event.id} />)}
            </div>
          </div>
        </section>
        <section className="container-page py-10">
          <h2 className="font-display text-3xl font-semibold text-navy">Explore by Category</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {categories.map((category) => <Button href={`/events?category=${encodeURIComponent(category)}`} variant="secondary" key={category}>{category}</Button>)}
          </div>
        </section>
        <section className="bg-navy py-10 text-white">
          <div className="container-page flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold">Bring your event to the community.</h2>
              <p className="mt-2 max-w-2xl text-white/75">Submissions are reviewed before publication so the calendar stays useful, trustworthy, and welcoming.</p>
            </div>
            <Button href="/events/submit">Submit an Event</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
