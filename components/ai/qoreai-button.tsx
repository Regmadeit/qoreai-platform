"use client"

import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"
import { useQoreAi } from "@/contexts/qoreai-context"

interface QoreAiButtonProps {
  contextType?: string
  contextId?: string
  initialMessage?: string
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function QoreAiButton({
  contextType,
  contextId,
  initialMessage,
  className,
  variant = "outline",
  size = "sm",
}: QoreAiButtonProps) {
  const { openAssistant } = useQoreAi()

  const handleClick = () => {
    openAssistant(contextType, contextId, initialMessage)
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleClick}>
      <Bot className="mr-2 h-4 w-4" />
      QoreAi Assistant
    </Button>
  )
}
