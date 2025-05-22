import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Download,
  Plus,
  Users,
  Clock,
  Tag,
  ChevronRight,
  X,
  FileText,
  DollarSign,
  CheckCircle,
  ExternalLink,
  ThumbsUp,
  MessageSquare,
  Workflow,
  ArrowRight,
  Settings,
  Eye
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

interface AutomationTemplate {
  id: string;
  name: string;
  description: string;
  creator: {
    name: string;
    type: 'official' | 'partner' | 'community';
  };
  category: string;
  price: 'free' | number;
  tags: string[];
  rating: number;
  reviews: number;
  addedCount: number;
  thumbnailUrl: string;
  workflow: {
    steps: {
      id: string;
      type: 'trigger' | 'condition' | 'action';
      name: string;
      description: string;
    }[];
    estimatedSetupTime: string;
  };
  compatibility: string[];
  lastUpdated: string;
}

const templates: AutomationTemplate[] = [
  {
    id: '1',
    name: 'Tax Return Workflow',
    description: 'Complete tax return workflow with client communication, document collection, and review stages',
    creator: {
      name: 'ProServ Official',
      type: 'official'
    },
    category: 'Tax',
    price: 'free',
    tags: ['Tax', 'Documents', 'Client Communication'],
    rating: 4.8,
    reviews: 156,
    addedCount: 2450,
    thumbnailUrl: 'https://images.pexels.com/photos/95916/pexels-photo-95916.jpeg',
    workflow: {
      steps: [
        {
          id: 's1',
          type: 'trigger',
          name: 'New Tax Return Job',
          description: 'Triggers when a new tax return job is created'
        },
        {
          id: 's2',
          type: 'action',
          name: 'Send Document Checklist',
          description: 'Sends tax document checklist to client'
        },
        {
          id: 's3',
          type: 'condition',
          name: 'Check Documents',
          description: 'Verifies all required documents are received'
        },
        {
          id: 's4',
          type: 'action',
          name: 'Assign Preparer',
          description: 'Assigns tax return to available preparer'
        }
      ],
      estimatedSetupTime: '15 minutes'
    },
    compatibility: ['Tax Services', 'Individual Returns', 'Business Returns'],
    lastUpdated: '2024-03-01'
  },
  {
    id: '2',
    name: 'Monthly Bookkeeping',
    description: 'Automated monthly bookkeeping workflow with bank reconciliation and reporting',
    creator: {
      name: 'Accounting Partners',
      type: 'partner'
    },
    category: 'Bookkeeping',
    price: 49,
    tags: ['Bookkeeping', 'Monthly', 'Reporting'],
    rating: 4.7,
    reviews: 89,
    addedCount: 1280,
    thumbnailUrl: 'https://images.pexels.com/photos/53621/calculator-calculation-insurance-finance-53621.jpeg',
    workflow: {
      steps: [
        {
          id: 's1',
          type: 'trigger',
          name: 'Month End',
          description: 'Triggers on the last day of each month'
        },
        {
          id: 's2',
          type: 'action',
          name: 'Import Transactions',
          description: 'Imports transactions from banking feeds'
        },
        {
          id: 's3',
          type: 'action',
          name: 'Reconcile Accounts',
          description: 'Performs bank reconciliation'
        },
        {
          id: 's4',
          type: 'action',
          name: 'Generate Reports',
          description: 'Creates monthly financial reports'
        }
      ],
      estimatedSetupTime: '30 minutes'
    },
    compatibility: ['Bookkeeping Services', 'Small Business', 'QuickBooks Online'],
    lastUpdated: '2024-02-15'
  },
  {
    id: '3',
    name: 'Client Onboarding',
    description: 'Streamlined client onboarding process with automated forms and welcome emails',
    creator: {
      name: 'Practice Growth',
      type: 'community'
    },
    category: 'Practice Management',
    price: 'free',
    tags: ['Onboarding', 'Forms', 'Automation'],
    rating: 4.6,
    reviews: 45,
    addedCount: 890,
    thumbnailUrl: 'https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg',
    workflow: {
      steps: [
        {
          id: 's1',
          type: 'trigger',
          name: 'New Client Created',
          description: 'Triggers when a new client is added'
        },
        {
          id: 's2',
          type: 'action',
          name: 'Send Welcome Email',
          description: 'Sends personalized welcome email'
        },
        {
          id: 's3',
          type: 'action',
          name: 'Create Intake Forms',
          description: 'Generates and sends intake forms'
        },
        {
          id: 's4',
          type: 'condition',
          name: 'Check Completion',
          description: 'Monitors form completion status'
        }
      ],
      estimatedSetupTime: '20 minutes'
    },
    compatibility: ['All Services', 'Client Management'],
    lastUpdated: '2024-02-28'
  }
];

