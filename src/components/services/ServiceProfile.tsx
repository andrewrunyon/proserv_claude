import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Users,
  Clock,
  DollarSign,
  FileText,
  Calendar,
  BarChart3,
  Settings,
  MessageSquare
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

const ServiceProfile: React.FC = () => {
  const { id } = useParams();

  // Mock service data
  const service = {
    id,
    name: 'Tax Return Preparation',
    description: 'Comprehensive tax return preparation service for individuals and small businesses.',
    status: 'active',
    pipeline: 'Standard Pipeline',
    defaultAssignee: 'John Smith',
    price: '$299.99',
    estimatedHours: '4',
    activeClients: 12,
    avgCompletionTime: '3.5 days',
    revenueYTD: '$24,500',
    lastModified: '2 days ago',
    documents: [
      'W-2 Form',
      'Previous Tax Returns',
      'Business Income Statement',
      'Expense Records'
    ],
    recentActivity: [
      {
        type: 'client',
        description: 'New client assigned',
        time: '2 hours ago',
        user: 'Jane Doe'
      },
      {
        type: 'update',
        description: 'Service price updated',
        time: '1 day ago',
        user: 'John Smith'
      },
      {
        type: 'document',
        description: 'New document template added',
        time: '3 days ago',
        user: 'Sarah Wilson'
      }
    ]
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">{service.name}</h1>
            <Badge variant="success" className="ml-3">Active</Badge>
          </div>
          <p className="mt-1 text-sm text-gray-500">Last modified {service.lastModified}</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            leftIcon={<Settings size={16} />}
          >
            Settings
          </Button>
          <Button
            variant="primary"
            leftIcon={<Users size={16} />}
          >
            Assign Client
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Clients</p>
                <h3 className="text-xl font-semibold text-gray-900">{service.activeClients}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-success/10 p-3">
                <Clock className="h-6 w-6 text-success" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg. Completion</p>
                <h3 className="text-xl font-semibold text-gray-900">{service.avgCompletionTime}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-secondary/10 p-3">
                <DollarSign className="h-6 w-6 text-secondary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Revenue (YTD)</p>
                <h3 className="text-xl font-semibold text-gray-900">{service.revenueYTD}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Description</h4>
                  <p className="mt-1 text-sm text-gray-600">{service.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Pipeline</h4>
                    <p className="mt-1 text-sm text-gray-600">{service.pipeline}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Default Assignee</h4>
                    <p className="mt-1 text-sm text-gray-600">{service.defaultAssignee}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Price</h4>
                    <p className="mt-1 text-sm text-gray-600">{service.price}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Estimated Hours</h4>
                    <p className="mt-1 text-sm text-gray-600">{service.estimatedHours}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700">Required Documents</h4>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {service.documents.map((doc, index) => (
                      <div key={index} className="flex items-center rounded-md border border-gray-200 p-2">
                        <FileText size={16} className="text-gray-500" />
                        <span className="ml-2 text-sm text-gray-600">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  Upcoming Work
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Acme Corp</p>
                      <p className="text-xs text-gray-500">Due in 3 days</p>
                    </div>
                    <Badge variant="warning">In Progress</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">TechStart LLC</p>
                      <p className="text-xs text-gray-500">Due in 5 days</p>
                    </div>
                    <Badge variant="primary">Not Started</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Global Solutions</p>
                      <p className="text-xs text-gray-500">Due in 1 week</p>
                    </div>
                    <Badge variant="primary">Not Started</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 size={18} className="mr-2" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">On-time Completion</span>
                      <span className="font-medium text-gray-900">92%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-success" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Client Satisfaction</span>
                      <span className="font-medium text-gray-900">4.8/5</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-primary" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Resource Utilization</span>
                      <span className="font-medium text-gray-900">85%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-warning" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare size={18} className="mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {service.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="mt-1 rounded-full bg-primary/10 p-1">
                      <Users size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                        <span>{activity.user}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" leftIcon={<Users size={16} />}>
                  View All Clients
                </Button>
                <Button variant="outline" className="w-full justify-start" leftIcon={<FileText size={16} />}>
                  Manage Documents
                </Button>
                <Button variant="outline" className="w-full justify-start" leftIcon={<Settings size={16} />}>
                  Edit Service
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceProfile;