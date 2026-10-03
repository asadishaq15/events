import { Archive, Check, Save, X } from "lucide-react"
import { notFound } from "next/navigation"
import { AdminShell } from "@/components/admin-shell"
import { EventImage } from "@/components/event-image"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Field, Input, Label, Textarea } from "@/components/ui/input"
import { mockEventRepository } from "@/lib/events/repository"
import { formatEventDate, formatEventTime } from "@/lib/utils"

export default async function AdminEventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = await mockEventRepository.getEventById(id)
  if (!event) notFound()

  return (
    <AdminShell>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <div className="flex items-center gap-3"><StatusBadge status={event.status} /><span className="text-sm text-muted-foreground">Submission #{event.id}</span></div>
          <h1 className="mt-3 font-display text-4xl font-semibold text-navy">{event.title}</h1>
          <p className="mt-2 text-muted-foreground">{event.shortDescription}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary"><Save className="h-4 w-4" /> Save Changes</Button>
          <Button variant="secondary"><Check className="h-4 w-4" /> Approve</Button>
          <Button variant="secondary"><X className="h-4 w-4" /> Reject</Button>
          <Button variant="danger"><Archive className="h-4 w-4" /> Archive</Button>
        </div>
      </div>
      <p className="mt-4 rounded-md border border-pending/30 bg-pending/10 p-3 text-sm text-pending">Status-changing actions require confirmation in the production Supabase-backed workflow. Rejection includes a reason dialog.</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <section className="grid gap-6">
          <EventImage src={event.bannerPath} alt="" />
          <form className="grid gap-6 rounded-lg border border-border bg-card p-5">
            <h2 className="font-display text-2xl font-semibold text-navy">Editable event form</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Field><Label htmlFor="title">Title</Label><Input id="title" defaultValue={event.title} /></Field>
              <Field><Label htmlFor="category">Category</Label><Input id="category" defaultValue={event.category} /></Field>
              <Field><Label htmlFor="short">Short description</Label><Input id="short" defaultValue={event.shortDescription} /></Field>
              <Field><Label htmlFor="starts">Start</Label><Input id="starts" defaultValue={event.startsAt} /></Field>
              <Field><Label htmlFor="venue">Venue</Label><Input id="venue" defaultValue={event.venueName} /></Field>
              <Field><Label htmlFor="city">City</Label><Input id="city" defaultValue={event.city} /></Field>
              <Field><Label htmlFor="organizer">Organizer</Label><Input id="organizer" defaultValue={event.organizerName} /></Field>
              <Field><Label htmlFor="email">Organizer email</Label><Input id="email" defaultValue={event.organizerEmail} /></Field>
              <div className="md:col-span-2"><Field><Label htmlFor="description">Full description</Label><Textarea id="description" defaultValue={event.description} /></Field></div>
            </div>
          </form>
        </section>
        <aside className="space-y-5">
          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="font-display text-2xl font-semibold text-navy">Submission Details</h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <Row label="Event date" value={`${formatEventDate(event.startsAt)} ${formatEventTime(event.startsAt)}`} />
              <Row label="Submitted" value={formatEventDate(event.submittedAt)} />
              <Row label="Approved" value={event.approvedAt ? formatEventDate(event.approvedAt) : "Not approved"} />
              <Row label="Created" value={formatEventDate(event.createdAt)} />
              <Row label="Updated" value={formatEventDate(event.updatedAt)} />
              <Row label="Approved by" value={event.approvedBy ?? "None"} />
              {event.rejectionReason && <Row label="Rejection reason" value={event.rejectionReason} />}
            </dl>
          </div>
          <div className="rounded-lg border border-rejected/30 bg-card p-5">
            <h2 className="font-display text-2xl font-semibold text-rejected">Destructive actions</h2>
            <p className="mt-2 text-sm text-muted-foreground">Deletion is intentionally separated from normal edits and should require confirmation.</p>
            <Button variant="danger" className="mt-4 w-full">Delete Event</Button>
          </div>
        </aside>
      </div>
    </AdminShell>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-4 border-b border-border pb-2"><dt className="text-muted-foreground">{label}</dt><dd className="text-right font-medium text-navy">{value}</dd></div>
}
