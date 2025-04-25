"use client"

import { useEffect } from "react"

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && window.workbox !== undefined) {
      const registerServiceWorker = async () => {
        try {
          // Always use the relative path for service worker
          const registration = await navigator.serviceWorker.register("/service-worker.js")
          console.log("Service Worker registered successfully:", registration.scope)
        } catch (error) {
          console.error("Service Worker registration failed:", error)
        }
      }

      registerServiceWorker()
    }
  }, [])

  return null
}
