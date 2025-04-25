"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Bell, Settings, Shield, Clock, Award } from "lucide-react"

// Mock data - replace with real user data from your backend
const userData = {
  name: "John Smith",
  role: "Senior Operator",
  email: "john.smith@qoreai.com",
  phone: "+1 (555) 123-4567",
  shift: "Morning",
  certifications: [
    {
      name: "Equipment Operation Level 3",
      issueDate: "2023-05-15",
      status: "active",
    },
    {
      name: "Safety Protocol Certification",
      issueDate: "2023-08-20",
      status: "active",
    },
  ],
  stats: {
    tasksCompleted: 128,
    hoursLogged: 960,
    efficiency: 94,
  },
}

export default function Profile() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: false,
  })

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Manage your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={userData.name} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={userData.email} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={userData.phone} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-blue-500">
                  {userData.role}
                </Badge>
                <Badge variant="secondary" className="bg-green-500">
                  {userData.shift} Shift
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Your activity statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasks</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userData.stats.tasksCompleted}</div>
                  <p className="text-xs text-muted-foreground">Completed tasks</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hours</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userData.stats.hoursLogged}</div>
                  <p className="text-xs text-muted-foreground">Hours logged</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Efficiency Rating</Label>
                <span className="text-green-500 font-medium">{userData.stats.efficiency}%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${userData.stats.efficiency}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
            <CardDescription>Your qualifications and training</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between space-x-4 rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{cert.name}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-green-500">
                        {cert.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Issued: {cert.issueDate}
                      </span>
                    </div>
                  </div>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Manage your preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="notifications" className="space-y-4">
              <TabsList>
                <TabsTrigger value="notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="notifications" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label>Email Notifications</Label>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, email: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label>Push Notifications</Label>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, push: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label>System Updates</Label>
                    <Switch
                      checked={notifications.updates}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, updates: checked })
                      }
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full">
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full">
                    Security Log
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 