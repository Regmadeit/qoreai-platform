"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Trash } from "lucide-react"

// Sample data for trailer pools
const buyerPools = [
  {
    id: 1,
    name: "Ravago",
    trailers: [
      { id: "TR-1001", status: "Empty", location: "Yard A", lastUpdated: "2 hours ago" },
      { id: "TR-1005", status: "In Route", location: "Highway 95", lastUpdated: "30 minutes ago" },
      { id: "TR-1008", status: "Preloaded", location: "Dock 3", lastUpdated: "1 hour ago" },
      { id: "TR-1012", status: "In Service", location: "Customer Site", lastUpdated: "4 hours ago" },
    ],
  },
  {
    id: 2,
    name: "Blue Polymer",
    trailers: [
      { id: "TR-1002", status: "Empty", location: "Yard B", lastUpdated: "1 day ago" },
      { id: "TR-1006", status: "In Service", location: "Processing Plant", lastUpdated: "3 hours ago" },
      { id: "TR-1009", status: "Preloaded", location: "Dock 1", lastUpdated: "2 hours ago" },
    ],
  },
  {
    id: 3,
    name: "EcoPlastics",
    trailers: [
      { id: "TR-1003", status: "In Route", location: "Interstate 80", lastUpdated: "45 minutes ago" },
      { id: "TR-1007", status: "Empty", location: "Yard C", lastUpdated: "5 hours ago" },
    ],
  },
  {
    id: 4,
    name: "PolymerTech",
    trailers: [
      { id: "TR-1004", status: "In Service", location: "Manufacturing Site", lastUpdated: "1 hour ago" },
      { id: "TR-1010", status: "Empty", location: "Yard A", lastUpdated: "6 hours ago" },
      { id: "TR-1011", status: "In Route", location: "Highway 70", lastUpdated: "15 minutes ago" },
    ],
  },
]

export function TrailerPoolsTable() {
  const [activeTab, setActiveTab] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Empty":
        return (
          <Badge variant="outline" className="bg-gray-100">
            Empty
          </Badge>
        )
      case "Preloaded":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Preloaded
          </Badge>
        )
      case "In Route":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800">
            In Route
          </Badge>
        )
      case "In Service":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            In Service
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap mb-4">
          <TabsTrigger value="all">All Buyers</TabsTrigger>
          {buyerPools.map((pool) => (
            <TabsTrigger key={pool.id} value={pool.name}>
              {pool.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-6">
            {buyerPools.map((pool) => (
              <Card key={pool.id} className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">{pool.name}</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                  </div>
                </div>
                <div className="overflow-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2">Trailer ID</th>
                        <th className="text-left py-2 px-2">Status</th>
                        <th className="text-left py-2 px-2">Location</th>
                        <th className="text-left py-2 px-2">Last Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pool.trailers.map((trailer) => (
                        <tr key={trailer.id} className="border-b">
                          <td className="py-2 px-2">{trailer.id}</td>
                          <td className="py-2 px-2">{getStatusBadge(trailer.status)}</td>
                          <td className="py-2 px-2">{trailer.location}</td>
                          <td className="py-2 px-2">{trailer.lastUpdated}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {buyerPools.map((pool) => (
          <TabsContent key={pool.id} value={pool.name}>
            <Card className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{pool.name}</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Pool
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash className="h-4 w-4 mr-1" />
                    Delete Pool
                  </Button>
                </div>
              </div>
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Trailer ID</th>
                      <th className="text-left py-2 px-2">Status</th>
                      <th className="text-left py-2 px-2">Location</th>
                      <th className="text-left py-2 px-2">Last Updated</th>
                      <th className="text-left py-2 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pool.trailers.map((trailer) => (
                      <tr key={trailer.id} className="border-b">
                        <td className="py-2 px-2">{trailer.id}</td>
                        <td className="py-2 px-2">{getStatusBadge(trailer.status)}</td>
                        <td className="py-2 px-2">{trailer.location}</td>
                        <td className="py-2 px-2">{trailer.lastUpdated}</td>
                        <td className="py-2 px-2">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
