// Service Worker for QoreAI Platform
// This file must be in the public directory to be served with the correct MIME type

// Cache names
const CACHE_NAME = "qoreai-cache-v1"
const STATIC_CACHE = "qoreai-static-v1"
const DYNAMIC_CACHE = "qoreai-dynamic-v1"
const API_CACHE = "qoreai-api-v1"

// Assets to cache immediately
const STATIC_ASSETS = ["/", "/offline.html", "/logo-icon.png", "/logo-transparent.png"]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => self.skipWaiting()),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [STATIC_CACHE, DYNAMIC_CACHE, API_CACHE]

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => self.clients.claim()),
  )
})

// Fetch event - network first with cache fallback strategy
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  // API requests - network first, then cache
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clonedResponse = response.clone()
          caches.open(API_CACHE).then((cache) => {
            cache.put(event.request, clonedResponse)
          })
          return response
        })
        .catch(() => {
          return caches.match(event.request)
        }),
    )
    return
  }

  // HTML navigation requests - network first, fallback to offline page
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("/offline.html")
      }),
    )
    return
  }

  // Images and other assets - cache first, then network
  if (event.request.destination === "image" || event.request.url.match(/\.(css|js|woff2|svg|ttf)$/)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request).then((response) => {
            const clonedResponse = response.clone()
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(event.request, clonedResponse)
            })
            return response
          })
        )
      }),
    )
    return
  }

  // Default - network first with cache fallback
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache a copy of the response
        const clonedResponse = response.clone()
        caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(event.request, clonedResponse)
        })
        return response
      })
      .catch(() => {
        return caches.match(event.request)
      }),
  )
})

// Handle messages from clients
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
