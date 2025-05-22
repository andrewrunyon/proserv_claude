import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Plus,
  Star,
  Download,
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
  Eye,
  Settings
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  tags: string[];
  rating: number;
  reviews: number;
  usageCount: number;
  status: 'active' | 'draft';
  workflow: {
    stages: string[];
    estimatedDuration: string;
  };
  pricing: {
    type: 'fixed' | 'hourly' | 'custom';
    amount?: number;
  };
  documents: {
    name: string;
    type: string;
  }[];
}

const services: Service[] = [
  {
    id: '1',
    name: 'Tax Return Preparation',
    description: 'Complete tax return preparation service with automated workflows and document checklists',
    category: 'Tax',
    thumbnail: 'https://images.pexels.com/photos/95916/pexels-photo-95916.jpeg',
    tags: ['Tax', 'Annual', 'High-Volume'],
    rating: 4.8,
    reviews: 156,
    usageCount: 2450,
    status: 'active',
    workflow: {
      stages: ['Document Collection', 'Initial Review', 'Preparation', 'Quality Check', 'Client Review', 'Filing'],
      estimatedDuration: '2-3 weeks'
    },
    pricing: {
      type: 'fixed',
      amount: 299
    },
    documents: [
      { name: 'Client Intake Form', type: 'Form' },
      { name: 'Document Checklist', type: 'Checklist' },
      { name: 'Engagement Letter', type: 'Contract' }
    ]
  },
  {
    id: '2',
    name: 'Monthly Bookkeeping',
    description: 'Streamlined bookkeeping service with recurring tasks and automated client communications',
    category: 'Accounting',
    thumbnail: 'https://images.pexels.com/photos/53621/calculator-calculation-insurance-finance-53621.jpeg',
    tags: ['Bookkeeping', 'Monthly', 'Recurring'],
    rating: 4.6,
    reviews: 89,
    usageCount: 1280,
    status: 'active',
    workflow: {
      stages: ['Data Import', 'Reconciliation', 'Review', 'Reporting'],
      estimatedDuration: '5-7 days'
    },
    pricing: {
      type: 'fixed',
      amount: 199
    },
    documents: [
      { name: 'Service Agreement', type: 'Contract' },
      { name: 'Monthly Checklist', type: 'Checklist' },
      { name: 'Report Template', type: 'Template' }
    ]
  },
  {
    id: '3',
    name: 'Business Advisory',
    description: 'Comprehensive business advisory service with strategic planning and financial analysis',
    category: 'Advisory',
    thumbnail: 'https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg',
    tags: ['Advisory', 'Strategy', 'Premium'],
    rating: 4.7,
    reviews: 45,
    usageCount: 890,
    status: 'active',
    workflow: {
      stages: ['Assessment', 'Strategy Development', 'Implementation', 'Review'],
      estimatedDuration: 'Ongoing'
    },
    pricing: {
      type: 'hourly',
      amount: 150
    },
    documents: [
      { name: 'Business Analysis', type: 'Template' },
      { name: 'Strategy Framework', type: 'Template' },
      { name: 'Progress Report', type: 'Template' }
    ]
  }
];

const ServicesList: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    pricing: ''
  });

  const handlePreview = (service: Service) => {
    setSelectedService(service);
  };

  const handleUseTemplate = (service: Service) => {
    navigate('/services/new', { state: { template: service } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Library</h1>
          <p className="text-sm text-gray-500">Browse and use pre-configured service templates</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => navigate('/services/new')}
        >
          Create Custom
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-grow md:flex-grow-0">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
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
            <option value="tax">Tax</option>
            <option value="accounting">Accounting</option>
            <option value="advisory">Advisory</option>
          </select>

          <select
            className="rounded-md border border-gray-300 py-2 pl-3 pr-8 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            value={filters.pricing}
            onChange={(e) => setFilters({ ...filters, pricing: e.target.value })}
          >
            <option value="">All Pricing</option>
            <option value="fixed">Fixed Fee</option>
            <option value="hourly">Hourly</option>
            <option value="custom">Custom</option>
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
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <img
                  src={service.thumbnail}
                  alt={service.name}
                  className="h-full w-full object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="primary">Official</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{service.rating}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{service.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users size={16} className="mr-2" />
                    {service.usageCount} uses
                  </div>
                  <div className="flex items-center">
                    <MessageSquare size={16} className="mr-2" />
                    {service.reviews} reviews
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    leftIcon={<Eye size={16} />}
                    onClick={() => handlePreview(service)}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1"
                    leftIcon={<Plus size={16} />}
                    onClick={() => handleUseTemplate(service)}
                  >
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                      <Badge variant="primary" className="ml-3">Official</Badge>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{service.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="ml-6 flex flex-col items-end">
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{service.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({service.reviews})</span>
                    </div>
                    <div className="mt-2 flex space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Eye size={14} />}
                        onClick={() => handlePreview(service)}
                      >
                        Preview
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<Plus size={14} />}
                        onClick={() => handleUseTemplate(service)}
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
      )}

      {selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setSelectedService(null)}
            ></div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-semibold text-gray-900">{selectedService.name}</h3>
                      <button
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setSelectedService(null)}
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-6">
                      <div className="col-span-2 space-y-6">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">Description</h4>
                          <p className="mt-2 text-gray-600">{selectedService.description}</p>
                        </div>

                        <div>
                          <h4 className="text-lg font-medium text-gray-900">Workflow</h4>
                          <div className="mt-4 space-y-4">
                            {selectedService.workflow.stages.map((stage, index) => (
                              <div key={index} className="flex items-center">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                  <span className="text-sm font-medium text-primary">{index + 1}</span>
                                </div>
                                <div className="ml-4 flex-1">
                                  <p className="text-sm font-medium text-gray-900">{stage}</p>
                                </div>
                                {index < selectedService.workflow.stages.length - 1 && (
                                  <ChevronRight size={20} className="text-gray-400" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-medium text-gray-900">Required Documents</h4>
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            {selectedService.documents.map((doc, index) => (
                              <div
                                key={index}
                                className="flex items-center rounded-lg border border-gray-200 p-4"
                              >
                                <FileText size={20} className="text-gray-400" />
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                  <p className="text-xs text-gray-500">{doc.type}</p>
                                </div>
                              </div>
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
                                  <span className="ml-1 font-medium">{selectedService.rating}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Reviews</span>
                                <span className="font-medium">{selectedService.reviews}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Uses</span>
                                <span className="font-medium">{selectedService.usageCount}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Duration</span>
                                <span className="font-medium">{selectedService.workflow.estimatedDuration}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium text-gray-900">Pricing</h4>
                            <div className="mt-2">
                              <p className="text-sm font-medium text-gray-900">
                                {selectedService.pricing.type === 'fixed' && `$${selectedService.pricing.amount} fixed fee`}
                                {selectedService.pricing.type === 'hourly' && `$${selectedService.pricing.amount}/hour`}
                                {selectedService.pricing.type === 'custom' && 'Custom pricing'}
                              </p>
                            </div>
                          </CardContent>
                        </Card>

                        <Button
                          variant="primary"
                          className="w-full"
                          leftIcon={<Plus size={16} />}
                          onClick={() => {
                            setSelectedService(null);
                            handleUseTemplate(selectedService);
                          }}
                        >
                          Use Template
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

export default ServicesList;