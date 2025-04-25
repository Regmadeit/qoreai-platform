// Mock data for different API endpoints
const mockData = {
  "/api/equipment": [
    { id: "eq1", name: "Conveyor Belt A", status: "operational" },
    { id: "eq2", name: "Forklift 3", status: "maintenance" },
    { id: "eq3", name: "Packaging Machine 2", status: "operational" },
  ],
  "/api/work-orders": [
    { id: "wo1", title: "Repair conveyor belt", priority: "high", assignedTo: "John Doe" },
    { id: "wo2", title: "Forklift maintenance", priority: "medium", assignedTo: "Jane Smith" },
    { id: "wo3", title: "Replace packaging machine parts", priority: "low", assignedTo: "Mike Johnson" },
  ],
  "/api/users": [
    { id: "u1", name: "John Doe", role: "maintenance", email: "john@example.com" },
    { id: "u2", name: "Jane Smith", role: "operator", email: "jane@example.com" },
    { id: "u3", name: "Mike Johnson", role: "supervisor", email: "mike@example.com" },
  ],
  "/api/notifications": [
    { id: "n1", title: "Maintenance required", read: false, createdAt: "2023-04-20T10:30:00Z" },
    { id: "n2", title: "Work order assigned", read: true, createdAt: "2023-04-19T14:15:00Z" },
    { id: "n3", title: "Equipment status update", read: false, createdAt: "2023-04-18T09:45:00Z" },
  ],
  "/api/checklists": [
    { id: "cl1", title: "Morning Equipment Check", completed: true, items: 5 },
    { id: "cl2", title: "Safety Inspection", completed: false, items: 10 },
    { id: "cl3", title: "End of Shift Checklist", completed: false, items: 7 },
  ],
  "/api/inventory": [
    { id: "inv1", name: "Conveyor Belt Rollers", quantity: 24, status: "in-stock" },
    { id: "inv2", name: "Hydraulic Fluid", quantity: 2, status: "low-stock" },
    { id: "inv3", name: "HVAC Filters", quantity: 0, status: "out-of-stock" },
  ],
}

// Generic mock API function
export async function mockFetch(url: string, options: RequestInit = {}) {
  console.log(`Mock API call: ${url}`, options)

  // Extract the path from the URL
  const urlObj = new URL(url, window.location.origin)
  const path = urlObj.pathname

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Check if we have mock data for this endpoint
  if (mockData[path]) {
    return {
      ok: true,
      status: 200,
      json: async () => mockData[path],
    }
  }

  // Handle POST requests (create new items)
  if (options.method === "POST") {
    return {
      ok: true,
      status: 201,
      json: async () => ({ id: `new-${Date.now()}`, ...JSON.parse(options.body as string) }),
    }
  }

  // Handle PUT requests (update items)
  if (options.method === "PUT") {
    return {
      ok: true,
      status: 200,
      json: async () => ({ updated: true, ...JSON.parse(options.body as string) }),
    }
  }

  // Handle DELETE requests
  if (options.method === "DELETE") {
    return {
      ok: true,
      status: 200,
      json: async () => ({ deleted: true }),
    }
  }

  // Default response for unknown endpoints
  return {
    ok: false,
    status: 404,
    json: async () => ({ error: "Not found" }),
  }
}

// Function to determine if we should use mock API
export function shouldUseMockApi() {
  // Use mock API if no API URL is configured or if we're in demo mode
  return !process.env.NEXT_PUBLIC_API_URL || sessionStorage.getItem("qoreai-demo-mode") === "true"
}

// Enhanced fetch function that uses mock API when needed
export async function enhancedFetch(url: string, options: RequestInit = {}) {
  if (typeof window !== "undefined" && shouldUseMockApi()) {
    return mockFetch(url, options)
  }

  // Use real fetch for production
  return fetch(url, options)
}
