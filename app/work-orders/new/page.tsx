"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { WorkOrderForm } from "@/components/work-orders/work-order-form"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

export default function NewWorkOrder() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      console.log("Creating work order:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update inventory (in a real app, this would be handled by the backend)
      // This is where inventory items would be deducted from stock

      toast({
        title: "Work order created",
        description: "The work order has been created successfully",
      })

      // Redirect back to work orders list
      router.push("/work-orders")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating the work order",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push("/work-orders")
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Create Work Order"
        description="Create a new work order and assign resources"
        actions={
          <Link href="/work-orders">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Work Orders
            </Button>
          </Link>
        }
      />

      <WorkOrderForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  )
}
