"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Brain, Send, Sparkles, MessageSquare } from "lucide-react"

export function QoreAiAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [conversation, setConversation] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content: "Hello! I'm your QoreAI assistant. How can I help optimize your operations today?"
    }
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message to conversation
    setConversation(prev => [...prev, { role: "user", content: message }])
    
    // Clear input
    setMessage("")

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      setConversation(prev => [...prev, {
        role: "assistant",
        content: "I'm analyzing your request and processing real-time data to provide optimized recommendations..."
      }])
    }, 1000)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 rounded-full p-4 bg-qore-blue hover:bg-qore-blue/90"
      >
        <Brain className="h-6 w-6" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-96 shadow-2xl bg-card/95 backdrop-blur border-qore-blue">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="flex items-center text-white">
              <Sparkles className="h-5 w-5 mr-2 text-qore-gold" />
              QoreAI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 h-[400px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {conversation.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      msg.role === "assistant"
                        ? "bg-card/50 text-white"
                        : "bg-qore-blue text-white"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-card/50 text-white placeholder:text-muted-foreground"
              />
              <Button type="submit" className="bg-qore-blue hover:bg-qore-blue/90">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  )
}
