"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export function BackToDashboard() {
  const router = useRouter()
  const { user } = useAuth()
  
  const handleBack = () => {
    // Determine the correct dashboard based on user role
    if (user?.role === "operator") {
      router.push("/operator/dashboard")
    } else if (user?.role === "maintenance") {
      router.push("/maintenance/dashboard")
    } else if (user?.role === "supervisor") {
      router.push("/supervisor/dashboard")
    } else {
      router.push("/dashboard")
    }
  }
  
  return (
    <Button 
      variant="ghost" 
      onClick={handleBack}
      className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Dashboard
    </Button>
  )
} 