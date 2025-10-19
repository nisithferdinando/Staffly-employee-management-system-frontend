import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Users, Settings, BarChart3, FileText, Bell, Shield } from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(() => {
    // Get active item from memory or default to 'Dashboard'
    return 'Dashboard';
  });

  const menuItems = [
    { icon: Home, label: 'Dashboard', id: 'Dashboard' },
    { icon: Users, label: 'Users', id: 'Users' },
    { icon: BarChart3, label: 'Analytics', id: 'Analytics' },
    { icon: FileText, label: 'Reports', id: 'Reports' },
    { icon: Bell, label: 'Notifications', id: 'Notifications' },
    { icon: Settings, label: 'Settings', id: 'Settings' },
  ];

  const adminItems = [
    { icon: Shield, label: 'Administrator', id: 'Administrator' },
  ];

  const handleMenuClick = (itemId) => {
    setActiveItem(itemId);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 ease-in-out`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className={`font-bold text-xl text-gray-800 ${!sidebarOpen && 'hidden'}`}>
            Dashboard
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <div
                key={index}
                onClick={() => handleMenuClick(item.id)}
                className={`flex items-center px-4 py-3 mx-2 rounded-lg cursor-pointer transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} className="min-w-[20px]" />
                <span className={`ml-3 font-medium ${!sidebarOpen && 'hidden'}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </nav>

        {/* Administrator Section */}
        <div className="mt-6 px-2">
          <div className={`text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-2 ${!sidebarOpen && 'hidden'}`}>
            Admin
          </div>
          {adminItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <div
                key={index}
                onClick={() => handleMenuClick(item.id)}
                className={`flex items-center px-4 py-3 mx-2 rounded-lg cursor-pointer transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} className="min-w-[20px]" />
                <span className={`ml-3 font-medium ${!sidebarOpen && 'hidden'}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* User Profile */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className={`flex items-center p-3 bg-gray-50 rounded-lg ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              JD
            </div>
            <div className={`ml-3 ${!sidebarOpen && 'hidden'}`}>
              <div className="text-sm font-medium text-gray-800">John Doe</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome to Dashboard</h1>
          <p className="text-gray-600">Here's what's happening with your application today.</p>
        </div>

        {/* Sample Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">1,234</p>
            <p className="text-sm text-gray-500 mt-2">+12% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-green-600">$45,678</p>
            <p className="text-sm text-gray-500 mt-2">+8% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Orders</h3>
            <p className="text-3xl font-bold text-purple-600">892</p>
            <p className="text-sm text-gray-500 mt-2">+15% from last month</p>
          </div>
        </div>

        {/* Sample Chart Area */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Analytics Overview</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart component would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;