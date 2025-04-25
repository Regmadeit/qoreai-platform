"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export function SecuritySettings() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Manage your account security and authentication settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Change Password</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="2fa">Enable two-factor authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Switch id="2fa" />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Session Management</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Current Session</div>
                <div className="text-sm text-muted-foreground">Chrome on Windows • IP 192.168.1.1</div>
                <div className="text-xs text-muted-foreground">Started 2 hours ago</div>
              </div>
              <div className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">Active</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Mobile Session</div>
                <div className="text-sm text-muted-foreground">QoreAi App on iPhone • IP 192.168.1.2</div>
                <div className="text-xs text-muted-foreground">Started 1 day ago</div>
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                Revoke
              </Button>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-2">
            Log out of all devices
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Login History</h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-sm">Today at 10:45 AM</div>
              <div className="text-sm text-muted-foreground">Chrome on Windows • IP 192.168.1.1</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm">Yesterday at 8:30 PM</div>
              <div className="text-sm text-muted-foreground">QoreAi App on iPhone • IP 192.168.1.2</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm">Apr 20, 2025 at 9:15 AM</div>
              <div className="text-sm text-muted-foreground">Chrome on Windows • IP 192.168.1.1</div>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-2">
            View full login history
          </Button>
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
