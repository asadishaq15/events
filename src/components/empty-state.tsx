import { SearchX } from "lucide-react"

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
      <SearchX className="mx-auto h-10 w-10 text-primary" />
      <h3 className="mt-4 font-display text-2xl font-semibold text-navy">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
