import React, { useState } from 'react';

interface BlacklistManagerProps {
  entries: any[];
}

interface BlacklistItem {
  id: string;
  plateNumber: string;
  reason: string;
  addedDate: string;
  addedBy: string;
  status: 'active' | 'suspended';
}

const BlacklistManager: React.FC<BlacklistManagerProps> = ({ entries }) => {
  const [blacklist, setBlacklist] = useState<BlacklistItem[]>([
    { 
      id: '1',
      plateNumber: 'ABC-123', 
      reason: 'Suspicious activity detected', 
      addedDate: '2024-01-15',
      addedBy: 'Admin',
      status: 'active'
    },
    { 
      id: '2',
      plateNumber: 'XYZ-789', 
      reason: 'Unauthorized entry attempt', 
      addedDate: '2024-01-10',
      addedBy: 'Admin',
      status: 'active'
    },
    { 
      id: '3',
      plateNumber: 'DEF-456', 
      reason: 'Security violation - multiple infractions', 
      addedDate: '2024-01-08',
      addedBy: 'Admin',
      status: 'suspended'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newBlacklistItem, setNewBlacklistItem] = useState({
    plateNumber: '',
    reason: '',
    status: 'active' as 'active' | 'suspended'
  });

  const blacklistedEntries = entries.filter(entry => 
    blacklist.some(bl => bl.plateNumber === entry.plateNumber && bl.status === 'active')
  );

  const handleAddToBlacklist = () => {
    if (newBlacklistItem.plateNumber && newBlacklistItem.reason) {
      const newItem: BlacklistItem = {
        id: Date.now().toString(),
        plateNumber: newBlacklistItem.plateNumber.toUpperCase(),
        reason: newBlacklistItem.reason,
        addedDate: new Date().toISOString().split('T')[0],
        addedBy: 'Admin',
        status: newBlacklistItem.status
      };
      
      setBlacklist(prev => [...prev, newItem]);
      setNewBlacklistItem({ plateNumber: '', reason: '', status: 'active' });
      setShowAddForm(false);
    }
  };

  const handleRemoveFromBlacklist = (id: string) => {
    setBlacklist(prev => prev.filter(item => item.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: 'active' | 'suspended') => {
    setBlacklist(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const activeBlacklist = blacklist.filter(item => item.status === 'active');
  const suspendedBlacklist = blacklist.filter(item => item.status === 'suspended');

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Security Management</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {showAddForm ? 'Cancel' : 'Add to Blacklist'}
          </button>
        </div>

        {/* Add to Blacklist Form */}
        {showAddForm && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-4">
            <h3 className="text-lg font-semibold text-red-800 mb-4">Add Vehicle to Blacklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-red-700 mb-2">Plate Number</label>
                <input
                  type="text"
                  value={newBlacklistItem.plateNumber}
                  onChange={(e) => setNewBlacklistItem(prev => ({ ...prev, plateNumber: e.target.value }))}
                  placeholder="ABC-123"
                  className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-red-700 mb-2">Reason</label>
                <input
                  type="text"
                  value={newBlacklistItem.reason}
                  onChange={(e) => setNewBlacklistItem(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="Security violation"
                  className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-red-700 mb-2">Status</label>
                <select
                  value={newBlacklistItem.status}
                  onChange={(e) => setNewBlacklistItem(prev => ({ ...prev, status: e.target.value as 'active' | 'suspended' }))}
                  className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex space-x-3">
              <button
                onClick={handleAddToBlacklist}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Add to Blacklist
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Blacklist Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Blacklist */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-red-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Active Blacklist ({activeBlacklist.length})
            </h3>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
              BLOCKED
            </span>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {activeBlacklist.map((item) => (
              <div key={item.id} className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-red-800 text-lg">{item.plateNumber}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(item.id, 'suspended')}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold hover:bg-yellow-600 transition-colors"
                    >
                      Suspend
                    </button>
                    <button
                      onClick={() => handleRemoveFromBlacklist(item.id)}
                      className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-semibold hover:bg-gray-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="text-sm text-red-600 mb-2">{item.reason}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Added: {item.addedDate}</span>
                  <span>By: {item.addedBy}</span>
                </div>
              </div>
            ))}
            {activeBlacklist.length === 0 && (
              <p className="text-gray-500 text-center py-4">No active blacklist entries</p>
            )}
          </div>
        </div>

        {/* Suspended Blacklist */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-yellow-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Suspended ({suspendedBlacklist.length})
            </h3>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
              SUSPENDED
            </span>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {suspendedBlacklist.map((item) => (
              <div key={item.id} className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-yellow-800 text-lg">{item.plateNumber}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(item.id, 'active')}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold hover:bg-red-600 transition-colors"
                    >
                      Reactivate
                    </button>
                    <button
                      onClick={() => handleRemoveFromBlacklist(item.id)}
                      className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-semibold hover:bg-gray-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="text-sm text-yellow-600 mb-2">{item.reason}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Added: {item.addedDate}</span>
                  <span>By: {item.addedBy}</span>
                </div>
              </div>
            ))}
            {suspendedBlacklist.length === 0 && (
              <p className="text-gray-500 text-center py-4">No suspended entries</p>
            )}
          </div>
        </div>

        {/* Recent Flagged Entries */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-orange-500">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Flagged Entries</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {blacklistedEntries.length > 0 ? blacklistedEntries.slice(-8).map((entry) => (
              <div key={entry.id} className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-orange-800">{entry.plateNumber}</span>
                  <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    FLAGGED
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{entry.driverName}</p>
                <p className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</p>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">No flagged entries</p>
            )}
          </div>
        </div>
      </div>

      {/* Security Statistics */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Security Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{activeBlacklist.length}</div>
            <div className="text-sm text-red-600">Active Blocks</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{suspendedBlacklist.length}</div>
            <div className="text-sm text-yellow-600">Suspended</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{blacklistedEntries.length}</div>
            <div className="text-sm text-orange-600">Flagged Today</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{blacklist.length}</div>
            <div className="text-sm text-blue-600">Total Blacklist</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlacklistManager;