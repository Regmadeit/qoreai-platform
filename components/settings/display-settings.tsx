"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export function DisplaySettings() {
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
        <CardTitle>Display</CardTitle>
        <CardDescription>Customize your display preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Theme</h3>
          <RadioGroup defaultValue="dark" className="grid grid-cols-3 gap-4">
            <Label
              htmlFor="theme-light"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="light" id="theme-light" className="sr-only" />
              <div className="mb-3 h-10 w-10 rounded-full border-2 bg-white"></div>
              <span className="text-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Light
              </span>
            </Label>
            <Label
              htmlFor="theme-dark"
              className="flex flex-col items-center justify-between rounded-md border-2 border-primary bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
              <div className="mb-3 h-10 w-10 rounded-full border-2 bg-slate-950"></div>
              <span className="text-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Dark
              </span>
            </Label>
            <Label
              htmlFor="theme-system"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="system" id="theme-system" className="sr-only" />
              <div className="mb-3 h-10 w-10 rounded-full border-2 bg-gradient-to-r from-white to-slate-950"></div>
              <span className="text-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                System
              </span>
            </Label>
          </RadioGroup>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Dashboard Layout</h3>
          <RadioGroup defaultValue="default" className="grid grid-cols-2 gap-4">
            <Label
              htmlFor="layout-default"
              className="flex flex-col items-center justify-between rounded-md border-2 border-primary bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="default" id="layout-default" className="sr-only" />
              <div className="mb-3 h-16 w-full rounded border-2 bg-muted p-1">
                <div className="h-2 w-full rounded bg-muted-foreground/30 mb-1"></div>
                <div className="grid grid-cols-4 gap-1 h-8">
                  <div className="col-span-1 rounded bg-muted-foreground/30"></div>
                  <div className="col-span-3 rounded bg-muted-foreground/30"></div>
                </div>
              </div>
              <span className="text-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Default
              </span>
            </Label>
            <Label
              htmlFor="layout-compact"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="compact" id="layout-compact" className="sr-only" />
              <div className="mb-3 h-16 w-full rounded border-2 bg-muted p-1">
                <div className="h-2 w-full rounded bg-muted-foreground/30 mb-1"></div>
                <div className="grid grid-cols-6 gap-1 h-8">
                  <div className="col-span-1 rounded bg-muted-foreground/30"></div>
                  <div className="col-span-5 rounded bg-muted-foreground/30"></div>
                </div>
              </div>
              <span className="text-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Compact
              </span>
            </Label>
          </RadioGroup>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Display Options</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="density" className="flex flex-col gap-1">
                <span>Density</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Control the density of the UI elements
                </span>
              </Label>
              <Select defaultValue="comfortable">
                <SelectTrigger id="density" className="w-32">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="comfortable">Comfortable</SelectItem>
                  <SelectItem value="spacious">Spacious</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="animations" className="flex flex-col gap-1">
                <span>Animations</span>
                <span className="font-normal text-xs text-muted-foreground">Enable or disable UI animations</span>
              </Label>
              <Switch id="animations" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion" className="flex flex-col gap-1">
                <span>Reduced Motion</span>
                <span className="font-normal text-xs text-muted-foreground">Minimize animations for accessibility</span>
              </Label>
              <Switch id="reduced-motion" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="font-size" className="flex flex-col gap-1">
                <span>Font Size</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Adjust the size of text throughout the app
                </span>
              </Label>
              <Select defaultValue="medium">
                <SelectTrigger id="font-size" className="w-32">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
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
