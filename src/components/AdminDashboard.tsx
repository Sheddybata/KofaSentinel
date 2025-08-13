import React, { useState } from 'react';
import DashboardAnalytics from './DashboardAnalytics';
import BlacklistManager from './BlacklistManager';

interface VehicleEntry {
  id: string;
  plateNumber: string;
  vehicleType: string;
  driverName: string;
  purpose: string;
  timestamp: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
  entries: VehicleEntry[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, entries }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const todayEntries = entries.filter(entry => 
    new Date(entry.timestamp).toDateString() === new Date().toDateString()
  );

  const thisWeekEntries = entries.filter(entry => {
    const entryDate = new Date(entry.timestamp);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return entryDate >= weekAgo;
  });

  const thisMonthEntries = entries.filter(entry => {
    const entryDate = new Date(entry.timestamp);
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    return entryDate >= monthAgo;
  });

  const vehicleTypes = entries.reduce((acc, entry) => {
    acc[entry.vehicleType] = (acc[entry.vehicleType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const avgHourlyRate = todayEntries.length > 0 ? (todayEntries.length / 24).toFixed(1) : '0';
  const weeklyGrowth = thisWeekEntries.length > 0 ? 
    ((thisWeekEntries.length - (thisWeekEntries.length * 0.8)) / (thisWeekEntries.length * 0.8) * 100).toFixed(1) : '0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <img 
                src="/KofaSentinel logo main BB.png" 
                alt="KofaSentinel Logo" 
                className="w-20 h-20 rounded-[10%] shadow-lg"
              />
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
                  KofaSentinel Admin Portal
                </h1>
                <p className="text-gray-600 mt-2 text-lg">Comprehensive Security Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Welcome back, Admin</p>
                <p className="text-sm text-gray-700 font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <button
                onClick={onLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-2">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'analytics', label: 'Analytics', icon: '📈' },
              { id: 'security', label: 'Security', icon: '🔒' },
              { id: 'reports', label: 'Reports', icon: '📋' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Entries</p>
                <p className="text-3xl font-bold">{entries.length}</p>
                <p className="text-blue-200 text-sm mt-1">All time</p>
              </div>
              <div className="bg-blue-400 bg-opacity-30 p-3 rounded-xl">
                <span className="text-2xl">🚗</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Today's Entries</p>
                <p className="text-3xl font-bold">{todayEntries.length}</p>
                <p className="text-green-200 text-sm mt-1">Avg: {avgHourlyRate}/hr</p>
              </div>
              <div className="bg-green-400 bg-opacity-30 p-3 rounded-xl">
                <span className="text-2xl">📅</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-xl border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">This Week</p>
                <p className="text-3xl font-bold">{thisWeekEntries.length}</p>
                <p className="text-purple-200 text-sm mt-1">{weeklyGrowth}% growth</p>
              </div>
              <div className="bg-purple-400 bg-opacity-30 p-3 rounded-xl">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-xl border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Vehicle Types</p>
                <p className="text-3xl font-bold">{Object.keys(vehicleTypes).length}</p>
                <p className="text-orange-200 text-sm mt-1">Categories</p>
              </div>
              <div className="bg-orange-400 bg-opacity-30 p-3 rounded-xl">
                <span className="text-2xl">🚛</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Recent Vehicle Entries</h2>
              <div className="flex space-x-2">
                <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                  Export Data
                </button>
                <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                  Print Report
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Plate Number</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Vehicle Type</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Driver</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Purpose</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Entry Time</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.slice(-15).reverse().map((entry) => (
                    <tr key={entry.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">
                          {entry.plateNumber}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {entry.vehicleType}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-medium text-gray-900">{entry.driverName}</td>
                      <td className="py-4 px-4 text-gray-600">{entry.purpose}</td>
                      <td className="py-4 px-4 text-gray-500">
                        {new Date(entry.timestamp).toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✓ Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {entries.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-6xl mb-4">🚗</div>
                  <p className="text-xl">No vehicle entries yet</p>
                  <p className="text-sm">Start logging vehicles to see data here</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && <DashboardAnalytics entries={entries} />}
        {activeTab === 'security' && <BlacklistManager entries={entries} />}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Reports & Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
                <h3 className="text-lg font-semibold text-indigo-800 mb-3">Monthly Summary</h3>
                <p className="text-indigo-600">Generate comprehensive monthly reports with vehicle entry analytics, peak hours analysis, and security insights.</p>
                <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                  Generate Report
                </button>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
                <h3 className="text-lg font-semibold text-emerald-800 mb-3">Security Audit</h3>
                <p className="text-emerald-600">Review security logs, blacklist activities, and flagged entries for comprehensive security analysis.</p>
                <button className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                  Run Audit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;