"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, AlertTriangle, ArrowLeft } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { getAllInventoryItems, deductInventoryForWorkOrder } from "@/lib/inventory-service"
import Link from "next/link"
import type { InventoryItem, WorkOrder, WorkOrderInventoryItem } from "@/types"
import type { UserRole } from "@/types/users"

interface WorkOrderFormProps {
  onSubmit: (data: Partial<WorkOrder>) => void
  onCancel: () => void
}

export function WorkOrderForm({ onSubmit, onCancel }: WorkOrderFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [assignee, setAssignee] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [selectedItems, setSelectedItems] = useState<WorkOrderInventoryItem[]>([])
  const [currentItemId, setCurrentItemId] = useState("")
  const [currentItemQuantity, setCurrentItemQuantity] = useState(1)
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userRole, setUserRole] = useState<UserRole>("operator") // In a real app, this would come from authentication

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const items = await getAllInventoryItems()
        setInventoryItems(items)
      } catch (error) {
        console.error("Error fetching inventory:", error)
        toast({
          title: "Error",
          description: "Failed to load inventory items",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchInventory()
  }, [])

  const availableItems = inventoryItems.filter(
    (item) => item.quantity > 0 && !selectedItems.some((selected) => selected.id === item.id),
  )

  const handleAddItem = () => {
    if (!currentItemId) return

    const itemToAdd = inventoryItems.find((item) => item.id === currentItemId)
    if (!itemToAdd) return

    if (currentItemQuantity > itemToAdd.quantity) {
      toast({
        title: "Not enough in stock",
        description: `Only ${itemToAdd.quantity} units of ${itemToAdd.name} available`,
        variant: "destructive",
      })
      return
    }

    setSelectedItems([
      ...selectedItems,
      {
        id: itemToAdd.id,
        name: itemToAdd.name,
        quantity: currentItemQuantity,
      },
    ])

    setCurrentItemId("")
    setCurrentItemQuantity(1)
  }

  const handleRemoveItem = (id: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id))
  }

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    const itemToUpdate = inventoryItems.find((item) => item.id === id)
    if (!itemToUpdate) return

    if (newQuantity > itemToUpdate.quantity) {
      toast({
        title: "Not enough in stock",
        description: `Only ${itemToUpdate.quantity} units of ${itemToUpdate.name} available`,
        variant: "destructive",
      })
      return
    }

    if (newQuantity < 1) return

    setSelectedItems(selectedItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!title || !description || !assignee || !dueDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      // Deduct inventory items
      if (selectedItems.length > 0) {
        const success = await deductInventoryForWorkOrder(selectedItems)
        if (!success) {
          toast({
            title: "Inventory Error",
            description: "Failed to update inventory quantities",
            variant: "destructive",
          })
          return
        }
      }

      // Create work order data
      const workOrderData: Partial<WorkOrder> = {
        title,
        description,
        priority,
        assignee,
        dueDate,
        inventoryItems: selectedItems,
        status: "open",
        createdAt: new Date().toISOString(),
      }

      // Submit the work order
      onSubmit(workOrderData)
    } catch (error) {
      console.error("Error creating work order:", error)
      toast({
        title: "Error",
        description: "There was an error creating the work order",
        variant: "destructive",
      })
    }
  }

  const isAuthorized = userRole === "supervisor" || userRole === "manager"

  if (!isAuthorized) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex flex-col items-center justify-center text-center">
            <AlertTriangle className="h-12 w-12 text-amber-500 mb-2" />
            <h3 className="text-lg font-medium">Access Restricted</h3>
            <p className="text-muted-foreground mt-1">Only supervisors and managers can create work orders.</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/work-orders">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Work Orders
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-12">
          <p>Loading inventory items...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Create Work Order</CardTitle>
          <CardDescription>Fill in the details to create a new work order</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter work order title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the work to be done"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="assignee">Assignee</Label>
                <Input
                  id="assignee"
                  placeholder="Enter assignee name"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Required Parts & Materials</h3>
            <p className="text-sm text-muted-foreground">
              Select items from inventory that will be used for this work order
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="item">Item</Label>
                <Select value={currentItemId} onValueChange={setCurrentItemId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an item" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableItems.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} ({item.quantity} available)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-24">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="1"
                  value={currentItemQuantity}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value)
                    if (!isNaN(value)) {
                      setCurrentItemQuantity(value)
                    } else {
                      setCurrentItemQuantity(1)
                    }
                  }}
                  min="1"
                />
              </div>

              <div>
                <Button type="button" onClick={handleAddItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>

            {selectedItems.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-md font-medium">Selected Items</h4>
                <ul className="border rounded-md divide-y">
                  {selectedItems.map((item) => (
                    <li key={item.id} className="flex items-center justify-between p-4">
                      <div>
                        {item.name}
                        <div className="text-sm text-muted-foreground">
                          Quantity:
                          <Input
                            type="number"
                            className="w-20 ml-2 inline-block"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = Number.parseInt(e.target.value)
                              if (!isNaN(value)) {
                                handleUpdateQuantity(item.id, value)
                              }
                            }}
                            min="1"
                          />
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(item.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Create Work Order</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
