import { PortfolioData, Project, SocialMedia } from './models'

// Input sanitization
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return ''
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000) // Limit length
}

export function sanitizeUrl(url: string): string {
  if (typeof url !== 'string') return ''
  
  const sanitized = url.trim()
  
  // Basic URL validation
  try {
    const urlObj = new URL(sanitized)
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return ''
    }
    return sanitized
  } catch {
    return ''
  }
}

// Validation functions
export function validatePortfolioData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data || typeof data !== 'object') {
    errors.push('Invalid data format')
    return { isValid: false, errors }
  }

  // Validate required fields
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required')
  }

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push('Title is required')
  }

  if (!data.description || typeof data.description !== 'string' || data.description.trim().length === 0) {
    errors.push('Description is required')
  }

  // Validate skills array
  if (!Array.isArray(data.skills)) {
    errors.push('Skills must be an array')
  } else if (data.skills.length > 50) {
    errors.push('Too many skills (maximum 50)')
  } else {
    data.skills.forEach((skill: any, index: number) => {
      if (typeof skill !== 'string' || skill.trim().length === 0) {
        errors.push(`Invalid skill at index ${index}`)
      } else if (skill.length > 50) {
        errors.push(`Skill at index ${index} is too long`)
      }
    })
  }

  // Validate social media array
  if (!Array.isArray(data.socialMedia)) {
    errors.push('Social media must be an array')
  } else if (data.socialMedia.length > 20) {
    errors.push('Too many social media links (maximum 20)')
  } else {
    data.socialMedia.forEach((social: any, index: number) => {
      if (!social.platform || typeof social.platform !== 'string') {
        errors.push(`Invalid platform at index ${index}`)
      }
      if (!social.url || typeof social.url !== 'string') {
        errors.push(`Invalid URL at index ${index}`)
      } else if (!sanitizeUrl(social.url)) {
        errors.push(`Invalid URL format at index ${index}`)
      }
    })
  }

  // Validate projects array
  if (!Array.isArray(data.projects)) {
    errors.push('Projects must be an array')
  } else if (data.projects.length > 20) {
    errors.push('Too many projects (maximum 20)')
  } else {
    data.projects.forEach((project: any, index: number) => {
      if (!project.name || typeof project.name !== 'string') {
        errors.push(`Invalid project name at index ${index}`)
      }
      if (!project.description || typeof project.description !== 'string') {
        errors.push(`Invalid project description at index ${index}`)
      }
      if (!Array.isArray(project.technologies)) {
        errors.push(`Invalid technologies at index ${index}`)
      } else if (project.technologies.length > 20) {
        errors.push(`Too many technologies at index ${index}`)
      }
      if (project.link && !sanitizeUrl(project.link)) {
        errors.push(`Invalid project link at index ${index}`)
      }
    })
  }

  return { isValid: errors.length === 0, errors }
}

export function sanitizePortfolioData(data: any): PortfolioData {
  return {
    name: sanitizeString(data.name || ''),
    title: sanitizeString(data.title || ''),
    description: sanitizeString(data.description || ''),
    skills: Array.isArray(data.skills) 
      ? data.skills.map((skill: any) => sanitizeString(skill)).filter(Boolean)
      : [],
    socialMedia: Array.isArray(data.socialMedia)
      ? data.socialMedia.map((social: any) => ({
          platform: sanitizeString(social.platform || ''),
          url: sanitizeUrl(social.url || ''),
          icon: sanitizeString(social.icon || '')
        })).filter(social => social.platform && social.url)
      : [],
    projects: Array.isArray(data.projects)
      ? data.projects.map((project: any) => ({
          name: sanitizeString(project.name || ''),
          description: sanitizeString(project.description || ''),
          technologies: Array.isArray(project.technologies)
            ? project.technologies.map((tech: any) => sanitizeString(tech)).filter(Boolean)
            : [],
          link: project.link ? sanitizeUrl(project.link) : undefined
        })).filter(project => project.name && project.description)
      : []
  }
}
