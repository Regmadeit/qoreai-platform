"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HardHat, Wrench, Users, BarChart3 } from "lucide-react"

export function RolePermissionsSettings() {
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
        <CardTitle>Role Permissions</CardTitle>
        <CardDescription>Configure access permissions for different user roles</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="operator">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="operator" className="flex items-center gap-2">
              <HardHat className="h-4 w-4" />
              Operators
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="supervisor" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Supervisors
            </TabsTrigger>
            <TabsTrigger value="manager" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Managers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="operator" className="space-y-4 pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Operator Permissions</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="op-equipment-access" className="flex flex-col gap-1">
                    <span>Equipment Access</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Access to view and interact with assigned equipment
                    </span>
                  </Label>
                  <Switch id="op-equipment-access" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="op-checklist-access" className="flex flex-col gap-1">
                    <span>Checklist Access</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Access to complete equipment checklists
                    </span>
                  </Label>
                  <Switch id="op-checklist-access" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="op-report-issues" className="flex flex-col gap-1">
                    <span>Report Issues</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Ability to report equipment issues and maintenance needs
                    </span>
                  </Label>
                  <Switch id="op-report-issues" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="op-learning-access" className="flex flex-col gap-1">
                    <span>Learning Hub Access</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Access to training materials and documentation
                    </span>
                  </Label>
                  <Switch id="op-learning-access" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="op-production-data" className="flex flex-col gap-1">
                    <span>Production Data</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      View production metrics and targets
                    </span>
                  </Label>
                  <Switch id="op-production-data" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="op-maintenance-view" className="flex flex-col gap-1">
                    <span>Maintenance View</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      View maintenance schedules and work orders
                    </span>
                  </Label>
                  <Switch id="op-maintenance-view" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4 pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Maintenance Technician Permissions</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="mt-work-orders" className="flex flex-col gap-1">
                    <span>Work Order Management</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Create, update, and close work orders
                    </span>
                  </Label>
                  <Switch id="mt-work-orders" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="mt-equipment-access" className="flex flex-col gap-1">
                    <span>Equipment Access</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Full access to all equipment data and controls
                    </span>
                  </Label>
                  <Switch id="mt-equipment-access" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="mt-inventory-access" className="flex flex-col gap-1">
                    <span>Inventory Access</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      View and update maintenance inventory
                    </span>
                  </Label>
                  <Switch id="mt-inventory-access" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="mt-predictive-access" className="flex flex-col gap-1">
                    <span>Predictive Maintenance</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Access to predictive maintenance analytics and alerts
                    </span>
                  </Label>
                  <Switch id="mt-predictive-access" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="mt-documentation" className="flex flex-col gap-1">
                    <span>Documentation Access</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      View and update equipment documentation
                    </span>
                  </Label>
                  <Switch id="mt-documentation" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="mt-schedule-maintenance" className="flex flex-col gap-1">
                    <span>Schedule Maintenance</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Create and modify maintenance schedules
                    </span>
                  </Label>
                  <Switch id="mt-schedule-maintenance" defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="supervisor" className="space-y-4 pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Supervisor Permissions</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sv-team-management" className="flex flex-col gap-1">
                    <span>Team Management</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Manage team members and assignments
                    </span>
                  </Label>
                  <Switch id="sv-team-management" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sv-production-control" className="flex flex-col gap-1">
                    <span>Production Control</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Adjust production settings and targets
                    </span>
                  </Label>
                  <Switch id="sv-production-control" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sv-maintenance-approval" className="flex flex-col gap-1">
                    <span>Maintenance Approval</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Approve maintenance requests and work orders
                    </span>
                  </Label>
                  <Switch id="sv-maintenance-approval" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sv-logistics-access" className="flex flex-col gap-1">
                    <span>Logistics Access</span>
                    <span className="font-normal text-xs text-muted-foreground">Manage shipments and inventory</span>
                  </Label>
                  <Switch id="sv-logistics-access" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sv-quality-control" className="flex flex-col gap-1">
                    <span>Quality Control</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Access quality metrics and approve quality checks
                    </span>
                  </Label>
                  <Switch id="sv-quality-control" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sv-reporting" className="flex flex-col gap-1">
                    <span>Reporting Access</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Generate and view operational reports
                    </span>
                  </Label>
                  <Switch id="sv-reporting" defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manager" className="space-y-4 pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Manager Permissions</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="mg-full-access" className="flex flex-col gap-1">
                    <span>Full System Access</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Complete access to all system features
                    </span>
                  </Label>
                  <Switch id="mg-full-access" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="mg-user-management" className="flex flex-col gap-1">
                    <span>User Management</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Create, modify, and delete user accounts
                    </span>
                  </Label>
                  <Switch id="mg-user-management" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="mg-role-assignment" className="flex flex-col gap-1">
                    <span>Role Assignment</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Assign roles and permissions to users
                    </span>
                  </Label>
                  <Switch id="mg-role-assignment" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="mg-analytics" className="flex flex-col gap-1">
                    <span>Advanced Analytics</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Access to business intelligence and advanced reporting
                    </span>
                  </Label>
                  <Switch id="mg-analytics" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="mg-system-config" className="flex flex-col gap-1">
                    <span>System Configuration</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Modify system settings and configurations
                    </span>
                  </Label>
                  <Switch id="mg-system-config" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="mg-api-access" className="flex flex-col gap-1">
                    <span>API Management</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Manage API keys and external integrations
                    </span>
                  </Label>
                  <Switch id="mg-api-access" defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
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
