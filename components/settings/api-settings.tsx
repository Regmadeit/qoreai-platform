"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react"

export function ApiSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText("sk_live_QoreAi_api_key_123456789")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Settings</CardTitle>
        <CardDescription>Manage your API keys and integration settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">API Keys</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex">
                <div className="relative flex-1">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    value="sk_live_QoreAi_api_key_123456789"
                    readOnly
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-8 top-0 h-full"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showApiKey ? "Hide API key" : "Show API key"}</span>
                  </Button>
                </div>
                <Button type="button" variant="outline" size="icon" className="ml-2" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy API key</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                This is your secret API key. Keep it secure and do not share it publicly.
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <RefreshCw className="h-4 w-4" />
              Regenerate API Key
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">API Access</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="api-access" className="flex flex-col gap-1">
                <span>Enable API Access</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Allow external applications to access your data
                </span>
              </Label>
              <Switch id="api-access" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="webhook-notifications" className="flex flex-col gap-1">
                <span>Webhook Notifications</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Send event notifications to your webhook URL
                </span>
              </Label>
              <Switch id="webhook-notifications" defaultChecked />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Webhook Configuration</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input id="webhook-url" placeholder="https://your-domain.com/webhook" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook-secret">Webhook Secret</Label>
              <Input id="webhook-secret" type="password" placeholder="Enter webhook secret" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">API Rate Limits</h3>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm">Requests per minute</span>
              <span className="text-sm font-medium">60</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Requests per hour</span>
              <span className="text-sm font-medium">3,600</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Requests per day</span>
              <span className="text-sm font-medium">86,400</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Contact support to increase your rate limits if needed.</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save changes"}
        </Button>
      </CardFooter>
    </Card>
  )
}
