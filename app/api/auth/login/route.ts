import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { sign } from "jsonwebtoken"
import { hash, compare } from "bcrypt"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Mock user data - replace with your database
const users = [
  {
    id: 1,
    email: "operator@example.com",
    // In production, these would be hashed passwords
    password: "$2b$10$8nMJx.p8E6HJ5EtfZvP1S.n.PCUxSLr5QEbMY9qY5nP5jU5Kl5jK2", // "password"
    role: "operator",
    name: "John Operator",
  },
  {
    id: 2,
    email: "maintenance@example.com",
    password: "$2b$10$8nMJx.p8E6HJ5EtfZvP1S.n.PCUxSLr5QEbMY9qY5nP5jU5Kl5jK2", // "password"
    role: "maintenance",
    name: "Mike Maintenance",
  },
  {
    id: 3,
    email: "admin@example.com",
    password: "$2b$10$8nMJx.p8E6HJ5EtfZvP1S.n.PCUxSLr5QEbMY9qY5nP5jU5Kl5jK2", // "password"
    role: "admin",
    name: "Admin User",
  },
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Find user
    const user = users.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // In production, use bcrypt.compare
    // const isValidPassword = await compare(password, user.password)
    const isValidPassword = password === "password" // For development only

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Create token with role information
    const token = sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    )

    // Create the response
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      redirectTo: `/${user.role}/dashboard`,
    })

    // Set HTTP-only cookie in the response
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 1 day
      path: "/",
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