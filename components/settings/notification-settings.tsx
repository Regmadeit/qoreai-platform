"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export function NotificationSettings() {
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
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Configure how and when you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Notification Channels</h3>
              <p className="text-sm text-muted-foreground">Select how you want to receive notifications</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="flex flex-col gap-1">
                <span>Email Notifications</span>
                <span className="font-normal text-xs text-muted-foreground">Receive notifications via email</span>
              </Label>
              <Switch id="email-notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications" className="flex flex-col gap-1">
                <span>Push Notifications</span>
                <span className="font-normal text-xs text-muted-foreground">Receive notifications in the app</span>
              </Label>
              <Switch id="push-notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications" className="flex flex-col gap-1">
                <span>SMS Notifications</span>
                <span className="font-normal text-xs text-muted-foreground">Receive critical alerts via SMS</span>
              </Label>
              <Switch id="sms-notifications" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Notification Types</h3>
            <p className="text-sm text-muted-foreground">Select which types of notifications you want to receive</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="equipment-alerts" className="flex flex-col gap-1">
                <span>Equipment Alerts</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Alerts for equipment failures and issues
                </span>
              </Label>
              <div className="flex items-center gap-2">
                <Select defaultValue="critical">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="critical">Critical only</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-reminders" className="flex flex-col gap-1">
                <span>Maintenance Reminders</span>
                <span className="font-normal text-xs text-muted-foreground">Reminders for scheduled maintenance</span>
              </Label>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="critical">Critical only</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="work-orders" className="flex flex-col gap-1">
                <span>Work Orders</span>
                <span className="font-normal text-xs text-muted-foreground">Updates on work order status changes</span>
              </Label>
              <div className="flex items-center gap-2">
                <Select defaultValue="assigned">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="assigned">Assigned to me</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="shipment-updates" className="flex flex-col gap-1">
                <span>Shipment Updates</span>
                <span className="font-normal text-xs text-muted-foreground">Updates on shipment status changes</span>
              </Label>
              <div className="flex items-center gap-2">
                <Select defaultValue="delays">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="delays">Delays only</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Quiet Hours</h3>
            <p className="text-sm text-muted-foreground">Set times when you don't want to receive notifications</p>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="quiet-hours" className="flex flex-col gap-1">
              <span>Enable Quiet Hours</span>
              <span className="font-normal text-xs text-muted-foreground">
                Only critical alerts will be sent during quiet hours
              </span>
            </Label>
            <Switch id="quiet-hours" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Select defaultValue="22:00">
                <SelectTrigger id="start-time">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20:00">8:00 PM</SelectItem>
                  <SelectItem value="21:00">9:00 PM</SelectItem>
                  <SelectItem value="22:00">10:00 PM</SelectItem>
                  <SelectItem value="23:00">11:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time</Label>
              <Select defaultValue="06:00">
                <SelectTrigger id="end-time">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="05:00">5:00 AM</SelectItem>
                  <SelectItem value="06:00">6:00 AM</SelectItem>
                  <SelectItem value="07:00">7:00 AM</SelectItem>
                  <SelectItem value="08:00">8:00 AM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset to defaults</Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save changes"}
        </Button>
      </CardFooter>
    </Card>
  )
}
