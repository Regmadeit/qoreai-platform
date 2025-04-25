"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { TopNav } from "@/components/top-nav"
import { MobileNav } from "@/components/mobile-nav"
import { DemoWelcome } from "@/components/demo-welcome"
import { useAuth } from "@/contexts/auth-context"
import { Loading } from "@/components/ui/loading"

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <TopNav />
        <div className="flex-1 flex items-center justify-center">
          <Loading message="Loading dashboard..." />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <DemoWelcome />
      <div className="flex-1">{children}</div>
      <MobileNav />
    </div>
  )
}
