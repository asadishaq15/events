"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Upload, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { ErrorText, Field, Input, Label, Textarea } from "@/components/ui/input"

const schema = z.object({
  title: z.string().min(3, "Enter an event title."),
  shortDescription: z.string().min(12, "Add a short description."),
  description: z.string().min(30, "Add a fuller description."),
  category: z.string().min(1, "Choose a category."),
  startsAt: z.string().min(1, "Choose a start date and time."),
  endsAt: z.string().optional(),
  timezone: z.string().min(1, "Enter a timezone."),
  venueName: z.string().min(2, "Enter a venue."),
  address: z.string().min(4, "Enter a street address."),
  city: z.string().min(2, "Enter a city."),
  state: z.string().min(2, "Enter a state."),
  postalCode: z.string().min(5, "Enter a ZIP code."),
  organizerName: z.string().min(2, "Enter organizer name."),
  organizerEmail: z.string().email("Enter a valid email."),
  organizerPhone: z.string().optional(),
  registrationUrl: z.string().url("Enter a valid URL.").optional().or(z.literal("")),
})

type FormValues = z.infer<typeof schema>
const sections = ["Basic information", "Schedule", "Location", "Organizer", "Registration", "Event banner", "Review and submit"]

export function SubmitEventForm() {
  const [preview, setPreview] = useState<string>()
  const [submittedId, setSubmittedId] = useState<string>()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { timezone: "America/Los_Angeles", state: "CA" } })

  function onSubmit() {
    setSubmittedId(`mock-${Math.floor(Math.random() * 90000 + 10000)}`)
  }

  if (submittedId) {
    return (
      <section className="mt-8 rounded-lg border border-approved/30 bg-approved/5 p-8">
        <h2 className="font-display text-3xl font-semibold text-navy">Submission received</h2>
        <p className="mt-3 text-muted-foreground">Your event was created with status pending and will be reviewed before publication.</p>
        <p className="mt-4 font-semibold text-approved">Mock submission ID: {submittedId}</p>
        <Button href="/events" className="mt-6">Back to Events</Button>
      </section>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-6">
      <div className="flex flex-wrap gap-2">{sections.map((section, index) => <span className="rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground" key={section}>{index + 1}. {section}</span>)}</div>
      <FormSection title="Basic information">
        <Field><Label htmlFor="title">Event title</Label><Input id="title" {...register("title")} /><ErrorText>{errors.title?.message}</ErrorText></Field>
        <Field><Label htmlFor="shortDescription">Short description</Label><Input id="shortDescription" {...register("shortDescription")} /><ErrorText>{errors.shortDescription?.message}</ErrorText></Field>
        <Field><Label htmlFor="description">Full description</Label><Textarea id="description" {...register("description")} /><ErrorText>{errors.description?.message}</ErrorText></Field>
        <Field><Label htmlFor="category">Category</Label><Input id="category" {...register("category")} placeholder="Festivals, Networking, Food..." /><ErrorText>{errors.category?.message}</ErrorText></Field>
      </FormSection>
      <FormSection title="Schedule">
        <Field><Label htmlFor="startsAt">Start date and time</Label><Input id="startsAt" type="datetime-local" {...register("startsAt")} /><ErrorText>{errors.startsAt?.message}</ErrorText></Field>
        <Field><Label htmlFor="endsAt">End date and time</Label><Input id="endsAt" type="datetime-local" {...register("endsAt")} /></Field>
        <Field><Label htmlFor="timezone">Timezone</Label><Input id="timezone" {...register("timezone")} /><ErrorText>{errors.timezone?.message}</ErrorText></Field>
      </FormSection>
      <FormSection title="Location">
        <Field><Label htmlFor="venueName">Venue name</Label><Input id="venueName" {...register("venueName")} /><ErrorText>{errors.venueName?.message}</ErrorText></Field>
        <Field><Label htmlFor="address">Street address</Label><Input id="address" {...register("address")} /><ErrorText>{errors.address?.message}</ErrorText></Field>
        <Field><Label htmlFor="city">City</Label><Input id="city" {...register("city")} /><ErrorText>{errors.city?.message}</ErrorText></Field>
        <Field><Label htmlFor="state">State</Label><Input id="state" {...register("state")} /><ErrorText>{errors.state?.message}</ErrorText></Field>
        <Field><Label htmlFor="postalCode">ZIP code</Label><Input id="postalCode" {...register("postalCode")} /><ErrorText>{errors.postalCode?.message}</ErrorText></Field>
      </FormSection>
      <FormSection title="Organizer">
        <Field><Label htmlFor="organizerName">Organizer name</Label><Input id="organizerName" {...register("organizerName")} /><ErrorText>{errors.organizerName?.message}</ErrorText></Field>
        <Field><Label htmlFor="organizerEmail">Organizer email</Label><Input id="organizerEmail" type="email" {...register("organizerEmail")} /><ErrorText>{errors.organizerEmail?.message}</ErrorText></Field>
        <Field><Label htmlFor="organizerPhone">Organizer phone</Label><Input id="organizerPhone" {...register("organizerPhone")} /></Field>
      </FormSection>
      <FormSection title="Registration">
        <Field><Label htmlFor="registrationUrl">Registration URL</Label><Input id="registrationUrl" {...register("registrationUrl")} /><ErrorText>{errors.registrationUrl?.message}</ErrorText></Field>
      </FormSection>
      <FormSection title="Event banner">
        <div className="rounded-lg border border-dashed border-border bg-muted p-6">
          {preview ? <img src={preview} alt="Banner preview" className="aspect-video w-full rounded-md object-cover" /> : <div className="flex aspect-video items-center justify-center rounded-md bg-card text-center"><div><Upload className="mx-auto h-8 w-8 text-primary" /><p className="mt-2 text-sm text-muted-foreground">JPEG, PNG, or WebP. Max 5 MB. Recommended 16:9.</p></div></div>}
          <div className="mt-4 flex gap-2">
            {/* TODO: Replace preview-only uploads with Supabase Storage-backed persistence. */}
            <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => { const file = event.target.files?.[0]; if (file) setPreview(URL.createObjectURL(file)) }} />
            {preview && <Button type="button" variant="secondary" onClick={() => setPreview(undefined)}><X className="h-4 w-4" /> Remove</Button>}
          </div>
        </div>
      </FormSection>
      <section className="rounded-lg border border-border bg-card p-5">
        <h2 className="font-display text-2xl font-semibold text-navy">Review and submit</h2>
        <p className="mt-2 text-sm text-muted-foreground">This mock flow creates a pending submission. Visitors cannot set or change publication status.</p>
        <Button disabled={isSubmitting} className="mt-5" type="submit">{isSubmitting ? "Submitting..." : "Submit for Review"}</Button>
      </section>
    </form>
  )
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-border bg-card p-5">
      <h2 className="font-display text-2xl font-semibold text-navy">{title}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  )
}
