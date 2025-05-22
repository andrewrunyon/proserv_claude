import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Briefcase, 
  LayoutDashboard, 
  Users, 
  FileText, 
  CreditCard, 
  BarChart3, 
  Settings, 
  ChevronDown,
  X,
  Workflow,
  Bell,
  Globe,
  Lock,
  Layers,
  PenTool,
  FileSpreadsheet,
  FileCheck,
  FilePlus,
  Wallet,
  Repeat,
  BarChart,
  Pin,
  Mail,
  Shield,
  UserCog,
  Database,
  Layout,
  BellRing,
  BookTemplate
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  children?: {
    id: string;
    label: string;
    path: string;
  }[];
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    path: '/'
  },
  {
    id: 'clients',
    label: 'Clients',
    icon: <Users size={20} />,
    path: '/clients',
    children: [
      { id: 'clients-list', label: 'Clients', path: '/clients' },
      { id: 'clients-accounts', label: 'Accounts', path: '/clients/accounts' }
    ]
  },
  {
    id: 'services',
    label: 'Services',
    icon: <Layers size={20} />,
    path: '/services',
    children: [
      { id: 'services-library', label: 'Service Library', path: '/services' },
      { id: 'services-community', label: 'Community Library', path: '/services/community' }
    ]
  },
  {
    id: 'templates',
    label: 'Templates',
    icon: <BookTemplate size={20} />,
    path: '/templates',
    children: [
      { id: 'templates-intake', label: 'Intake', path: '/templates/intake' },
      { id: 'templates-invoices', label: 'Invoices', path: '/templates/invoices' },
      { id: 'templates-proposals', label: 'Proposals', path: '/templates/proposals' },
      { id: 'templates-contracts', label: 'Contracts', path: '/templates/contracts' },
      { id: 'templates-custom', label: 'Custom', path: '/templates/custom' }
    ]
  },
  {
    id: 'jobs',
    label: 'Jobs',
    icon: <Briefcase size={20} />,
    path: '/jobs',
    children: [
      { id: 'jobs-tasks', label: 'Task Center', path: '/jobs/tasks' },
      { id: 'jobs-inbox', label: 'Inbox', path: '/jobs/inbox' },
      { id: 'jobs-documents', label: 'Documents', path: '/jobs/documents' }
    ]
  },
  {
    id: 'automations',
    label: 'Automations',
    icon: <Workflow size={20} />,
    path: '/automations',
    children: [
      { id: 'automations-workflows', label: 'Workflows', path: '/automations/workflows' },
      { id: 'automations-recurring', label: 'Recurring Jobs', path: '/automations/recurring' },
      { id: 'automations-reminders', label: 'Document Reminders', path: '/automations/reminders' },
      { id: 'automations-community', label: 'Community Library', path: '/automations/community' }
    ]
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: <CreditCard size={20} />,
    path: '/billing',
    children: [
      { id: 'billing-invoices', label: 'Invoices', path: '/billing/invoices' },
      { id: 'billing-payments', label: 'Payments', path: '/billing/payments' },
      { id: 'billing-subscriptions', label: 'Subscriptions', path: '/billing/subscriptions' }
    ]
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <BarChart3 size={20} />,
    path: '/reports',
    children: [
      { id: 'reports-designer', label: 'Designer', path: '/reports/designer' },
      { id: 'reports-community', label: 'Community Library', path: '/reports/community' }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={20} />,
    path: '/settings',
    children: [
      { id: 'settings-firm', label: 'Firm Settings', path: '/settings/firm' },
      { id: 'settings-team', label: 'Team & Roles', path: '/settings/team' },
      { id: 'settings-email', label: 'Email & Communication', path: '/settings/email' },
      { id: 'settings-documents', label: 'Document Settings', path: '/settings/documents' },
      { id: 'settings-integrations', label: 'Integrations', path: '/settings/integrations' },
      { id: 'settings-fields', label: 'Custom Fields', path: '/settings/fields' },
      { id: 'settings-portal', label: 'Client Portal', path: '/settings/portal' },
      { id: 'settings-security', label: 'Security & Privacy', path: '/settings/security' },
      { id: 'settings-billing', label: 'Billing Preferences', path: '/settings/billing' },
      { id: 'settings-notifications', label: 'Notifications & Reminders', path: '/settings/notifications' }
    ]
  }
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const [isPinned, setPinned] = useState(true);
  const location = useLocation();

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out
    ${isPinned ? 'lg:relative' : 'lg:fixed'}
    ${open || isPinned ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
  `;

  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const shouldShowChildren = (item: NavItem) => {
    return isActiveRoute(item.path) && item.children;
  };

  return (
    <aside className={sidebarClasses}>
      <div className="flex h-full flex-col">
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center">
            <img 
              src="/proserv-logo.svg" 
              alt="ProServ" 
              className="h-8"
            />
          </div>
          <div className="flex items-center">
            <button 
              onClick={() => setPinned(!isPinned)}
              className="mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
            >
              <Pin size={16} className={isPinned ? "text-primary" : ""} />
            </button>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <div key={item.id} className="mb-2">
              <Link
                to={item.path}
                className={`
                  flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors
                  ${isActiveRoute(item.path) 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.children && (
                  <ChevronDown size={16} className={`transition-transform ${shouldShowChildren(item) ? 'rotate-180' : ''}`} />
                )}
              </Link>
              
              {shouldShowChildren(item) && (
                <div className="mt-1 ml-8 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.id}
                      to={child.path}
                      className={`
                        block rounded-lg px-3 py-2 text-sm transition-colors
                        ${isActiveRoute(child.path)
                          ? 'bg-primary/5 text-primary'
                          : 'text-gray-600 hover:bg-gray-100'
                        }
                      `}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;