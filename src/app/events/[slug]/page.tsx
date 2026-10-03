import { CalendarPlus, Clock, MapPin, Share2 } from "lucide-react"
import { notFound } from "next/navigation"
import { EventCard } from "@/components/event-card"
import { EventImage } from "@/components/event-image"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { mockEventRepository } from "@/lib/events/repository"
import { formatEventDate, formatEventTime } from "@/lib/utils"

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await mockEventRepository.getEventBySlug(slug)
  if (!event) notFound()
  const related = (await mockEventRepository.listApprovedEvents()).filter((item) => item.id !== event.id && item.category === event.category).slice(0, 3)

  return (
    <>
      <SiteHeader />
      <main>
        <section className="container-page py-8">
          <EventImage src={event.bannerPath} alt="" className="rounded-lg" />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <article>
              <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{event.category} · Approved event</span>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-navy">{event.title}</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">{event.shortDescription}</p>
              <div className="mt-6 grid gap-3 rounded-lg border border-border bg-card p-4 sm:grid-cols-2">
                <p className="flex gap-2"><Clock className="h-5 w-5 text-primary" /> {formatEventDate(event.startsAt)} at {formatEventTime(event.startsAt)}</p>
                <p className="flex gap-2"><MapPin className="h-5 w-5 text-primary" /> {event.venueName}, {event.city}</p>
                <p className="text-sm text-muted-foreground">Timezone: {event.timezone}</p>
                <p className="text-sm text-muted-foreground">{event.address}, {event.city}, {event.state} {event.postalCode}</p>
              </div>
              <div className="mt-8 max-w-3xl">
                <h2 className="font-display text-2xl font-semibold text-navy">About this event</h2>
                <p className="mt-3 leading-8 text-foreground">{event.description}</p>
                <h2 className="mt-8 font-display text-2xl font-semibold text-navy">Organizer</h2>
                <p className="mt-3 text-muted-foreground">{event.organizerName} · {event.organizerEmail}</p>
              </div>
            </article>
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
                <p className="font-display text-2xl font-semibold text-navy">{formatEventDate(event.startsAt)}</p>
                <p className="mt-1 text-sm text-muted-foreground">{formatEventTime(event.startsAt)} · {event.city}</p>
                <Button href={event.registrationUrl ?? "#"} className="mt-5 w-full">Register</Button>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Button variant="secondary" className="gap-2"><CalendarPlus className="h-4 w-4" /> Calendar</Button>
                  <Button variant="secondary" className="gap-2"><Share2 className="h-4 w-4" /> Share</Button>
                </div>
              </div>
            </aside>
          </div>
        </section>
        {related.length > 0 && (
          <section className="bg-muted py-10">
            <div className="container-page">
              <h2 className="font-display text-3xl font-semibold text-navy">Related Events</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <EventCard event={item} key={item.id} />)}</div>
            </div>
          </section>
        )}
      </main>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card p-3 shadow-soft lg:hidden"><Button href={event.registrationUrl ?? "#"} className="w-full">Register for Event</Button></div>
      <Footer />
    </>
  )
}
