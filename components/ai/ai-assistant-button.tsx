"use client"

import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"
import { QoreAiAssistant } from "@/components/ai/qoreai-assistant"
import { useState } from "react"

interface AiAssistantButtonProps {
  contextType?: string
  contextId?: string
  initialMessage?: string
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function AiAssistantButton({
  contextType,
  contextId,
  initialMessage,
  className,
  variant = "outline",
  size = "sm",
}: AiAssistantButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(true)
  }

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={handleClick}>
        <Bot className="mr-2 h-4 w-4" />
        AI Assistant
      </Button>
      {isOpen && <QoreAiAssistant contextType={contextType} contextId={contextId} initialMessage={initialMessage} />}
    </>
  )
}
