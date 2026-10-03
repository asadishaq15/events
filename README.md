# Bay Area Desis Events

A standalone Next.js App Router application for discovering, submitting, and administering Indian and South Asian community events in the Bay Area.

## Stack

- Next.js App Router with TypeScript
- Tailwind CSS theme tokens
- shadcn/ui-inspired reusable components
- Lucide icons
- React Hook Form and Zod
- Mock repository behind an `EventRepository` interface

## Routes

- `/` editorial homepage with featured and upcoming events
- `/events` searchable event discovery for approved events only
- `/events/[slug]` public event detail page
- `/events/submit` public event submission form with pending mock confirmation
- `/admin/login` mocked admin login UI
- `/admin` admin dashboard
- `/admin/events` event management table and mobile cards
- `/admin/events/[id]` full submission preview and editable admin form

## Data Architecture

Mock events live in `src/lib/events/repository.ts` behind the `EventRepository` contract. Public methods only return approved events. Admin methods expose all statuses for review workflows.

Supabase is intentionally not connected in this phase. Future integration can replace the mock implementation with Supabase queries and Storage while keeping page and component APIs stable.

## Environment

Copy `.env.example` when Supabase is introduced:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Development

```bash
npm install
npm run dev
npm run build
```

Authentication and uploads are mocked. Do not treat the login screen as secure or uploaded previews as permanent storage.
# events
