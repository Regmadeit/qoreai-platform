"use client"

import { createContext, useContext, type ReactNode } from "react"

// Define environment variables with fallbacks
interface EnvContextType {
  NEXT_PUBLIC_API_URL: string
}

const defaultEnv: EnvContextType = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "",
}

const EnvContext = createContext<EnvContextType>(defaultEnv)

export function EnvProvider({ children }: { children: ReactNode }) {
  return <EnvContext.Provider value={defaultEnv}>{children}</EnvContext.Provider>
}

export function useEnv() {
  return useContext(EnvContext)
}
