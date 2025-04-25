// Environment variable fallbacks
export const config = {
  // API URL with fallback to relative path
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "",

  // Other environment variables with fallbacks
  appName: "QoreAI Platform",
  appVersion: "1.0.0",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
}

// Helper function to get API URL (with trailing slash handling)
export function getApiUrl(path = ""): string {
  // If path is a full URL, return it as is
  if (path.startsWith("http")) {
    return path
  }

  // If we have an API URL configured, use it
  if (config.apiUrl) {
    const baseUrl = config.apiUrl.endsWith("/") ? config.apiUrl : `${config.apiUrl}/`
    const cleanPath = path.startsWith("/") ? path.substring(1) : path
    return `${baseUrl}${cleanPath}`
  }

  // Otherwise, use relative paths
  return path.startsWith("/") ? path : `/${path}`
}
