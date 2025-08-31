"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <div className="flex flex-col items-center gap-4">
        <AlertTriangle className="w-12 h-12 text-muted-foreground" />
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p className="text-muted-foreground max-w-sm">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </div>
  )
}
