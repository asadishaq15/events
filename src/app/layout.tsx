import type { Metadata } from "next"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: "Bay Area Desis Events",
  description: "Discover Indian and South Asian community events across the Bay Area.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
