"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

interface ErrorFallbackProps {
  error?: Error
  resetErrorBoundary?: () => void
  message?: string
}

export function ErrorFallback({ error, resetErrorBoundary, message }: ErrorFallbackProps) {
  const router = useRouter()
  const [errorDetails, setErrorDetails] = useState<string | null>(null)

  useEffect(() => {
    // Only show detailed errors in development
    if (process.env.NODE_ENV === "development" && error) {
      setErrorDetails(error.message)
    }
  }, [error])

  const handleRefresh = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary()
    } else {
      window.location.reload()
    }
  }

  const handleGoBack = () => {
    router.back()
  }

  const handleGoHome = () => {
    router.push("/")
  }

  return (
    <div className="flex min-h-[400px] items-center justify-center p-4">
      <Card className="w-full max-w-md border-red-200">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <CardTitle>Something went wrong</CardTitle>
          </div>
          <CardDescription>
            {message || "We're having trouble loading this page. This is likely due to missing API data in demo mode."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorDetails && (
            <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-800">
              <p className="font-medium">Error details:</p>
              <p className="font-mono text-xs">{errorDetails}</p>
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            Since this is a demo application, some features may be limited. You can try refreshing the page or
            navigating back.
          </p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" onClick={handleGoBack} className="flex-1">
            Go Back
          </Button>
          <Button variant="outline" onClick={handleGoHome} className="flex-1">
            Go Home
          </Button>
          <Button onClick={handleRefresh} className="flex-1">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
