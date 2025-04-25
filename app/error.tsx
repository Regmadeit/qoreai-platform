"use client"

import { ErrorFallback } from "@/components/error-fallback"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <ErrorFallback error={error} resetErrorBoundary={reset} message="Something went wrong with the application." />
      </body>
    </html>
  )
}
