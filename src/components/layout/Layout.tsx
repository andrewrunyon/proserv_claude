import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { Menu } from 'lucide-react';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
      
      {/* Content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header>
          <button 
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary lg:hidden"
          >
            <Menu size={24} />
          </button>
        </Header>
        
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;