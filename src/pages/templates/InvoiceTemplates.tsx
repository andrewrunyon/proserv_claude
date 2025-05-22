import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Edit,
  Copy,
  Trash2,
  Eye,
  Grid3X3,
  List,
  DollarSign
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  lastModified: string;
  status: 'active' | 'draft';
  usageCount: number;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Standard Invoice',
    description: 'Basic invoice template for general services',
    category: 'General',
    lastModified: '2024-03-15',
    status: 'active',
    usageCount: 128
  },
  {
    id: '2',
    name: 'Detailed Service Invoice',
    description: 'Itemized invoice with detailed service breakdown',
    category: 'Services',
    lastModified: '2024-03-10',
    status: 'active',
    usageCount: 85
  },
  {
    id: '3',
    name: 'Retainer Invoice',
    description: 'Monthly retainer billing template',
    category: 'Retainer',
    lastModified: '2024-03-05',
    status: 'draft',
    usageCount: 0
  }
];

const InvoiceTemplates: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoice Templates</h1>
          <p className="text-sm text-gray-500">Manage invoice templates and billing formats</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
        >
          Create Template
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-grow md:flex-grow-0">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full rounded-md border border-gray-300 pl-9 pr-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select className="rounded-md border border-gray-300 py-2 pl-3 pr-8 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option>All Categories</option>
            <option>General</option>
            <option>Services</option>
            <option>Retainer</option>
          </select>

          <select className="rounded-md border border-gray-300 py-2 pl-3 pr-8 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option>All Status</option>
            <option>Active</option>
            <option>Draft</option>
          </select>

          <Button
            variant="outline"
            leftIcon={<Filter size={16} />}
          >
            More Filters
          </Button>

          <div className="ml-2 flex rounded-md border border-gray-300">
            <button
              className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 text-primary' : 'text-gray-500'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </button>
            <button
              className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 text-primary' : 'text-gray-500'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 size={16} />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant={template.status === 'active' ? 'success' : 'secondary'}>
                    {template.status}
                  </Badge>
                </div>
                <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{template.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>Used {template.usageCount} times</span>
                  <span>Modified {new Date(template.lastModified).toLocaleDateString()}</span>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    leftIcon={<Eye size={16} />}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    leftIcon={<Edit size={16} />}
                  >
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Template Name</th>
                <th>Category</th>
                <th>Usage</th>
                <th>Last Modified</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template) => (
                <tr key={template.id} className="group hover:bg-gray-50">
                  <td>
                    <div className="flex items-center">
                      <DollarSign size={16} className="mr-2 text-primary" />
                      <div>
                        <p className="font-medium text-gray-900">{template.name}</p>
                        <p className="text-sm text-gray-500">{template.description}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge variant="outline">{template.category}</Badge>
                  </td>
                  <td>{template.usageCount} uses</td>
                  <td>{new Date(template.lastModified).toLocaleDateString()}</td>
                  <td>
                    <Badge variant={template.status === 'active' ? 'success' : 'secondary'}>
                      {template.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100">
                      <button className="p-1 hover:bg-gray-100 rounded-lg">
                        <Eye size={16} className="text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg">
                        <Edit size={16} className="text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg">
                        <Copy size={16} className="text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg">
                        <Trash2 size={16} className="text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InvoiceTemplates;