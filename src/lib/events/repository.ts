import type { CommunityEvent, EventStatus } from "@/lib/types"

export type EventRepository = {
  listApprovedEvents: () => Promise<CommunityEvent[]>
  listAdminEvents: () => Promise<CommunityEvent[]>
  getEventBySlug: (slug: string) => Promise<CommunityEvent | null>
  getEventById: (id: string) => Promise<CommunityEvent | null>
  createEvent: (event: Omit<CommunityEvent, "id" | "slug" | "status" | "submittedAt" | "createdAt" | "updatedAt">) => Promise<CommunityEvent>
  updateEvent: (id: string, event: Partial<CommunityEvent>) => Promise<CommunityEvent | null>
  approveEvent: (id: string) => Promise<CommunityEvent | null>
  rejectEvent: (id: string, rejectionReason: string) => Promise<CommunityEvent | null>
  archiveEvent: (id: string) => Promise<CommunityEvent | null>
}

const now = "2026-10-03T12:00:00-07:00"

const events: CommunityEvent[] = [
  event("1", "diwali-lights-at-lake-merritt", "Diwali Lights at Lake Merritt", "An evening of diyas, music, food stalls, and family-friendly performances by the water.", "A warm community celebration with classical performances, food vendors, rangoli artists, and a lakeside diya ceremony. Families, friends, and newcomers are invited to gather for a polished evening that feels festive without feeling crowded.", "Festivals", "2026-11-07T18:00:00-08:00", "2026-11-07T21:30:00-08:00", "Lake Merritt Amphitheater", "Lake Merritt Blvd", "Oakland", "approved", "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?auto=format&fit=crop&w=1400&q=80"),
  event("2", "south-asian-founders-breakfast", "South Asian Founders Breakfast", "A focused morning for founders, operators, and investors building in the Bay Area.", "Join a curated room of South Asian founders for practical conversation on fundraising, hiring, and building durable companies. Includes moderated introductions and a light vegetarian breakfast.", "Business", "2026-10-16T08:30:00-07:00", "2026-10-16T10:30:00-07:00", "Canopy Jackson Square", "595 Pacific Ave", "San Francisco", "approved", "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80"),
  event("3", "garba-night-san-jose", "Garba Night San Jose", "Live dhol, community garba, and late-night snacks in a welcoming all-ages setting.", "A high-energy garba and dandiya night with live musicians, beginner-friendly circles, and food from local vendors. Traditional attire encouraged.", "Music and Dance", "2026-10-24T19:00:00-07:00", "2026-10-25T00:00:00-07:00", "San Jose Convention Center", "150 W San Carlos St", "San Jose", "approved", "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1400&q=80"),
  event("4", "chaat-and-chai-trail", "Chaat and Chai Trail", "A guided food walk through Fremont favorites with tasting stops and local stories.", "Explore beloved South Asian food businesses with a small group, tasting pani puri, kathi rolls, mithai, and masala chai while meeting the owners behind the counters.", "Food", "2026-10-18T14:00:00-07:00", "2026-10-18T17:00:00-07:00", "Fremont Hub", "39100 Argonaut Way", "Fremont", "approved", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1400&q=80"),
  event("5", "youth-cricket-clinic", "Youth Cricket Clinic", "Coaching, drills, and friendly matches for ages 8 to 15.", "Volunteer coaches lead fundamentals, batting practice, bowling drills, and short matches. Gear is available for first-time players.", "Sports", "2026-10-31T09:00:00-07:00", "2026-10-31T12:00:00-07:00", "Central Park Cricket Field", "40000 Paseo Padre Pkwy", "Fremont", "approved", "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1400&q=80"),
  event("6", "temple-community-seva-day", "Temple Community Seva Day", "A volunteer morning supporting meal prep, pantry sorting, and neighborhood outreach.", "Community members are invited to help prepare meals, organize pantry donations, and support distribution teams serving local families.", "Community Service", "2026-11-14T08:00:00-08:00", "2026-11-14T12:00:00-08:00", "Sunnyvale Hindu Temple", "450 Persian Dr", "Sunnyvale", "approved", "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1400&q=80"),
  event("7", "college-admissions-family-forum", "College Admissions Family Forum", "Counselors and alumni discuss applications, essays, affordability, and family expectations.", "A practical education forum for high school students and parents, featuring admissions counselors, recent alumni, and breakout Q&A tables.", "Education", "2026-11-01T15:00:00-07:00", "2026-11-01T17:30:00-07:00", "Cupertino Library", "10800 Torre Ave", "Cupertino", "approved", undefined),
  event("8", "desi-family-picnic", "Desi Family Picnic", "Games, music, potluck tables, and relaxed community connection for all ages.", "A low-pressure family afternoon with lawn games, picnic blankets, kids activities, and shared snacks from across South Asian kitchens.", "Family", "2026-10-11T11:00:00-07:00", "2026-10-11T15:00:00-07:00", "Mitchell Park", "600 E Meadow Dr", "Palo Alto", "approved", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80"),
  event("9", "kathak-studio-showcase", "Kathak Studio Showcase", "An intimate student performance followed by artist conversation.", "Students and teachers present new Kathak pieces in a seated studio format with a post-performance conversation about rhythm, storytelling, and practice.", "Music and Dance", "2026-09-12T18:00:00-07:00", "2026-09-12T20:00:00-07:00", "Mission Dance Theater", "3316 24th St", "San Francisco", "approved", "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=1400&q=80"),
  event("10", "women-in-tech-mixer", "Women in Tech Mixer", "A pending networking evening for South Asian women and allies in product and engineering.", "Submitted for review: a structured mixer with mentor tables and lightning talks.", "Networking", "2026-11-20T18:00:00-08:00", "2026-11-20T20:00:00-08:00", "The Assembly", "449 14th St", "Oakland", "pending", undefined),
  event("11", "holi-color-run-proposal", "Holi Color Run Proposal", "A rejected outdoor run submission missing safety and permit details.", "Rejected pending permit documentation and route safety details.", "Festivals", "2027-03-21T09:00:00-07:00", "2027-03-21T11:00:00-07:00", "Baylands Park", "999 E Caribbean Dr", "Sunnyvale", "rejected", undefined, "Permit documentation required before publication."),
  event("12", "archived-bollywood-quiz-night", "Archived Bollywood Quiz Night", "A past quiz night retained in admin records.", "Archived after event completion.", "Family", "2026-08-08T19:00:00-07:00", "2026-08-08T21:00:00-07:00", "Redwood City Library", "1044 Middlefield Rd", "Redwood City", "archived", undefined),
]

function event(id: string, slug: string, title: string, shortDescription: string, description: string, category: string, startsAt: string, endsAt: string | undefined, venueName: string, address: string, city: string, status: EventStatus, bannerPath?: string, rejectionReason?: string): CommunityEvent {
  return {
    id,
    slug,
    title,
    shortDescription,
    description,
    category,
    startsAt,
    endsAt,
    timezone: "America/Los_Angeles",
    venueName,
    address,
    city,
    state: "CA",
    postalCode: "94536",
    organizerName: "Bay Area Desis Collective",
    organizerEmail: "events@bayareadesis.example",
    organizerPhone: "(510) 555-0147",
    registrationUrl: "https://example.com/register",
    bannerPath,
    status,
    rejectionReason,
    submittedAt: now,
    approvedAt: status === "approved" ? now : undefined,
    approvedBy: status === "approved" ? "Mock Admin" : undefined,
    createdAt: now,
    updatedAt: now,
  }
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export const mockEventRepository: EventRepository = {
  // TODO: Replace the in-memory mock repository with Supabase queries and storage metadata.
  async listApprovedEvents() {
    return events.filter((event) => event.status === "approved").sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt))
  },
  async listAdminEvents() {
    return [...events].sort((a, b) => +new Date(b.submittedAt) - +new Date(a.submittedAt))
  },
  async getEventBySlug(slug) {
    return events.find((event) => event.slug === slug && event.status === "approved") ?? null
  },
  async getEventById(id) {
    return events.find((event) => event.id === id) ?? null
  },
  async createEvent(input) {
    const created: CommunityEvent = {
      ...input,
      id: `mock-${Date.now()}`,
      slug: slugify(input.title),
      status: "pending",
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    events.unshift(created)
    return created
  },
  async updateEvent(id, input) {
    const index = events.findIndex((event) => event.id === id)
    if (index < 0) return null
    events[index] = { ...events[index], ...input, updatedAt: new Date().toISOString() }
    return events[index]
  },
  async approveEvent(id) {
    return this.updateEvent(id, { status: "approved", approvedAt: new Date().toISOString(), approvedBy: "Mock Admin" })
  },
  async rejectEvent(id, rejectionReason) {
    return this.updateEvent(id, { status: "rejected", rejectionReason })
  },
  async archiveEvent(id) {
    return this.updateEvent(id, { status: "archived" })
  },
}
