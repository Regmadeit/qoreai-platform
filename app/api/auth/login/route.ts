import { NextResponse } from "next/server"
import { sign } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Mock user data - replace with your database
const users = [
  {
    id: 1,
    email: "operator@example.com",
    password: "password123", // For demo purposes
    role: "operator",
    name: "John Operator",
  },
  {
    id: 2,
    email: "maintenance@example.com",
    password: "password123",
    role: "maintenance",
    name: "Mike Maintenance",
  },
  {
    id: 3,
    email: "admin@example.com",
    password: "password123",
    role: "admin",
    name: "Admin User",
  },
]

export async function POST(request: Request) {
  try {
    // Check if request is empty
    const contentType = request.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json" },
        { status: 400 }
      )
    }

    const text = await request.text()
    if (!text) {
      return NextResponse.json(
        { error: "Request body is empty" },
        { status: 400 }
      )
    }

    let body
    try {
      body = JSON.parse(text)
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      )
    }

    const { email, password, isDemo } = body

    // For demo mode, use operator account
    if (isDemo) {
      const demoUser = users[0] // operator account
      const token = sign(
        {
          id: demoUser.id,
          email: demoUser.email,
          role: demoUser.role,
          name: demoUser.name,
          isDemo: true
        },
        JWT_SECRET,
        { expiresIn: "1d" }
      )

      return NextResponse.json({
        token,
        user: {
          id: demoUser.id,
          email: demoUser.email,
          role: demoUser.role,
          name: demoUser.name,
          isDemo: true
        },
        redirectTo: `/operator/dashboard`,
      })
    }

    // Regular login
    const user = users.find((u) => u.email === email)
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const token = sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        isDemo: false
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    )

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        isDemo: false
      },
      redirectTo: `/${user.role}/dashboard`,
    })

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 