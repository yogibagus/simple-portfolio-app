"use client"

import { signIn, getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminLogin() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession()
      if (session) {
        router.push('/admin')
      }
    }
    checkSession()
  }, [router])

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await signIn('google', { callbackUrl: '/admin' })
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-black flex items-center justify-center py-8 px-4">
      <Card className="w-full max-w-md shadow-2xl shadow-gray-900/20 dark:shadow-2xl dark:shadow-white/10">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-foreground">
            Admin Login
          </CardTitle>
          <p className="text-muted-foreground">
            Sign in to manage your portfolio
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">
              Only authorized email addresses can access the admin dashboard.
            </p>
          </div>
          
          <Button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? "Signing in..." : "Sign in with Google"}
          </Button>
          
          <div className="text-center">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              ← Back to Portfolio
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
