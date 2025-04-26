/// <reference lib="webworker" />

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from "workbox-core"
import { ExpirationPlugin } from "workbox-expiration"
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching"
import { registerRoute } from "workbox-routing"
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies"

declare const self: ServiceWorkerGlobalScope

// Claim control immediately
clientsClaim()

// Skip waiting on install
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting())
})

// Precache all assets
precacheAndRoute(self.__WB_MANIFEST)

// Cache page navigations
registerRoute(
  // Check to see if the request is a navigation to a new page
  ({ request }) => request.mode === "navigate",
  // Use a Network First caching strategy
  new StaleWhileRevalidate({
    // Put all cached files in a cache named 'pages'
    cacheName: "pages",
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      {
        cacheWillUpdate: async ({ response }) => {
          return response && response.status === 200 ? response : null
        },
      },
    ],
  })
)

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
registerRoute(
  ({ request }) =>
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "worker",
  new StaleWhileRevalidate({
    cacheName: "assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
)

// Cache images with a Cache First strategy
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
)

// Fallback to offline page
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(event.request)
          return response
        } catch (error) {
          const cache = await caches.open("offline-fallback")
          const cachedResponse = await cache.match("/offline.html")
          return cachedResponse || new Response("You are offline")
        }
      })()
    )
  }
})

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  }),
)

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        maxEntries: 30,
      }),
    ],
  }),
)

// Cache API responses with a stale-while-revalidate strategy
registerRoute(
  /\/api\//,
  new StaleWhileRevalidate({
    cacheName: "api-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      }),
    ],
  }),
)

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
