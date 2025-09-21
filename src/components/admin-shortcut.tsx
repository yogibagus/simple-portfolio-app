"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { signOut } from "next-auth/react"

export function AdminShortcut() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return null
  }

  if (!session) {
    return null
  }

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <Link href="/admin">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 sm:gap-2 hover:bg-primary hover:text-primary-foreground transition-colors text-xs sm:text-sm"
        >
          <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Admin</span>
        </Button>
      </Link>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center gap-1 sm:gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors text-xs sm:text-sm"
      >
        <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline">Logout</span>
      </Button>
    </div>
  )
}
