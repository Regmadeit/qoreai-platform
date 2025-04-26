"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Lock, PlayCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (!formData.email || !formData.password) {
        throw new Error("Please fill in all fields")
      }

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          isDemo: false
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Invalid credentials")
      }

      localStorage.setItem('user', JSON.stringify(data.user))
      
      router.refresh()
      router.push(data.redirectTo)
    } catch (err) {
      console.error("Login error:", err)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          isDemo: true
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Demo login failed")
      }

      localStorage.setItem('user', JSON.stringify(data.user))
      
      router.refresh()
      router.push(data.redirectTo)
    } catch (err) {
      console.error("Demo login error:", err)
      setError(err instanceof Error ? err.message : "Demo login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center qore-gradient px-4 py-12">
      <Card className="w-full max-w-md bg-card/95 backdrop-blur">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-xl bg-qore-blue shadow-lg"></div>
              <div className="absolute bottom-0 right-0 h-6 w-6 bg-qore-gold transform rotate-45"></div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to QoreAI</CardTitle>
          <CardDescription>
            Enter your credentials or try demo mode
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-destructive/90 text-destructive-foreground border-none">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="qore-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="qore-input"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              className="w-full bg-qore-blue hover:bg-qore-blue/90 text-white" 
              type="submit" 
              disabled={isLoading}
            >
              <Lock className="mr-2 h-4 w-4" />
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <Button 
              type="button"
              variant="secondary"
              className="w-full hover:bg-secondary/80"
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              Try Demo Mode
            </Button>
            <div className="text-center text-sm">
              <a href="/forgot-password" className="text-primary hover:text-primary/90 hover:underline">
                Forgot your password?
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
