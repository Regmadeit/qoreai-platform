"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, User, Loader2, Send } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  role: "assistant" | "user"
  content: string
}

interface AiAssistantChatProps {
  checklistType: string
}

// AI responses based on checklist type
const aiResponses: Record<string, string[]> = {
  washline: [
    "When inspecting filters, look for any debris or buildup that could restrict water flow. Clean filters should have no visible blockage.",
    "The optimal water temperature for the washline is between 140-160°F. Lower temperatures may result in inadequate cleaning.",
    "For conveyor belt alignment, check that the belt is centered on the rollers and not rubbing against the frame.",
    "When checking valves, ensure they open and close smoothly without sticking. Listen for any unusual sounds during operation.",
    "Spray nozzles should produce an even spray pattern. If you notice uneven spraying or dripping, the nozzle may be clogged.",
  ],
  forklift: [
    "When checking hydraulic oil levels, ensure the forklift is on level ground and the forks are lowered completely.",
    "The horn should be loud enough to be heard over typical warehouse noise. Test it in different areas of the facility.",
    "For the brake test, move the forklift forward slowly, then apply the brakes. The forklift should stop promptly without pulling to either side.",
    "When inspecting tires, look for cuts, tears, or excessive wear. Proper inflation is critical for stability and load capacity.",
    "The fire extinguisher should have a green indicator light and be properly secured in its mounting bracket.",
  ],
  baler: [
    "When checking hydraulic fluid levels, look for any signs of leaks around cylinders, hoses, and fittings.",
    "The ejection system should operate smoothly without jerking or excessive noise. Test it with the baler empty.",
    "Safety guards must be securely in place before operation. Never bypass safety interlocks.",
    "For sensor operation, verify that the baler stops automatically when the door is opened or when the emergency stop is pressed.",
    "When inspecting belts and pulleys, look for signs of fraying, cracking, or misalignment.",
  ],
  crosswrap: [
    "Proper wrapper alignment is critical for even wrapping. Check that the film feeds evenly across the width of the bale.",
    "Loose straps can cause the wrapper to shift during operation. Ensure all mounting hardware is tight.",
    "When loading wrapping material, follow the threading diagram exactly to prevent film breaks during operation.",
    "All emergency stops should immediately halt machine operation when pressed. Test each one individually.",
    "Clean rollers and sensors daily to prevent buildup that can cause misreads or film breaks.",
  ],
  "stadler-optical": [
    "Clean optical sensors with approved cleaning solution only. Never use abrasive materials that could scratch the lenses.",
    "The air pressure for the ejection system should be maintained at 90-100 PSI for optimal performance.",
    "Belt tracking should be centered. If the belt moves to one side, adjust the tracking rollers according to the maintenance manual.",
    "The material feed system should provide a consistent, even layer of material to the sorting belt for optimal detection.",
    "Calibration of sensors should be performed weekly or after any maintenance to ensure accurate sorting.",
  ],
  "krones-washline": [
    "The caustic solution concentration should be maintained between 2-3% for optimal cleaning without damaging equipment.",
    "Heating elements should maintain water temperature between 140-160°F. Check for any fluctuations that could indicate problems.",
    "Unusual pump noise often indicates cavitation or bearing failure. Document any changes in sound immediately.",
    "Inspect the conveyor system daily for any signs of wear, particularly at connection points and drive mechanisms.",
    "Safety interlocks prevent operation when guards are removed. Never bypass these critical safety features.",
  ],
}

export function AiAssistantChat({ checklistType }: AiAssistantChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Initialize with welcome message based on checklist type
  useEffect(() => {
    const initialMessage = {
      role: "assistant" as const,
      content: `Hello! I'm QoreAi, your AI assistant for the ${checklistType} checklist. How can I help you complete your inspection today?`,
    }
    setMessages([initialMessage])
  }, [checklistType])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = { role: "user" as const, content: inputValue }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response based on checklist type
    setTimeout(() => {
      const responses = aiResponses[checklistType] || [
        "I can help you complete this checklist efficiently and safely.",
        "Make sure to document any issues you find during the inspection.",
        "If you're unsure about any checklist item, it's better to mark it for follow-up than to skip it.",
        "Regular inspections help prevent equipment failures and safety incidents.",
        "Remember to sign and date your checklist when complete.",
      ]

      const aiResponse = {
        role: "assistant" as const,
        content: responses[Math.floor(Math.random() * responses.length)],
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-[350px]">
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-3 rounded-lg p-3",
              message.role === "assistant" ? "bg-muted/50" : "bg-blue-500/10 ml-auto",
            )}
          >
            {message.role === "assistant" ? (
              <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-blue-500">
                <Bot className="h-4 w-4 text-white" />
              </div>
            ) : (
              <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-muted">
                <User className="h-4 w-4" />
              </div>
            )}
            <div className="text-sm">{message.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3 rounded-lg p-3 bg-muted/50">
            <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-blue-500">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Analyzing your question...</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-4">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask QoreAi about inspection procedures..."
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage()
            }
          }}
        />
        <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
