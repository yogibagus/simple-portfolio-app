import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Linkedin, Github, Twitter, Mail, Globe, Instagram, Youtube, Facebook, MessageCircle, ExternalLink } from "lucide-react"

interface Project {
  name: string
  description: string
  technologies: string[]
  link?: string
}

interface SocialMedia {
  platform: string
  url: string
  icon?: string
}

interface PortfolioCardProps {
  name: string
  title: string
  description: string
  skills: string[]
  projects: Project[]
  socialMedia: SocialMedia[]
}

export function PortfolioCard({ 
  name, 
  title, 
  description, 
  skills, 
  projects,
  socialMedia 
}: PortfolioCardProps) {
  const getSocialIcon = (platform: string) => {
    const platformLower = platform.toLowerCase().trim()
    
    switch (platformLower) {
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />
      case 'github':
        return <Github className="h-4 w-4" />
      case 'twitter':
      case 'x':
        return <Twitter className="h-4 w-4" />
      case 'email':
      case 'mail':
        return <Mail className="h-4 w-4" />
      case 'instagram':
        return <Instagram className="h-4 w-4" />
      case 'youtube':
        return <Youtube className="h-4 w-4" />
      case 'facebook':
        return <Facebook className="h-4 w-4" />
      case 'telegram':
      case 'whatsapp':
      case 'discord':
        return <MessageCircle className="h-4 w-4" />
      case 'website':
      case 'portfolio':
      case 'blog':
        return <ExternalLink className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl shadow-gray-900/20 dark:shadow-2xl dark:shadow-white/10">
      <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
        <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {name}
        </CardTitle>
        <p className="text-base sm:text-lg text-muted-foreground font-medium">
          {title}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
        {/* Description */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">About Me</h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Skills</h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

            {/* Social Media */}
            {socialMedia && socialMedia.length > 0 && (
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Connect With Me</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
              {socialMedia.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex items-center gap-1.5 sm:gap-2 hover:bg-primary hover:text-primary-foreground transition-colors text-xs sm:text-sm"
                >
                  <a 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    {getSocialIcon(social.platform)}
                    {social.platform}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}

            {/* Projects */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Projects</h3>
              <div className="space-y-3 sm:space-y-4">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="border border-border rounded-lg p-3 sm:p-4 hover:shadow-lg hover:shadow-gray-900/10 dark:hover:shadow-xl dark:hover:shadow-white/5 transition-shadow bg-card shadow-sm shadow-gray-900/5 dark:shadow-md dark:shadow-white/5"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1 sm:gap-0">
                  <h4 className="text-base sm:text-lg font-semibold text-foreground">
                    {project.name}
                  </h4>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 text-xs sm:text-sm font-medium"
                    >
                      View Project →
                    </a>
                  )}
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-2 sm:mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="outline" 
                      className="text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
