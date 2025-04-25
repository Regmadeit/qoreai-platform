"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QooreAix } from '@/lib/qoore-aix';
import { Input } from '@/components/ui/input';
import { MessageSquare, X } from 'lucide-react';

const qooreAix = new QooreAix();

export function PreviewPanel() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);

  const handleAIAssist = async () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory(prev => [...prev, { role: 'user', content: message }]);
    
    const response = await qooreAix.respond(message);
    
    // Add AI response to chat
    setChatHistory(prev => [...prev, { role: 'assistant', content: response.text }]);
    setMessage('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-4">
      {/* Chat Interface */}
      {isChatOpen && (
        <Card className="w-96">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              QooreAix Chat
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsChatOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Chat History */}
              <div className="h-64 overflow-y-auto space-y-2">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded ${
                      msg.role === 'user' ? 'bg-primary/10' : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask QooreAix anything..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAIAssist()}
                />
                <Button onClick={handleAIAssist}>Send</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Toggle Button */}
      <Button
        variant="outline"
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="ml-auto"
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        {isChatOpen ? 'Close Chat' : 'Chat with QooreAix'}
      </Button>
    </div>
  );
} 