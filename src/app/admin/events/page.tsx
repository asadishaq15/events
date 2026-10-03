import { AdminEventsTable } from "@/components/admin-events-table"
import { AdminShell } from "@/components/admin-shell"
import { mockEventRepository } from "@/lib/events/repository"

export default async function AdminEventsPage() {
  const events = await mockEventRepository.listAdminEvents()
  return (
    <AdminShell>
      <h1 className="font-display text-4xl font-semibold text-navy">Event Management</h1>
      <p className="mt-2 text-muted-foreground">Search, filter, review, approve, reject, and archive submissions.</p>
      <AdminEventsTable events={events} />
    </AdminShell>
  )
}
