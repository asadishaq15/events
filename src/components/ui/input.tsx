import type { InputHTMLAttributes, LabelHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-semibold text-navy", className)} {...props} />
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("focus-ring min-h-11 w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground shadow-sm", className)} {...props} />
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("focus-ring min-h-28 w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground shadow-sm", className)} {...props} />
}

export function Field({ children }: { children: ReactNode }) {
  return <div className="space-y-2">{children}</div>
}

export function ErrorText({ children }: { children?: ReactNode }) {
  if (!children) return null
  return <p className="text-sm text-rejected">{children}</p>
}
