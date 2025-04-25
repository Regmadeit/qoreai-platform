"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export function DemoWelcome() {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (!user) return null

  const getRoleColor = () => {
    switch (user.role) {
      case "operator":
        return "text-blue-600"
      case "maintenance":
        return "text-green-600"
      case "supervisor":
        return "text-amber-600"
      case "manager":
        return "text-purple-600"
      default:
        return "text-gray-600"
    }
  }

  const handleChangeRole = () => {
    router.push("/login")
  }

  return (
    <Card className="mb-6 border-2 border-dashed mx-4 mt-4 md:mx-6 md:mt-6">
      <CardHeader className="pb-2">
        <CardTitle>
          Welcome to the{" "}
          <span className={getRoleColor()}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span> Dashboard
        </CardTitle>
        <CardDescription>You are currently viewing the QoreAI platform as a {user.role}.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">
          This is a demo interface showing the features and functionality available to {user.role}s. Feel free to
          explore the different sections and features.
        </p>
        <Button variant="outline" size="sm" onClick={handleChangeRole}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Change Role
        </Button>
      </CardContent>
    </Card>
  )
}
