"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugPage() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-black py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-2xl shadow-gray-900/20 dark:shadow-2xl dark:shadow-white/10">
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Status:</h3>
                <p className="text-sm text-muted-foreground">{status}</p>
              </div>
              
              <div>
                <h3 className="font-semibold">Session Data:</h3>
                <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto">
                  {JSON.stringify(session, null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 className="font-semibold">Environment Variables:</h3>
                <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto">
                  {JSON.stringify({
                    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
                    ALLOWED_EMAILS: process.env.ALLOWED_EMAILS,
                    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not Set',
                    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not Set',
                  }, null, 2)}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
