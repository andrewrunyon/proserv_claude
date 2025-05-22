import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Mail,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  MessageSquare,
  CreditCard
} from 'lucide-react';
import Badge from '../ui/Badge';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  icon: React.ReactNode;
}

const notifications: Notification[] = [
  {
    id: '1',
    title: 'New Document Upload',
    description: 'Tax return draft ready for review',
    time: '2 min ago',
    type: 'info',
    read: false,
    icon: <FileText size={16} className="text-primary" />
  },
  {
    id: '2',
    title: 'Meeting Reminder',
    description: 'Client review in 30 minutes',
    time: '30 min ago',
    type: 'warning',
    read: false,
    icon: <Calendar size={16} className="text-warning" />
  },
  {
    id: '3',
    title: 'Task Completed',
    description: 'Monthly bookkeeping finished',
    time: '2 hours ago',
    type: 'success',
    read: true,
    icon: <CheckCircle size={16} className="text-success" />
  },
  {
    id: '4',
    title: 'Payment Received',
    description: 'Invoice #2024-001 paid',
    time: '5 hours ago',
    type: 'success',
    read: true,
    icon: <CreditCard size={16} className="text-success" />
  }
];

export const UserMenu = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleViewAllNotifications = () => {
    navigate('/notifications');
    setShowNotifications(false);
  };

  const handleMarkAllAsRead = () => {
    // Handle marking all notifications as read
    // This would typically update state and make an API call
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Notifications */}
      <div className="relative">
        <button
          className="relative text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => {
            setShowNotifications(!showNotifications);
            setShowUserMenu(false);
          }}
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-error text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                <button 
                  className="text-sm text-primary hover:text-primary-dark"
                  onClick={handleMarkAllAsRead}
                >
                  Mark all as read
                </button>
              </div>
              
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-3 ${
                      notification.read ? 'opacity-75' : ''
                    }`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {notification.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={handleViewAllNotifications}
                  className="block w-full text-center px-4 py-2 text-sm text-primary hover:bg-gray-50 rounded-md transition-colors"
                >
                  View all notifications
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Menu */}
      <div className="relative">
        <button
          className="flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => {
            setShowUserMenu(!showUserMenu);
            setShowNotifications(false);
          }}
        >
          <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
            <User size={18} />
          </div>
          <span className="hidden text-sm font-medium text-gray-700 md:block">
            Jane Doe
          </span>
        </button>

        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
            <div className="p-2">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-gray-900">Jane Doe</p>
                <p className="text-xs text-gray-500">jane.doe@example.com</p>
              </div>
              
              <div className="border-t border-gray-200 my-2"></div>
              
              <button
                className="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => navigate('/settings')}
              >
                <Settings size={16} className="mr-2" />
                Settings
              </button>
              
              <button
                className="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => navigate('/profile')}
              >
                <User size={16} className="mr-2" />
                Profile
              </button>
              
              <div className="border-t border-gray-200 my-2"></div>
              
              <button className="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                <LogOut size={16} className="mr-2" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};