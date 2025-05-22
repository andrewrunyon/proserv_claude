import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  Building, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Tag,
  CheckSquare,
  ChevronRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface ClientDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  tags: string[];
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActivity: string;
  outstandingBalance: number;
  completedJobs: number;
  activeJobs: number;
}

const mockClientData: Record<string, ClientDetails> = {
  '1': {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    company: 'Acme Corp',
    address: '123 Business Ave, Suite 100, San Francisco, CA 94107',
    tags: ['VIP', 'Enterprise'],
    status: 'active',
    joinDate: '2023-01-15',
    lastActivity: '2024-02-15',
    outstandingBalance: 1500,
    completedJobs: 12,
    activeJobs: 3
  },
  // Add more mock clients as needed
};

const ClientProfile: React.FC = () => {
  const { id } = useParams();
  const client = id ? mockClientData[id] : null;

  if (!client) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Client Not Found</h2>
        <p className="text-gray-500 mt-2">The requested client profile does not exist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {client.firstName} {client.lastName}
          </h2>
          <p className="text-sm text-gray-500">{client.company}</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Edit Profile</Button>
          <Button>Create Job</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href={`mailto:${client.email}`} className="text-primary hover:underline">
                    {client.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">{client.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Building className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="text-gray-900">{client.company}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-900">{client.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Status</span>
              <Badge variant={
                client.status === 'active' ? 'success' : 
                client.status === 'pending' ? 'warning' : 'error'
              }>
                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Join Date</span>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                <span>{new Date(client.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Last Activity</span>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                <span>{new Date(client.lastActivity).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Tags</span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {client.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="flex items-center">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Outstanding Balance</p>
                  <p className="text-xl font-semibold text-gray-900">
                    ${client.outstandingBalance.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-success/10 p-3">
                  <CheckSquare className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed Jobs</p>
                  <p className="text-xl font-semibold text-gray-900">{client.completedJobs}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-warning/10 p-3">
                  <CheckSquare className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Jobs</p>
                  <p className="text-xl font-semibold text-gray-900">{client.activeJobs}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientProfile;