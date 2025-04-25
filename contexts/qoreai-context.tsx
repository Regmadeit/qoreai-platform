"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { QoreAiAssistant } from "@/components/ai/qoreai-assistant"

interface QoreAiContextType {
  openAssistant: (contextType?: string, contextId?: string, initialMessage?: string) => void
  closeAssistant: () => void
}

const QoreAiContext = createContext<QoreAiContextType | undefined>(undefined)

export function QoreAiProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [contextType, setContextType] = useState<string | undefined>()
  const [contextId, setContextId] = useState<string | undefined>()
  const [initialMessage, setInitialMessage] = useState<string | undefined>()

  const openAssistant = (
    contextType?: string,
    contextId?: string,
    initialMessage = "Hello! I'm QoreAi, your AI assistant. How can I help you today?",
  ) => {
    setContextType(contextType)
    setContextId(contextId)
    setInitialMessage(initialMessage)
    setIsOpen(true)
  }

  const closeAssistant = () => {
    setIsOpen(false)
  }

  return (
    <QoreAiContext.Provider value={{ openAssistant, closeAssistant }}>
      {children}
      {isOpen && <QoreAiAssistant contextType={contextType} contextId={contextId} initialMessage={initialMessage} />}
    </QoreAiContext.Provider>
  )
}

export function useQoreAi() {
  const context = useContext(QoreAiContext)

  if (context === undefined) {
    throw new Error("useQoreAi must be used within a QoreAiProvider")
  }

  return context
}
