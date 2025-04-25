"use client"

import { useState, useEffect } from "react"
import { getApiUrl } from "@/lib/config"
import { enhancedFetch } from "@/lib/mock-api"

interface FetchState<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
}

export function useApi<T>(endpoint: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }))

        // Use our helper function to get the full URL
        const url = getApiUrl(endpoint)

        // Use enhanced fetch that supports mock data
        const response = await enhancedFetch(url)

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        setState({ data, isLoading: false, error: null })
      } catch (error) {
        console.error("API fetch error:", error)
        setState({ data: null, isLoading: false, error: error as Error })
      }
    }

    fetchData()
  }, [endpoint])

  return state
}

export async function postApi<T, R>(endpoint: string, data: T): Promise<R> {
  // Use our helper function to get the full URL
  const url = getApiUrl(endpoint)

  try {
    const response = await enhancedFetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("API post error:", error)
    throw error
  }
}

export async function putApi<T, R>(endpoint: string, data: T): Promise<R> {
  // Use our helper function to get the full URL
  const url = getApiUrl(endpoint)

  try {
    const response = await enhancedFetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("API put error:", error)
    throw error
  }
}

export async function deleteApi<R>(endpoint: string): Promise<R> {
  // Use our helper function to get the full URL
  const url = getApiUrl(endpoint)

  try {
    const response = await enhancedFetch(url, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("API delete error:", error)
    throw error
  }
}
