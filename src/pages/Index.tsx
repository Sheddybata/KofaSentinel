import React, { useState } from 'react';
import Login from '../components/Login';
import GuardInterface from '../components/GuardInterface';
import AdminDashboard from '../components/AdminDashboard';

interface VehicleEntry {
  id: string;
  plateNumber: string;
  vehicleType: string;
  driverName: string;
  purpose: string;
  timestamp: string;
}

const Index: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<'guard' | 'admin' | null>(null);
  const [entries, setEntries] = useState<VehicleEntry[]>([
    // Today's entries
    {
      id: '1',
      plateNumber: 'ABC-123',
      vehicleType: 'Car',
      driverName: 'John Doe',
      purpose: 'Business meeting',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      plateNumber: 'XYZ-789',
      vehicleType: 'Truck',
      driverName: 'Jane Smith',
      purpose: 'Delivery',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: '3',
      plateNumber: 'DEF-456',
      vehicleType: 'SUV',
      driverName: 'Mike Johnson',
      purpose: 'Client visit',
      timestamp: new Date(Date.now() - 7200000).toISOString()
    },
    {
      id: '4',
      plateNumber: 'GHI-789',
      vehicleType: 'Van',
      driverName: 'Sarah Wilson',
      purpose: 'Equipment transport',
      timestamp: new Date(Date.now() - 10800000).toISOString()
    },
    {
      id: '5',
      plateNumber: 'JKL-012',
      vehicleType: 'Car',
      driverName: 'David Brown',
      purpose: 'Interview',
      timestamp: new Date(Date.now() - 14400000).toISOString()
    },
    // Yesterday's entries
    {
      id: '6',
      plateNumber: 'MNO-345',
      vehicleType: 'Truck',
      driverName: 'Lisa Davis',
      purpose: 'Supply delivery',
      timestamp: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '7',
      plateNumber: 'PQR-678',
      vehicleType: 'Car',
      driverName: 'Tom Anderson',
      purpose: 'Consultation',
      timestamp: new Date(Date.now() - 90000000).toISOString()
    },
    {
      id: '8',
      plateNumber: 'STU-901',
      vehicleType: 'SUV',
      driverName: 'Emma Taylor',
      purpose: 'Site inspection',
      timestamp: new Date(Date.now() - 93600000).toISOString()
    },
    // Earlier entries for analytics
    {
      id: '9',
      plateNumber: 'VWX-234',
      vehicleType: 'Van',
      driverName: 'Chris Lee',
      purpose: 'Maintenance',
      timestamp: new Date(Date.now() - 172800000).toISOString()
    },
    {
      id: '10',
      plateNumber: 'YZA-567',
      vehicleType: 'Car',
      driverName: 'Alex Garcia',
      purpose: 'Training session',
      timestamp: new Date(Date.now() - 259200000).toISOString()
    },
    {
      id: '11',
      plateNumber: 'BCD-890',
      vehicleType: 'Truck',
      driverName: 'Rachel Kim',
      purpose: 'Material pickup',
      timestamp: new Date(Date.now() - 345600000).toISOString()
    },
    {
      id: '12',
      plateNumber: 'EFG-123',
      vehicleType: 'SUV',
      driverName: 'Kevin Chen',
      purpose: 'Team meeting',
      timestamp: new Date(Date.now() - 432000000).toISOString()
    }
  ]);

  const handleLogin = (userType: 'guard' | 'admin') => {
    setCurrentUser(userType);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleAddEntry = (entryData: Omit<VehicleEntry, 'id' | 'timestamp'>) => {
    const newEntry: VehicleEntry = {
      ...entryData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    setEntries(prev => [...prev, newEntry]);
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  if (currentUser === 'guard') {
    return <GuardInterface onLogout={handleLogout} onAddEntry={handleAddEntry} />;
  }

  return <AdminDashboard onLogout={handleLogout} entries={entries} />;
};

export default Index;