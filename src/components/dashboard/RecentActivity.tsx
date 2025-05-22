import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, CreditCard, MessageSquare } from 'lucide-react';
import Badge from '../ui/Badge';

interface Activity {
  id: number;
  type: 'client' | 'document' | 'invoice' | 'message';
  title: string;
  description: string;
  time: string;
  user?: string;
  link: string;
}

const activities: Activity[] = [
  {
    id: 1,
    type: 'client',
    title: 'New client created',
    description: 'Acme Corporation was added as a new client',
    time: '2 hours ago',
    user: 'Jane Doe',
    link: '/clients/1'
  },
  {
    id: 2,
    type: 'document',
    title: 'Document uploaded',
    description: 'Tax return 2023 was uploaded for Johnson Inc.',
    time: '4 hours ago',
    user: 'John Smith',
    link: '/documents'
  },
  {
    id: 3,
    type: 'invoice',
    title: 'Invoice paid',
    description: 'Invoice #INV-2023-089 was paid by Globex Corp',
    time: 'Yesterday',
    user: 'Jane Doe',
    link: '/billing/invoices'
  },
  {
    id: 4,
    type: 'message',
    title: 'New message',
    description: 'Sandra Lee sent a message regarding project timeline',
    time: '2 days ago',
    link: '/jobs/inbox'
  },
];

const activityIcons = {
  client: <Users size={16} className="text-primary" />,
  document: <FileText size={16} className="text-secondary" />,
  invoice: <CreditCard size={16} className="text-success" />,
  message: <MessageSquare size={16} className="text-accent" />,
};

const RecentActivity: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-5 py-4">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="px-5 py-4 cursor-pointer hover:bg-gray-50"
            onClick={() => navigate(activity.link)}
          >
            <div className="flex items-start">
              <div className="mr-3 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                {activityIcons[activity.type]}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {activity.time}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-gray-500">{activity.description}</p>
                {activity.user && (
                  <p className="mt-1 text-xs text-gray-400">by {activity.user}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 px-5 py-3">
        <button 
          className="text-sm font-medium text-primary hover:text-primary-dark"
          onClick={() => navigate('/jobs/tasks')}
        >
          View all activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;