"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dashboard } from '@/components/dashboard';

type ComponentType = 'dashboard' | 'equipment' | 'maintenance';

interface ComponentConfig {
  name: string;
  props: Record<string, 'string' | 'boolean'>;
  component: React.ComponentType<any>;
}

const components = {
  dashboard: {
    name: 'Dashboard',
    component: Dashboard,
    props: {
      title: 'string',
      showStats: 'boolean',
    },
  },
  equipment: {
    name: 'Equipment List',
    component: Dashboard, // Temporarily using Dashboard as placeholder
    props: {
      sortBy: 'string',
      filterStatus: 'string',
    },
  },
  maintenance: {
    name: 'Maintenance Schedule',
    component: Dashboard, // Temporarily using Dashboard as placeholder
    props: {
      view: 'string',
      date: 'string',
    },
  },
} as const;

export default function DevPreview() {
  const [activeComponent, setActiveComponent] = useState<ComponentType>('dashboard');
  const [customProps, setCustomProps] = useState<Record<string, string | boolean>>({});

  const ActiveComponent = components[activeComponent].component;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">QoreAi Development Preview</h1>
      
      <div className="grid grid-cols-12 gap-6">
        {/* Component Selector */}
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(Object.entries(components) as [ComponentType, typeof components[ComponentType]][]).map(([key, component]) => (
                  <Button
                    key={key}
                    variant={activeComponent === key ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setActiveComponent(key)}
                  >
                    {component.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Area */}
        <div className="col-span-9">
          <Card>
            <CardHeader>
              <CardTitle>Preview: {components[activeComponent].name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="props">Props</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="p-4 border rounded-lg min-h-[400px]">
                  <div className="h-full">
                    <ActiveComponent {...customProps} />
                  </div>
                </TabsContent>

                <TabsContent value="props">
                  <div className="space-y-4">
                    {Object.entries(components[activeComponent].props).map(([prop, type]) => (
                      <div key={prop}>
                        <Label>{prop}</Label>
                        <Input 
                          type={type === 'boolean' ? 'checkbox' : 'text'}
                          placeholder={`Enter ${prop}...`}
                          onChange={(e) => {
                            setCustomProps(prev => ({
                              ...prev,
                              [prop]: type === 'boolean' ? e.target.checked : e.target.value
                            }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="code" className="p-4 border rounded-lg">
                  <pre className="text-sm">
                    {`// Example usage of ${components[activeComponent].name}
import { ${activeComponent} } from '@/components/${activeComponent}';

export default function Example() {
  return (
    <${activeComponent} 
      ${Object.entries(customProps)
        .map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
        .join('\n      ')}
    />
  );
}`}
                  </pre>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 