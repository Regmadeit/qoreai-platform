import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const shipments = [
  {
    id: "SH-2023-1234",
    origin: "Warehouse A",
    destination: "Customer Site 1",
    status: "in-transit",
    eta: "Apr 25, 2025",
  },
  {
    id: "SH-2023-1235",
    origin: "Supplier B",
    destination: "Warehouse A",
    status: "delivered",
    eta: "Apr 23, 2025",
  },
  {
    id: "SH-2023-1236",
    origin: "Warehouse A",
    destination: "Customer Site 3",
    status: "in-transit",
    eta: "Apr 26, 2025",
  },
  {
    id: "SH-2023-1237",
    origin: "Supplier C",
    destination: "Warehouse B",
    status: "delayed",
    eta: "Apr 28, 2025",
  },
  {
    id: "SH-2023-1238",
    origin: "Warehouse B",
    destination: "Customer Site 2",
    status: "in-transit",
    eta: "Apr 27, 2025",
  },
]

export function ShipmentTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>ETA</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shipments.map((shipment) => (
            <TableRow key={shipment.id}>
              <TableCell className="font-medium">{shipment.id}</TableCell>
              <TableCell>{shipment.origin}</TableCell>
              <TableCell>{shipment.destination}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    shipment.status === "delivered"
                      ? "border-green-500 text-green-500"
                      : shipment.status === "in-transit"
                        ? "border-blue-500 text-blue-500"
                        : "border-red-500 text-red-500"
                  }
                >
                  {shipment.status === "in-transit"
                    ? "In Transit"
                    : shipment.status === "delivered"
                      ? "Delivered"
                      : "Delayed"}
                </Badge>
              </TableCell>
              <TableCell>{shipment.eta}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
