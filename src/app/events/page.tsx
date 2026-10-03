import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { EventsExplorer } from "@/components/events-explorer"
import { mockEventRepository } from "@/lib/events/repository"

export default async function EventsPage() {
  const events = await mockEventRepository.listApprovedEvents()
  return (
    <>
      <SiteHeader />
      <main className="container-page py-10">
        <h1 className="font-display text-4xl font-semibold text-navy">Discover Events</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Search approved Indian and South Asian events by title, category, city, venue, or timing.</p>
        <EventsExplorer events={events} />
      </main>
      <Footer />
    </>
  )
}
