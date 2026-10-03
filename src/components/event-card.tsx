import { CalendarDays, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EventImage } from "@/components/event-image"
import type { CommunityEvent } from "@/lib/types"
import { formatEventDate, formatEventTime } from "@/lib/utils"

export function EventCard({ event }: { event: CommunityEvent }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-card p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-soft">
      <EventImage src={event.bannerPath} alt="" />
      <div className="flex flex-1 flex-col gap-4 p-2 pt-4">
        <div>
          <span className="inline-flex rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{event.category}</span>
          <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-navy">{event.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{event.shortDescription}</p>
        </div>
        <dl className="mt-auto grid gap-2 text-sm text-foreground">
          <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" /><span>{formatEventDate(event.startsAt)}</span></div>
          <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /><span>{formatEventTime(event.startsAt)}</span></div>
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /><span>{event.venueName}, {event.city}</span></div>
        </dl>
        <Button href={`/events/${event.slug}`} variant="secondary" className="w-full">View Details</Button>
      </div>
    </article>
  )
}
