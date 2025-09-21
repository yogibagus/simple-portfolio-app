import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getPortfolioData, updatePortfolioData, PortfolioData } from '@/lib/models'
import { isEmailAllowed } from '@/lib/auth-utils'
import { apiRateLimit, strictRateLimit } from '@/lib/rate-limit'
import { validatePortfolioData, sanitizePortfolioData } from '@/lib/validation'
import clientPromise from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = apiRateLimit(request)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    const data = await getPortfolioData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching portfolio data:', error)
    return NextResponse.json({ error: 'Failed to fetch portfolio data' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Apply strict rate limiting for write operations
    const rateLimitResult = strictRateLimit(request)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if email is allowed
    if (!isEmailAllowed(session.user.email)) {
      return NextResponse.json({ error: 'Access denied - email not authorized' }, { status: 403 })
    }

    const rawData = await request.json()
    
    // Validate input data
    const validation = validatePortfolioData(rawData)
    if (!validation.isValid) {
      return NextResponse.json({ 
        error: 'Invalid data', 
        details: validation.errors 
      }, { status: 400 })
    }

    // Sanitize data
    const sanitizedData = sanitizePortfolioData(rawData)

    const success = await updatePortfolioData(sanitizedData)
    
    if (success) {
      return NextResponse.json({ message: 'Portfolio data updated successfully' })
    } else {
      return NextResponse.json({ error: 'Failed to update portfolio data' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error updating portfolio data:', error)
    return NextResponse.json({ error: 'Failed to update portfolio data' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Apply strict rate limiting for delete operations
    const rateLimitResult = strictRateLimit(request)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if email is allowed
    if (!isEmailAllowed(session.user.email)) {
      return NextResponse.json({ error: 'Access denied - email not authorized' }, { status: 403 })
    }

    const client = await clientPromise
    const db = client.db('portfolio')
    const collection = db.collection('portfolio')
    
    await collection.deleteMany({})
    
    return NextResponse.json({ message: 'Portfolio data cleared successfully' })
  } catch (error) {
    console.error('Error clearing portfolio data:', error)
    return NextResponse.json({ error: 'Failed to clear portfolio data' }, { status: 500 })
  }
}
