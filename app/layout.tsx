import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { QoreAiProvider } from "@/contexts/qoreai-context"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QoreAI Platform",
  description: "Industrial AI platform for predictive maintenance and operations",
  generator: 'v0.dev',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <Script id="demo-mode-script" strategy="beforeInteractive">
          {`
            // Ensure demo mode is enabled
            try {
              localStorage.setItem('qoreai-demo-mode', 'true');
              sessionStorage.setItem('qoreai-demo-mode', 'true');
              
              // Create a default user if none exists
              if (!localStorage.getItem('qoreai-user') && !sessionStorage.getItem('qoreai-user')) {
                const defaultUser = {
                  id: 'default-demo-' + Math.floor(Math.random() * 1000),
                  name: 'Demo User',
                  email: 'demo@example.com',
                  role: 'operator',
                  department: 'Operations',
                  avatar: '/futuristic-console-operator.png',
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  lastLogin: new Date().toISOString(),
                  status: 'active'
                };
                
                localStorage.setItem('qoreai-user', JSON.stringify(defaultUser));
                sessionStorage.setItem('qoreai-user', JSON.stringify(defaultUser));
              }
            } catch (e) {
              console.error('Failed to set demo mode', e);
            }
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <QoreAiProvider>{children}</QoreAiProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
