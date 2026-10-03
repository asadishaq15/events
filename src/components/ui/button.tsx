import Link from "next/link"
import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string
  variant?: "primary" | "secondary" | "ghost" | "danger"
  children: ReactNode
}

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary: "border border-border bg-card text-navy hover:border-primary hover:text-primary",
  ghost: "text-navy hover:bg-muted",
  danger: "border border-rejected/30 bg-card text-rejected hover:bg-rejected hover:text-white",
}

export function Button({ className, variant = "primary", href, children, ...props }: ButtonProps) {
  const classes = cn(
    "focus-ring inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  )

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
