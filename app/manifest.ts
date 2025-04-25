import type { MetadataRoute } from "next"

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "QoreAI Platform",
    short_name: "QoreAI",
    description: "Intelligent Manufacturing Operations Platform",
    start_url: "/",
    display: "standalone",
    background_color: "#003da5",
    theme_color: "#003da5",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
