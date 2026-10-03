export default function Loading() {
  return (
    <div className="container-page grid gap-5 py-10 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="h-96 animate-pulse rounded-lg border border-border bg-card" key={index} />
      ))}
    </div>
  )
}
