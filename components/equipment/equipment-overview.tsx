import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Equipment } from "@/types/equipment"

interface EquipmentOverviewProps {
  equipment: Equipment
}

export function EquipmentOverview({ equipment }: EquipmentOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">General Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Manufacturer</span>
                <span className="font-medium">{equipment.manufacturer}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Model</span>
                <span className="font-medium">{equipment.model}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Serial Number</span>
                <span className="font-medium">{equipment.serialNumber}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Installation Date</span>
                <span className="font-medium">{equipment.installDate}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">{equipment.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
            <div className="space-y-3">
              {equipment.manufacturer === "Stadler" && equipment.name.includes("Optical Sorter") && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sorting Width</span>
                    <span className="font-medium">1600 mm</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sorting Technology</span>
                    <span className="font-medium">NIR (Near-Infrared)</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="font-medium">8 tons/hour</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Power Consumption</span>
                    <span className="font-medium">12 kW</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Air Pressure</span>
                    <span className="font-medium">8 bar</span>
                  </div>
                </>
              )}

              {equipment.manufacturer === "Stadler" && equipment.name.includes("Ballistic") && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Working Width</span>
                    <span className="font-medium">5000 mm</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Number of Paddles</span>
                    <span className="font-medium">6</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="font-medium">12 tons/hour</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Power Consumption</span>
                    <span className="font-medium">15 kW</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Screen Size</span>
                    <span className="font-medium">50 mm</span>
                  </div>
                </>
              )}

              {equipment.manufacturer === "Krones" && equipment.name.includes("Washline") && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Washing Capacity</span>
                    <span className="font-medium">2000 kg/h</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Water Consumption</span>
                    <span className="font-medium">2.5 m³/h</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Operating Temperature</span>
                    <span className="font-medium">85°C</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Power Consumption</span>
                    <span className="font-medium">180 kW</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Caustic Concentration</span>
                    <span className="font-medium">3%</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Description</h3>
          <p>{equipment.description}</p>

          {equipment.manufacturer === "Stadler" && equipment.name.includes("Optical Sorter") && (
            <div className="mt-4 space-y-2">
              <p>
                The Stadler UniSort PR 1600 is a high-performance optical sorting system designed for efficient
                separation of different polymer types. Key features include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Advanced NIR (Near-Infrared) spectroscopy for accurate material identification</li>
                <li>High-speed valve block with 128 individually controlled air jets</li>
                <li>Integrated self-cleaning system for optical components</li>
                <li>User-friendly touchscreen interface with remote monitoring capabilities</li>
                <li>Modular design for easy maintenance and upgrades</li>
              </ul>
            </div>
          )}

          {equipment.manufacturer === "Stadler" && equipment.name.includes("Ballistic") && (
            <div className="mt-4 space-y-2">
              <p>
                The Stadler STT 5000 Ballistic Separator is designed for efficient separation of mixed materials into 3D
                (rolling) and 2D (flat) fractions. Key features include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Robust paddle design with hardened steel for extended service life</li>
                <li>Adjustable inclination angle (10° to 25°) for optimal separation</li>
                <li>Interchangeable screen panels with various perforation sizes</li>
                <li>Dynamic balancing system to minimize vibration</li>
                <li>Heavy-duty drive system with automatic lubrication</li>
              </ul>
            </div>
          )}

          {equipment.manufacturer === "Krones" && equipment.name.includes("Washline") && (
            <div className="mt-4 space-y-2">
              <p>
                The Krones MetaPure W-PET 2000 is a comprehensive washing system for PET flakes, ensuring high-quality
                output for food-grade recycling. Key features include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Multi-stage washing process with hot caustic treatment</li>
                <li>Integrated foreign material separation (metals, labels, caps)</li>
                <li>Advanced water treatment and recycling system</li>
                <li>Continuous process monitoring with automated adjustment</li>
                <li>Energy-efficient design with heat recovery systems</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