const AutomationCommunity: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTemplate, setSelectedTemplate] = useState<AutomationTemplate | null>(null);
  const [filters, setFilters] = useState({
    category: '',
    price: '',
    rating: '',
    creator: ''
  });

  const handlePreview = (template: AutomationTemplate) => {
    setSelectedTemplate(template);
  };

  const handleImport = (template: AutomationTemplate) => {
    navigate('/automations/new', { state: { template } });
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card key={template.id} className="hover:shadow-lg transition-shadow">
          <div className="relative h-48 w-full">
            <img
              src={template.thumbnailUrl}
              alt={template.name}
              className="h-full w-full object-cover rounded-t-lg"
            />
            <div className="absolute top-4 right-4">
              <Badge
                variant={
                  template.creator.type === 'official'
                    ? 'primary'
                    : template.creator.type === 'partner'
                    ? 'success'
                    : 'secondary'
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
                <Users size={16} className="mr-2" />
                {template.addedCount} uses
              </div>
              <div className="flex items-center">
                <MessageSquare size={16} className="mr-2" />
                {template.reviews} reviews
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Clock size={16} className="mr-2 text-gray-400" />
                Setup: {template.workflow.estimatedSetupTime}
              </div>
              <span className="font-medium">
                {template.price === 'free' ? 'Free' : `$${template.price}`}
              </span>
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
                leftIcon={<Plus size={16} />}
                onClick={() => handleImport(template)}
              >
                Use Template
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderListView = () => (
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
                      template.creator.type === 'official'
                        ? 'primary'
                        : template.creator.type === 'partner'
                        ? 'success'
                        : 'secondary'
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
                <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users size={16} className="mr-2" />
                    {template.addedCount} uses
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="mr-2 text-yellow-400 fill-current" />
                    {template.rating} ({template.reviews} reviews)
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    Setup: {template.workflow.estimatedSetupTime}
                  </div>
                </div>
              </div>
              <div className="ml-6 flex flex-col items-end">
                <span className="text-lg font-medium">
                  {template.price === 'free' ? 'Free' : `$${template.price}`}
                </span>
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
                    leftIcon={<Plus size={14} />}
                    onClick={() => handleImport(template)}
                  >
                    Use Template
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderPreviewModal = () => {
    if (!selectedTemplate) return null;

    return (
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
                        <h4 className="text-lg font-medium text-gray-900">Workflow Steps</h4>
                        <div className="mt-4 space-y-4">
                          {selectedTemplate.workflow.steps.map((step, index) => (
                            <div key={index} className="flex items-center">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                <span className="text-sm font-medium text-primary">{index + 1}</span>
                              </div>
                              <div className="ml-4 flex-1">
                                <p className="text-sm font-medium text-gray-900">{step.name}</p>
                                <p className="text-sm text-gray-500">{step.description}</p>
                              </div>
                              {index < selectedTemplate.workflow.steps.length - 1 && (
                                <ArrowRight size={20} className="text-gray-400" />
                              )}
                            </div>
                          ))}
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
                              <span className="text-sm text-gray-500">Added by</span>
                              <span className="font-medium">{selectedTemplate.addedCount} users</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">Setup Time</span>
                              <span className="font-medium">{selectedTemplate.workflow.estimatedSetupTime}</span>
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
                                  selectedTemplate.creator.type === 'official'
                                    ? 'primary'
                                    : selectedTemplate.creator.type === 'partner'
                                    ? 'success'
                                    : 'secondary'
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
                        leftIcon={<Plus size={16} />}
                        onClick={() => {
                          setSelectedTemplate(null);
                          handleImport(selectedTemplate);
                        }}
                      >
                        Use This Template
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workflow Marketplace</h1>
          <p className="text-sm text-gray-500">Browse, preview, and import pre-built workflows and automations</p>
        </div>
        <Button
          variant="outline"
          leftIcon={<Plus size={16} />}
          onClick={() => navigate('/automations/new')}
        >
          Create from Scratch
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">All Categories</option>
            <option value="tax">Tax</option>
            <option value="accounting">Accounting</option>
            <option value="advisory">Advisory</option>
          </select>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={filters.creator}
            onChange={(e) => setFilters({ ...filters, creator: e.target.value })}
          >
            <option value="">All Sources</option>
            <option value="official">Official</option>
            <option value="partner">Partners</option>
            <option value="community">Community</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="border border-gray-300 rounded-lg flex">
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
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="popular">Most Popular</option>
            <option value="recent">Recently Added</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {viewMode === 'grid' ? renderGridView() : renderListView()}
      {selectedTemplate && renderPreviewModal()}

      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <div className="text-sm text-gray-500">
          Showing {templates.length} templates
        </div>
        <div className="flex items-center space-x-2">
          <select className="border border-gray-300 rounded-lg px-2 py-1">
            <option value="12">12 per page</option>
            <option value="24">24 per page</option>
            <option value="36">36 per page</option>
          </select>
          <Button variant="outline" disabled>Previous</Button>
          <Button variant="outline" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default AutomationCommunity;