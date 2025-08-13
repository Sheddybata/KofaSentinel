import React, { useState } from 'react';
import Receipt from './Receipt';

interface VehicleEntry {
  id: string;
  plateNumber: string;
  vehicleType: string;
  driverName: string;
  purpose: string;
  timestamp: string;
}

interface GuardInterfaceProps {
  onLogout: () => void;
  onAddEntry: (entry: Omit<VehicleEntry, 'id' | 'timestamp'>) => void;
}

const GuardInterface: React.FC<GuardInterfaceProps> = ({ onLogout, onAddEntry }) => {
  const [plateNumber, setPlateNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [driverName, setDriverName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<VehicleEntry | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: VehicleEntry = {
      id: Date.now().toString(),
      plateNumber,
      vehicleType,
      driverName,
      purpose,
      timestamp: new Date().toISOString()
    };
    
    onAddEntry({
      plateNumber,
      vehicleType,
      driverName,
      purpose
    });
    
    // Set current entry and show receipt
    setCurrentEntry(newEntry);
    setShowReceipt(true);
    setShowSuccess(true);
    
    // Reset form
    setPlateNumber('');
    setVehicleType('');
    setDriverName('');
    setPurpose('');
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setCurrentEntry(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <img 
                src="/KofaSentinel logo main BB.png" 
                alt="KofaSentinel Logo" 
                className="w-16 h-16 rounded-[10%] shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Guard Station
                </h1>
                <p className="text-sm text-gray-600 mt-1">KofaSentinel Security System</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Plate Number</label>
                <input
                  type="text"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Vehicle Type</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Car">Car</option>
                  <option value="Truck">Truck</option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Bus">Bus</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Driver Name</label>
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Purpose of Visit</label>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors h-24 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Log Vehicle Entry
            </button>
          </form>
        </div>
      </div>

      {/* Show Receipt Modal */}
      {showReceipt && currentEntry && (
        <Receipt entry={currentEntry} onClose={handleCloseReceipt} />
      )}

      {/* Show Success Message */}
      {showSuccess && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Vehicle entry logged successfully!
        </div>
      )}
    </div>
  );
};

export default GuardInterface;