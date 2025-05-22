import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Search, Filter } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const templateTypes = [
  {
    id: 'intake',
    name: 'Intake Forms',
    description: 'Client onboarding and data collection forms',
    count: 12,
    path: '/templates/intake'
  },
  {
    id: 'invoices',
    name: 'Invoices',
    description: 'Professional invoice templates',
    count: 8,
    path: '/templates/invoices'
  },
  {
    id: 'proposals',
    name: 'Proposals',
    description: 'Service proposals and quotes',
    count: 6,
    path: '/templates/proposals'
  },
  {
    id: 'contracts',
    name: 'Contracts',
    description: 'Service agreements and legal documents',
    count: 10,
    path: '/templates/contracts'
  },
  {
    id: 'custom',
    name: 'Custom Templates',
    description: 'Custom document templates',
    count: 4,
    path: '/templates/custom'
  }
];

const TemplatesDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
          <p className="text-sm text-gray-500">Manage your firm's reusable documents and forms</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
          >
            Create Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templateTypes.map((type) => (
          <Card
            key={type.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(type.path)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="outline">{type.count} templates</Badge>
              </div>
              <h3 className="text-lg font-medium text-gray-900">{type.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{type.description}</p>
              <Button
                variant="outline"
                className="mt-4 w-full"
              >
                View Templates
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplatesDashboard;