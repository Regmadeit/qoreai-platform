import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ClickableProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
}

const Clickable = forwardRef<HTMLDivElement, ClickableProps>(({ className, active, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground",
        active && "bg-accent text-accent-foreground",
        className,
      )}
      {...props}
    />
  )
})
Clickable.displayName = "Clickable"

export { Clickable }
