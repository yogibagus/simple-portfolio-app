import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Check if user is trying to access admin routes
    if (req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname !== '/admin/login' && req.nextUrl.pathname !== '/admin/access-denied') {
      // Check if user has isAllowed property (set in auth callbacks)
      if (!(req.nextauth.token as any)?.isAllowed) {
        return NextResponse.redirect(new URL('/admin/access-denied', req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page and access denied page without authentication
        if (req.nextUrl.pathname === '/admin/login' || req.nextUrl.pathname === '/admin/access-denied') {
          return true
        }
        
        // For other admin routes, require authentication
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return !!token
        }
        
        // Allow all other routes
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*']
}
