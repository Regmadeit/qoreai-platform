import { Viewport } from "next"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" }
  ]
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 