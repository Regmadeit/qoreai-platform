import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

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
    const body = await request.json()

    // Handle demo login
    if (body.isDemo) {
      const demoUser = users[0] // Use operator account for demo
      const { password, ...userWithoutPassword } = demoUser
      
      const token = jwt.sign(userWithoutPassword, JWT_SECRET, {
        expiresIn: "1d"
      })

      // Set cookie
      cookies().set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/'
      })

      return NextResponse.json({
        success: true,
        user: userWithoutPassword,
        token,
        redirectTo: "/operator/dashboard"
      })
    }

    // Validate required fields
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Missing credentials", details: "Email and password are required" },
        { status: 400 }
      )
    }

    // Find user
    const user = users.find(u => u.email === body.email)
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials", details: "Email not found" },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(body.password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials", details: "Incorrect password" },
        { status: 401 }
      )
    }

    // Generate JWT token
    const { password: _, ...userWithoutPassword } = user
    const token = jwt.sign(userWithoutPassword, JWT_SECRET, {
      expiresIn: "1d"
    })

    // Set redirect based on role
    let redirectTo = "/operator/dashboard"
    if (user.role === "manager") redirectTo = "/manager/dashboard"
    if (user.role === "admin") redirectTo = "/admin/dashboard"

    // Set cookie
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    })

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token,
      redirectTo
    })

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: "An unexpected error occurred" },
      { status: 500 }
    )
  }
} 