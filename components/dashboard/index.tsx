"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardProps {
  title?: string;
  showStats?: boolean;
}

export function Dashboard({ title = 'Dashboard', showStats = true }: DashboardProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      
      {showStats && (
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">85%</p>
              <p className="text-sm text-muted-foreground">Operational</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Work Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">8/10</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 