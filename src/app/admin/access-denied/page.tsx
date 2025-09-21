"use client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { AlertTriangle } from "lucide-react"

export default function AccessDenied() {
  const router = useRouter()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-black flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex justify-end mb-6">
          <ThemeSwitcher />
        </div>

        <Card className="shadow-2xl shadow-gray-900/20 dark:shadow-2xl dark:shadow-white/10">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-16 w-16 text-destructive" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Access Denied
            </CardTitle>
            <p className="text-muted-foreground">
              Your email address is not authorized to access the admin dashboard.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Only authorized email addresses can access the admin panel. 
                Please contact the administrator if you believe this is an error.
              </p>
            </div>
            
            <div className="space-y-2">
              <Button onClick={handleSignOut} className="w-full" variant="outline">
                Sign Out
              </Button>
              <Button onClick={() => router.push('/')} className="w-full">
                Back to Portfolio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
