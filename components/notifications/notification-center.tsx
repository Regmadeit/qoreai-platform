"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NotificationCenter() {
  const [notificationCount, setNotificationCount] = useState(3)

  const markAllAsRead = () => {
    setNotificationCount(0)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
              {notificationCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {notificationCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto text-xs">
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {notificationCount > 0 ? (
            <>
              <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                <div className="font-medium">Work Order Assigned</div>
                <div className="text-sm text-muted-foreground">WO-2023-042 has been assigned to you</div>
                <div className="text-xs text-muted-foreground mt-1">10 minutes ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                <div className="font-medium">Equipment Alert</div>
                <div className="text-sm text-muted-foreground">Forklift #3 requires maintenance</div>
                <div className="text-xs text-muted-foreground mt-1">1 hour ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                <div className="font-medium">Shipment Arrived</div>
                <div className="text-sm text-muted-foreground">Shipment #1842 has arrived at dock 3</div>
                <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
              </DropdownMenuItem>
            </>
          ) : (
            <div className="p-4 text-center text-muted-foreground">No new notifications</div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center font-medium">View All Notifications</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
