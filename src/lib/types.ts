export type EventStatus = "draft" | "pending" | "approved" | "rejected" | "archived"

export type CommunityEvent = {
  id: string
  slug: string
  title: string
  shortDescription: string
  description: string
  category: string
  startsAt: string
  endsAt?: string
  timezone: string
  venueName: string
  address: string
  city: string
  state: string
  postalCode: string
  organizerName: string
  organizerEmail: string
  organizerPhone?: string
  registrationUrl?: string
  bannerPath?: string
  status: EventStatus
  rejectionReason?: string
  submittedAt: string
  approvedAt?: string
  approvedBy?: string
  createdAt: string
  updatedAt: string
}
