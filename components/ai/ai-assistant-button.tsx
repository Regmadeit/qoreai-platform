"use client"

import { Button } from "@/components/ui/button"
import { QoreAiAssistant } from "@/components/ai/qoreai-assistant"
import { useState } from "react"

interface AiAssistantButtonProps {
  contextType?: string
  contextId?: string
  initialMessage?: string
}

export function AiAssistantButton({
  contextType,
  contextId,
  initialMessage,
}: AiAssistantButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="ml-auto"
        onClick={() => setIsOpen(!isOpen)}
      >
        AI Assistant
      </Button>
      {isOpen && (
        <QoreAiAssistant
          contextType={contextType}
          contextId={contextId}
          initialMessage={initialMessage}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
