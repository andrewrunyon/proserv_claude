import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Users,
  Clock,
  DollarSign,
  FileText,
  Calendar,
  BarChart3,
  Settings,
  MessageSquare,
  Tag,
  Building2,
  Mail,
  Phone,
  ChevronRight
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

interface Account {
  id: string;
  name: string;
  type: 'company' | 'individual' | 'family';
  status: 'active' | 'inactive' | 'prospect';
  description?: string;
  primaryContact: {
    name: string;
    email: string;
    phone: string;
  };
  address: string;
  owner: {
    name: string;
    email: string;
  };
  tags: string[];
  clientCount: number;
  metrics: {
    activeJobs: number;
    completedJobs: number;
    revenue: {
      current: number;
      previous: number;
    };
  };
  recentActivity: {
    type: 'job' | 'document' | 'invoice' | 'message';
    description: string;
    date: string;
  }[];
}

const mockAccountData: Record<string, Account> = {
  '1': {
    id: '1',
    name: 'Acme Corporation',
    type: 'company',
    status: 'active',
    description: 'Global technology solutions provider',
    primaryContact: {
      name: 'John Smith',
      email: 'john@acme.com',
      phone: '(555) 123-4567'
    },
    address: '123 Business Ave, Suite 100, San Francisco, CA 94107',
    owner: {
      name: 'Sarah Wilson',
      email: 'sarah@proserv.com'
    },
    tags: ['Enterprise', 'Technology', 'Global'],
    clientCount: 5,
    metrics: {
      activeJobs: 3,
      completedJobs: 12,
      revenue: {
        current: 150000,
        previous: 125000
      }
    },
    recentActivity: [
      {
        type: 'job',
        description: 'Tax Return 2023 completed',
        date: '2024-03-15'
      },
      {
        type: 'invoice',
        description: 'Invoice #2024-001 paid',
        date: '2024-03-10'
      },
      {
        type: 'document',
        description: 'Q4 Financial Report uploaded',
        date: '2024-03-05'
      }
    ]
  }
};

const AccountProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const account = id ? mockAccountData[id] : null;

  if (!account) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Account Not Found</h2>
        <p className="text-gray-500 mt-2">The requested account does not exist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <button
              className="hover:text-primary"
              onClick={() => navigate('/clients/accounts')}
            >
              Accounts
            </button>
            <ChevronRight size={16} />
            <span>{account.name}</span>
          </div>
          <div className="mt-2 flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">{account.name}</h1>
            <Badge variant={
              account.status === 'active' ? 'success' :
              account.status === 'prospect' ? 'warning' : 'secondary'
            } className="ml-3">
              {account.status}
            </Badge>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Edit Account</Button>
          <Button>Create Job</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Type</h4>
                <p className="mt-1 capitalize">{account.type}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Owner</h4>
                <p className="mt-1">{account.owner.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Primary Contact</h4>
                <p className="mt-1">{account.primaryContact.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Email</h4>
                <a href={`mailto:${account.primaryContact.email}`} className="mt-1 text-primary hover:underline">
                  {account.primaryContact.email}
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Address</h4>
              <p className="mt-1 text-gray-600">{account.address}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Tags</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {account.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Active Jobs</span>
              <span className="font-medium">{account.metrics.activeJobs}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Completed Jobs</span>
              <span className="font-medium">{account.metrics.completedJobs}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Associated Clients</span>
              <span className="font-medium">{account.clientCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Revenue YTD</span>
              <span className="font-medium">${account.metrics.revenue.current.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {account.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="mt-1 rounded-full bg-primary/10 p-1">
                    {activity.type === 'job' && <FileText size={14} className="text-primary" />}
                    {activity.type === 'invoice' && <DollarSign size={14} className="text-primary" />}
                    {activity.type === 'document' && <FileText size={14} className="text-primary" />}
                    {activity.type === 'message' && <MessageSquare size={14} className="text-primary" />}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" leftIcon={<Users size={16} />}>
                View Clients
              </Button>
              <Button variant="outline" className="w-full justify-start" leftIcon={<FileText size={16} />}>
                View Documents
              </Button>
              <Button variant="outline" className="w-full justify-start" leftIcon={<Settings size={16} />}>
                Account Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountProfile;