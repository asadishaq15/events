import Image from "next/image"
import { CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"

export function EventImage({ src, alt, className, contain = false }: { src?: string; alt: string; className?: string; contain?: boolean }) {
  return (
    <div className={cn("relative aspect-video overflow-hidden rounded-md border border-border bg-muted", className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className={contain ? "object-contain" : "object-cover"} />
      ) : (
        <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#FCFAF6,#F5F0E8)] text-navy">
          <div className="text-center">
            <CalendarDays className="mx-auto mb-3 h-9 w-9 text-primary" />
            <p className="font-display text-xl font-semibold">Bay Area Desis</p>
            <p className="text-sm text-muted-foreground">Event banner coming soon</p>
          </div>
        </div>
      )}
    </div>
  )
}
