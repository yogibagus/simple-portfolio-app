export function isEmailAllowed(email: string): boolean {
  const allowedEmails = process.env.ALLOWED_EMAILS?.split(',').map(email => email.trim()) || []
  return allowedEmails.includes(email)
}

export function getAllowedEmails(): string[] {
  return process.env.ALLOWED_EMAILS?.split(',').map(email => email.trim()) || []
}
