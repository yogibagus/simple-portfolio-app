"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { PortfolioData, Project, SocialMedia } from "@/lib/models"

export default function EditPortfolio() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    name: "",
    title: "",
    description: "",
    skills: [],
    socialMedia: [],
    projects: []
  })

  const [newSkill, setNewSkill] = useState("")
  const [newProject, setNewProject] = useState<Project>({
    name: "",
    description: "",
    technologies: [],
    link: ""
  })
  const [newTech, setNewTech] = useState("")
  const [newSocialMedia, setNewSocialMedia] = useState<SocialMedia>({
    platform: "",
    url: ""
  })

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
        if (data) {
          setPortfolioData({
            ...data,
            socialMedia: data.socialMedia || []
          })
        }
      }
    } catch (error) {
      console.error('Error fetching portfolio data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      })

      if (response.ok) {
        router.push('/admin')
      } else {
        const errorData = await response.json()
        console.error('Failed to save portfolio data:', errorData)
        alert(`Failed to save: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error saving portfolio data:', error)
      alert('Network error while saving')
    } finally {
      setSaving(false)
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !portfolioData.skills.includes(newSkill.trim())) {
      setPortfolioData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }))
  }

  const addTech = () => {
    if (newTech.trim() && !newProject.technologies.includes(newTech.trim())) {
      setNewProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }))
      setNewTech("")
    }
  }

  const removeTech = (tech: string) => {
    setNewProject(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }))
  }

  const addProject = () => {
    if (newProject.name.trim() && newProject.description.trim()) {
      setPortfolioData(prev => ({
        ...prev,
        projects: [...prev.projects, { ...newProject }]
      }))
      setNewProject({
        name: "",
        description: "",
        technologies: [],
        link: ""
      })
    }
  }

  const removeProject = (index: number) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }))
  }

  const addSocialMedia = () => {
    if (newSocialMedia.platform.trim() && newSocialMedia.url.trim()) {
      setPortfolioData(prev => ({
        ...prev,
        socialMedia: [...(prev.socialMedia || []), { ...newSocialMedia }]
      }))
      setNewSocialMedia({
        platform: "",
        url: ""
      })
    }
  }

  const removeSocialMedia = (index: number) => {
    setPortfolioData(prev => ({
      ...prev,
      socialMedia: (prev.socialMedia || []).filter((_, i) => i !== index)
    }))
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
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Portfolio</h1>
            <p className="text-muted-foreground">Update your portfolio information</p>
          </div>
          <ThemeSwitcher />
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <Card className="shadow-2xl shadow-gray-900/20 dark:shadow-2xl dark:shadow-white/10">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={portfolioData.name}
                  onChange={(e) => setPortfolioData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your name"
                />
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={portfolioData.title}
                  onChange={(e) => setPortfolioData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Your professional title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={portfolioData.description}
                  onChange={(e) => setPortfolioData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Tell us about yourself"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="shadow-2xl shadow-gray-900/20 dark:shadow-2xl dark:shadow-white/10">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card className="shadow-2xl shadow-gray-900/20 dark:shadow-2xl dark:shadow-white/10">
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add New Social Media */}
              <div className="border border-border rounded-lg p-4 space-y-4">
                <h4 className="font-semibold">Add Social Media Link</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="social-platform">Platform</Label>
                    <Input
                      id="social-platform"
                      value={newSocialMedia.platform}
                      onChange={(e) => setNewSocialMedia(prev => ({ ...prev, platform: e.target.value }))}
                      placeholder="e.g., GitHub, LinkedIn, Twitter"
                    />
                  </div>
                  <div>
                    <Label htmlFor="social-url">URL</Label>
                    <Input
                      id="social-url"
                      value={newSocialMedia.url}
                      onChange={(e) => setNewSocialMedia(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>
                <Button 
                  onClick={addSocialMedia} 
                  disabled={!newSocialMedia.platform.trim() || !newSocialMedia.url.trim()}
                >
                  Add Social Media
                </Button>
              </div>

              {/* Existing Social Media */}
              <div className="space-y-4">
                <h4 className="font-semibold">Current Social Media</h4>
                {portfolioData.socialMedia?.map((social, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 bg-card">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-semibold">{social.platform}</h5>
                        <p className="text-sm text-muted-foreground">{social.url}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeSocialMedia(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                {(!portfolioData.socialMedia || portfolioData.socialMedia.length === 0) && (
                  <p className="text-muted-foreground text-sm">No social media links added yet.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card className="shadow-2xl shadow-gray-900/20 dark:shadow-2xl dark:shadow-white/10">
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add New Project */}
              <div className="border border-border rounded-lg p-4 space-y-4">
                <h4 className="font-semibold">Add New Project</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input
                      id="project-name"
                      value={newProject.name}
                      onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Project name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="project-link">Project Link</Label>
                    <Input
                      id="project-link"
                      value={newProject.link}
                      onChange={(e) => setNewProject(prev => ({ ...prev, link: e.target.value }))}
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Project description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="technologies">Technologies</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      id="technologies"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      placeholder="Add technology"
                      onKeyPress={(e) => e.key === 'Enter' && addTech()}
                    />
                    <Button onClick={addTech} size="sm">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {newProject.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
                        {tech}
                        <button
                          onClick={() => removeTech(tech)}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button onClick={addProject} disabled={!newProject.name.trim() || !newProject.description.trim()}>
                  Add Project
                </Button>
              </div>

              {/* Existing Projects */}
              <div className="space-y-4">
                <h4 className="font-semibold">Existing Projects</h4>
                {portfolioData.projects.map((project, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 bg-card">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold">{project.name}</h5>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeProject(index)}
                      >
                        Remove
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                    {project.link && (
                      <p className="text-sm text-primary mb-2">{project.link}</p>
                    )}
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
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button onClick={handleSave} disabled={saving} size="lg">
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button variant="outline" onClick={() => router.push('/admin')} size="lg">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
