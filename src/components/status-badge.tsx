import type { EventStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

const styles: Record<EventStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  pending: "bg-pending/10 text-pending",
  approved: "bg-approved/10 text-approved",
  rejected: "bg-rejected/10 text-rejected",
  archived: "bg-archived/10 text-archived",
}

export function StatusBadge({ status }: { status: EventStatus }) {
  return <span className={cn("inline-flex rounded-md px-2.5 py-1 text-xs font-semibold capitalize", styles[status])}>{status}</span>
}
