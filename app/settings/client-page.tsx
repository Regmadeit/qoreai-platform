"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { SecuritySettings } from "@/components/settings/security-settings"
import { ApiSettings } from "@/components/settings/api-settings"
import { DisplaySettings } from "@/components/settings/display-settings"
import { RolePermissionsSettings } from "@/components/settings/role-permissions-settings"

type UserRole = "operator" | "maintenance" | "supervisor" | "manager"

export function RoleBasedSettingsClient() {
  const [userRole, setUserRole] = useState<UserRole>("manager")

  // Get role from localStorage (demo only)
  useEffect(() => {
    const savedRole = localStorage.getItem("demoUserRole") as UserRole | null
    if (savedRole) {
      setUserRole(savedRole)
    }
  }, [])

  // Define which settings tabs are available for each role
  const roleTabAccess = {
    operator: ["profile", "notifications", "security", "display"],
    maintenance: ["profile", "notifications", "security", "display"],
    supervisor: ["profile", "notifications", "security", "display", "api"],
    manager: ["profile", "notifications", "security", "display", "api", "permissions"],
  }

  const availableTabs = roleTabAccess[userRole] || roleTabAccess.operator

  return (
    <Tabs defaultValue="profile" className="space-y-4">
      <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${availableTabs.length}, 1fr)` }}>
        {availableTabs.includes("profile") && <TabsTrigger value="profile">Profile</TabsTrigger>}
        {availableTabs.includes("notifications") && <TabsTrigger value="notifications">Notifications</TabsTrigger>}
        {availableTabs.includes("security") && <TabsTrigger value="security">Security</TabsTrigger>}
        {availableTabs.includes("display") && <TabsTrigger value="display">Display</TabsTrigger>}
        {availableTabs.includes("api") && <TabsTrigger value="api">API</TabsTrigger>}
        {availableTabs.includes("permissions") && <TabsTrigger value="permissions">Permissions</TabsTrigger>}
      </TabsList>

      <TabsContent value="profile">
        <ProfileSettings />
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationSettings />
      </TabsContent>

      <TabsContent value="security">
        <SecuritySettings />
      </TabsContent>

      <TabsContent value="display">
        <DisplaySettings />
      </TabsContent>

      {availableTabs.includes("api") && (
        <TabsContent value="api">
          <ApiSettings />
        </TabsContent>
      )}

      {availableTabs.includes("permissions") && (
        <TabsContent value="permissions">
          <RolePermissionsSettings />
        </TabsContent>
      )}
    </Tabs>
  )
}

export default RoleBasedSettingsClient
