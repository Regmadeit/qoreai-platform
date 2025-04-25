export const demoData = {
  equipment: [
    {
      id: '1',
      name: 'CNC Machine A',
      status: 'operational',
      lastMaintenance: '2024-04-20',
      nextMaintenance: '2024-05-20',
    },
    {
      id: '2',
      name: 'Assembly Line B',
      status: 'needs_attention',
      lastMaintenance: '2024-04-15',
      nextMaintenance: '2024-05-15',
    },
  ],
  workOrders: [
    {
      id: '1',
      title: 'Routine Maintenance',
      equipment: 'CNC Machine A',
      status: 'completed',
      assignedTo: 'John Doe',
      dueDate: '2024-04-20',
    },
    {
      id: '2',
      title: 'Emergency Repair',
      equipment: 'Assembly Line B',
      status: 'in_progress',
      assignedTo: 'Jane Smith',
      dueDate: '2024-04-25',
    },
  ],
  team: [
    {
      id: '1',
      name: 'John Doe',
      role: 'Maintenance Technician',
      status: 'available',
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'Quality Engineer',
      status: 'busy',
    },
  ],
}; 