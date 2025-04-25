export interface Shipment {
  id: string
  type: "inbound" | "outbound"
  status: "scheduled" | "in-transit" | "delivered" | "cancelled"
  origin: string
  destination: string
  carrier: string
  trackingNumber?: string
  scheduledDate: string
  estimatedArrival?: string
  actualArrival?: string
  items: ShipmentItem[]
  weight?: number
  notes?: string
  documents?: ShipmentDocument[]
}

export interface ShipmentItem {
  id: string
  name: string
  quantity: number
  weight?: number
  value?: number
}

export interface ShipmentDocument {
  id: string
  name: string
  type: string
  url: string
  uploadedAt: string
}

export interface Trailer {
  id: string
  status: "Empty" | "Preloaded" | "In Route" | "In Service"
  location: string
  lastUpdated: string
  buyer?: string
  contents?: string
  driver?: string
  nextDestination?: string
}

export interface TrailerPool {
  id: number
  name: string
  trailers: Trailer[]
}
