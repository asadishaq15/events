"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Field, Input, Label } from "@/components/ui/input"

export default function AdminLoginPage() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: Replace mocked authentication with Supabase Auth.
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setError("Mock authentication only. Supabase auth is not connected yet.")
    }, 500)
  }

  return (
    <main className="container-page flex min-h-screen items-center justify-center py-10">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-soft">
        <h1 className="font-display text-3xl font-semibold text-navy">Admin Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">Authentication is mocked until Supabase is connected. No real password is embedded.</p>
        <div className="mt-6 grid gap-4">
          <Field><Label htmlFor="email">Email</Label><Input id="email" type="email" required /></Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <div className="flex gap-2">
              <Input id="password" type={show ? "text" : "password"} required />
              <Button type="button" variant="secondary" onClick={() => setShow((value) => !value)}>{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button>
            </div>
          </Field>
          <label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" /> Remember me</label>
          <button className="text-left text-sm font-semibold text-primary" type="button">Forgot password?</button>
          {error && <p className="rounded-md bg-rejected/10 p-3 text-sm text-rejected">{error}</p>}
          <Button disabled={loading} type="submit">{loading ? "Checking..." : "Sign In"}</Button>
        </div>
      </form>
    </main>
  )
}
