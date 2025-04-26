import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { rateLimit } from '@/lib/rate-limit'

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500
})

// Mock user data with hashed passwords
const users = [
  {
    id: 1,
    email: "operator@example.com",
    // hashed version of 'password123'
    password: "$2a$10$XQxKGKJ4kE/wx.gUrRQGzOZcQ9KxF3vN7W9j5YgG4h.W9C.6.dKxO",
    role: "operator",
    name: "John Operator"
  },
  {
    id: 2,
    email: "manager@example.com",
    password: "$2a$10$XQxKGKJ4kE/wx.gUrRQGzOZcQ9KxF3vN7W9j5YgG4h.W9C.6.dKxO",
    role: "manager",
    name: "Jane Manager"
  },
  {
    id: 3,
    email: "admin@example.com",
    password: "$2a$10$XQxKGKJ4kE/wx.gUrRQGzOZcQ9KxF3vN7W9j5YgG4h.W9C.6.dKxO",
    role: "admin",
    name: "Admin User"
  }
]

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
  try {
    // Rate limiting
    try {
      await limiter.check(request, 10, 'CACHE_TOKEN') // 10 requests per minute
    } catch {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }

    // CSRF Protection - using headers instead of cookies for now
    const csrfToken = request.headers.get("x-csrf-token")
    if (!csrfToken) {
      return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 })
    }

    // Check content type
    const contentType = request.headers.get("content-type")
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Content type must be application/json" },
        { status: 415 }
      )
    }

    const body = await request.json()

    // Handle demo login
    if (body.isDemo) {
      const demoUser = users[0] // Use operator account for demo
      const { password, ...userWithoutPassword } = demoUser
      
      const token = jwt.sign(userWithoutPassword, JWT_SECRET, {
        expiresIn: "1d"
      })

      // Create response with cookie
      const response = NextResponse.json({
        user: userWithoutPassword,
        token,
        redirectTo: "/operator/dashboard"
      })

      // Set cookie in response
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/'
      })

      return response
    }

    // Validate required fields
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Find user
    const user = users.find(u => u.email === body.email)
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Check password using bcrypt
    const isValidPassword = await bcrypt.compare(body.password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Generate JWT token
    const { password, ...userWithoutPassword } = user
    const token = jwt.sign(userWithoutPassword, JWT_SECRET, {
      expiresIn: "1d"
    })

    // Set redirect based on role
    let redirectTo = "/operator/dashboard"
    if (user.role === "manager") redirectTo = "/manager/dashboard"
    if (user.role === "admin") redirectTo = "/admin/dashboard"

    // Create response with cookie
    const response = NextResponse.json({
      user: userWithoutPassword,
      token,
      redirectTo
    })

    // Set cookie in response
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    })

    return response

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 