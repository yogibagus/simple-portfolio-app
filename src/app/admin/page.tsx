"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { PortfolioData, Project, SocialMedia } from "@/lib/models"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/admin/login')
    } else if (status === "authenticated" && session?.user && !(session.user as any).isAllowed) {
      router.push('/admin/access-denied')
    }
  }, [status, session, router])

  useEffect(() => {
    if (session) {
      fetchPortfolioData()
    }
  }, [session])

  const fetchPortfolioData = async () => {
    try {
      const response = await fetch('/api/portfolio')
      if (response.ok) {
        const data = await response.json()
        setPortfolioData(data)
      }
    } catch (error) {
      console.error('Error fetching portfolio data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-black py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your portfolio data</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Current Data Preview */}
        <Card className="mb-8 shadow-2xl shadow-gray-900/20 dark:shadow-2xl dark:shadow-white/10">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Current Portfolio Data
              <Button onClick={fetchPortfolioData} variant="outline" size="sm">
                Refresh
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {portfolioData ? (
              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{portfolioData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Title</p>
                      <p className="font-medium">{portfolioData.title}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="text-sm">{portfolioData.description}</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {portfolioData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                {portfolioData.socialMedia && portfolioData.socialMedia.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Social Media</h3>
                    <div className="space-y-2">
                      {portfolioData.socialMedia.map((social, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="font-medium">{social.platform}:</span>
                          <a 
                            href={social.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 text-sm"
                          >
                            {social.url}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Projects</h3>
                  <div className="space-y-3">
                    {portfolioData.projects.map((project, index) => (
                      <div key={index} className="border border-border rounded-lg p-4 bg-card">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-foreground">{project.name}</h4>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 text-sm"
                            >
                              View →
                            </a>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {portfolioData.updatedAt && (
                  <div className="text-sm text-muted-foreground">
                    Last updated: {new Date(portfolioData.updatedAt).toLocaleString()}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No portfolio data found</p>
                <Button className="mt-4" onClick={() => router.push('/admin/edit')}>
                  Create Portfolio Data
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button onClick={() => router.push('/admin/edit')} size="lg">
            {portfolioData ? 'Edit Portfolio' : 'Create Portfolio'}
          </Button>
          <Button variant="outline" onClick={() => router.push('/')} size="lg">
            View Portfolio
          </Button>
        </div>
      </div>
    </div>
  )
}
