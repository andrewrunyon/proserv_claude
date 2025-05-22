import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Download,
  Plus,
  Star,
  Users,
  FileText,
  BarChart2,
  PieChart,
  Eye,
  Settings,
  ChevronRight,
  X
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  category: string;
  creator: {
    name: string;
    type: 'verified' | 'partner' | 'community';
  };
  rating: number;
  reviews: number;
  downloads: number;
  thumbnail: string;
  tags: string[];
  compatibility: string[];
  lastUpdated: string;
}

const templates: ReportTemplate[] = [
  {
    id: '1',
    name: 'Revenue Analysis Dashboard',
    description: 'Comprehensive revenue tracking with YoY comparisons and trend analysis',
    type: 'Dashboard',
    category: 'Financial',
    creator: {
      name: 'ProServ Official',
      type: 'verified'
    },
    rating: 4.8,
    reviews: 156,
    downloads: 2450,
    thumbnail: 'https://images.pexels.com/photos/95916/pexels-photo-95916.jpeg',
    tags: ['Revenue', 'Financial', 'Dashboard'],
    compatibility: ['Billing Module', 'Invoicing', 'Subscriptions'],
    lastUpdated: '2024-03-01'
  },
  {
    id: '2',
    name: 'Client Performance Metrics',
    description: 'Track client engagement, revenue, and satisfaction metrics',
    type: 'Report',
    category: 'Clients',
    creator: {
      name: 'Business Analytics Pro',
      type: 'partner'
    },
    rating: 4.6,
    reviews: 89,
    downloads: 1280,
    thumbnail: 'https://images.pexels.com/photos/53621/calculator-calculation-insurance-finance-53621.jpeg',
    tags: ['Clients', 'Performance', 'Metrics'],
    compatibility: ['Client Module', 'Jobs', 'Billing'],
    lastUpdated: '2024-02-15'
  },
  {
    id: '3',
    name: 'Team Productivity Suite',
    description: 'Monitor team performance, task completion, and workload distribution',
    type: 'Dashboard',
    category: 'Operations',
    creator: {
      name: 'Workflow Masters',
      type: 'community'
    },
    rating: 4.7,
    reviews: 45,
    downloads: 890,
    thumbnail: 'https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg',
    tags: ['Team', 'Productivity', 'Tasks'],
    compatibility: ['Tasks', 'Jobs', 'Team Management'],
    lastUpdated: '2024-02-28'
  }
];

const ReportsCommunity: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    creator: '',
    rating: ''
  });

  const handlePreview = (template: ReportTemplate) => {
    setSelectedTemplate(template);
  };

  const handleImport = (template: ReportTemplate) => {
    navigate('/reports/designer', { state: { template } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community Library</h1>
          <p className="text-sm text-gray-500">
            Explore and import ready-made reports from other firms and ProServ experts
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => navigate('/reports/designer')}
        >
          Create Custom
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-grow md:flex-grow-0">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full rounded-md border border-gray-300 pl-9 pr-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select
            className="rounded-md border border-gray-300 py-2 pl-3 pr-8 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">All Categories</option>
            <option value="financial">Financial</option>
            <option value="clients">Clients</option>
            <option value="operations">Operations</option>
          </select>
          
          <select
            className="rounded-md border border-gray-300 py-2 pl-3 pr-8 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            value={filters.creator}
            onChange={(e) => setFilters({ ...filters, creator: e.target.value })}
          >
            <option value="">All Sources</option>
            <option value="verified">Verified</option>
            <option value="partner">Partners</option>
            <option value="community">Community</option>
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="h-full w-full object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={
                      template.creator.type === 'verified' ? 'primary' :
                      template.creator.type === 'partner' ? 'success' : 'secondary'
                    }
                  >
                    {template.creator.type}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{template.rating}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{template.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Download size={16} className="mr-2" />
                    {template.downloads} imports
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="mr-2" />
                    {template.reviews} reviews
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    leftIcon={<Eye size={16} />}
                    onClick={() => handlePreview(template)}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1"
                    leftIcon={<Download size={16} />}
                    onClick={() => handleImport(template)}
                  >
                    Import
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                      <Badge
                        variant={
                          template.creator.type === 'verified' ? 'primary' :
                          template.creator.type === 'partner' ? 'success' : 'secondary'
                        }
                        className="ml-3"
                      >
                        {template.creator.type}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{template.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {template.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="ml-6 flex flex-col items-end">
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{template.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({template.reviews})</span>
                    </div>
                    <div className="mt-2 flex space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Eye size={14} />}
                        onClick={() => handlePreview(template)}
                      >
                        Preview
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<Download size={14} />}
                        onClick={() => handleImport(template)}
                      >
                        Import
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setSelectedTemplate(null)}
            ></div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-semibold text-gray-900">{selectedTemplate.name}</h3>
                      <button
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setSelectedTemplate(null)}
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-6">
                      <div className="col-span-2 space-y-6">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">Description</h4>
                          <p className="mt-2 text-gray-600">{selectedTemplate.description}</p>
                        </div>

                        <div>
                          <h4 className="text-lg font-medium text-gray-900">Preview</h4>
                          <div className="mt-4 aspect-video rounded-lg bg-gray-100">
                            <img
                              src={selectedTemplate.thumbnail}
                              alt={selectedTemplate.name}
                              className="h-full w-full object-cover rounded-lg"
                            />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-medium text-gray-900">Compatibility</h4>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {selectedTemplate.compatibility.map((item, index) => (
                              <Badge key={index} variant="outline">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <Card>
                          <CardContent className="p-4">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Rating</span>
                                <div className="flex items-center">
                                  <Star size={16} className="text-yellow-400 fill-current" />
                                  <span className="ml-1 font-medium">{selectedTemplate.rating}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Reviews</span>
                                <span className="font-medium">{selectedTemplate.reviews}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Downloads</span>
                                <span className="font-medium">{selectedTemplate.downloads}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Last Updated</span>
                                <span className="font-medium">
                                  {new Date(selectedTemplate.lastUpdated).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium text-gray-900">Created by</h4>
                            <div className="mt-2 flex items-center">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Users size={20} className="text-primary" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">
                                  {selectedTemplate.creator.name}
                                </p>
                                <Badge
                                  variant={
                                    selectedTemplate.creator.type === 'verified' ? 'primary' :
                                    selectedTemplate.creator.type === 'partner' ? 'success' : 'secondary'
                                  }
                                  className="mt-1"
                                >
                                  {selectedTemplate.creator.type}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Button
                          variant="primary"
                          className="w-full"
                          leftIcon={<Download size={16} />}
                          onClick={() => {
                            setSelectedTemplate(null);
                            handleImport(selectedTemplate);
                          }}
                        >
                          Import Template
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsCommunity;