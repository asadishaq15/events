import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { SubmitEventForm } from "@/components/submit-event-form"

export default function SubmitEventPage() {
  return (
    <>
      <SiteHeader />
      <main className="container-page py-10">
        <h1 className="font-display text-4xl font-semibold text-navy">Submit an Event</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Every submission is reviewed before publication. Approved events appear publicly after an administrator reviews the details.</p>
        <SubmitEventForm />
      </main>
      <Footer />
    </>
  )
}
