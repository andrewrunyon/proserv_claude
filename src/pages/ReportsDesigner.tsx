import React, { useState } from 'react';
import {
  Settings,
  Filter,
  Table,
  BarChart2,
  PieChart,
  LineChart,
  Save,
  Play,
  Plus,
  Trash2,
  Eye,
  Calendar,
  Clock,
  Database,
  Layout,
  ChevronRight
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

interface DataSource {
  id: string;
  name: string;
  type: string;
  fields: string[];
}

const dataSources: DataSource[] = [
  {
    id: 'jobs',
    name: 'Jobs',
    type: 'table',
    fields: ['id', 'name', 'client', 'status', 'created_at', 'due_date']
  },
  {
    id: 'invoices',
    name: 'Invoices',
    type: 'table',
    fields: ['id', 'number', 'client', 'amount', 'status', 'due_date']
  },
  {
    id: 'clients',
    name: 'Clients',
    type: 'table',
    fields: ['id', 'name', 'email', 'created_at', 'status']
  },
  {
    id: 'tasks',
    name: 'Tasks',
    type: 'table',
    fields: ['id', 'title', 'assignee', 'status', 'due_date']
  }
];

const visualizations = [
  { id: 'table', name: 'Table', icon: <Table size={24} /> },
  { id: 'bar', name: 'Bar Chart', icon: <BarChart2 size={24} /> },
  { id: 'line', name: 'Line Chart', icon: <LineChart size={24} /> },
  { id: 'pie', name: 'Pie Chart', icon: <PieChart size={24} /> }
];

const ReportsDesigner: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDataSource, setSelectedDataSource] = useState<string | null>(null);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedVisualization, setSelectedVisualization] = useState<string | null>(null);

  const steps = [
    { number: 1, title: 'Select Data Source' },
    { number: 2, title: 'Configure Filters' },
    { number: 3, title: 'Select Fields' },
    { number: 4, title: 'Choose Visualization' },
    { number: 5, title: 'Save & Share' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <a href="/reports" className="hover:text-primary">Reports</a>
            <ChevronRight size={16} />
            <span>Report Designer</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Create Custom Report</h1>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            leftIcon={<Save size={16} />}
          >
            Save Draft
          </Button>
          <Button
            variant="primary"
            leftIcon={<Play size={16} />}
          >
            Run Report
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center">
              <div className={`
                flex h-10 w-10 items-center justify-center rounded-full
                ${currentStep >= step.number ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}
              `}>
                {step.number}
              </div>
              <span className="ml-2 hidden md:block text-sm">
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="h-1 w-20 bg-gray-200">
                <div
                  className={`h-full ${
                    currentStep > step.number ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Design Canvas</CardTitle>
            </CardHeader>
            <CardContent>
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {dataSources.map((source) => (
                      <div
                        key={source.id}
                        className={`
                          cursor-pointer rounded-lg border p-4 transition-colors
                          ${selectedDataSource === source.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-primary/50'}
                        `}
                        onClick={() => setSelectedDataSource(source.id)}
                      >
                        <div className="flex items-center">
                          <Database size={20} className="text-gray-400" />
                          <h3 className="ml-2 font-medium text-gray-900">{source.name}</h3>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          {source.fields.length} available fields
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Filter Conditions</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Plus size={14} />}
                    >
                      Add Filter
                    </Button>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-500">No filters configured</p>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Available Fields</h3>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Layout size={14} />}
                      >
                        Group By
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Filter size={14} />}
                      >
                        Sort
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {selectedDataSource && dataSources
                      .find(source => source.id === selectedDataSource)
                      ?.fields.map((field) => (
                        <div
                          key={field}
                          className={`
                            cursor-pointer rounded-lg border p-3 transition-colors
                            ${selectedFields.includes(field)
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:border-primary/50'}
                          `}
                          onClick={() => {
                            if (selectedFields.includes(field)) {
                              setSelectedFields(selectedFields.filter(f => f !== field));
                            } else {
                              setSelectedFields([...selectedFields, field]);
                            }
                          }}
                        >
                          <span className="text-sm font-medium">{field}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {visualizations.map((viz) => (
                      <div
                        key={viz.id}
                        className={`
                          cursor-pointer rounded-lg border p-4 text-center transition-colors
                          ${selectedVisualization === viz.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-primary/50'}
                        `}
                        onClick={() => setSelectedVisualization(viz.id)}
                      >
                        <div className="flex justify-center">{viz.icon}</div>
                        <p className="mt-2 text-sm font-medium">{viz.name}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-center h-64">
                      <p className="text-gray-500">Preview will appear here</p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Report Name</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Enter report name"
                    />
                  </div>
                  <div>
                    <label className="form-label">Description</label>
                    <textarea
                      className="input"
                      rows={3}
                      placeholder="Describe your report..."
                    />
                  </div>
                  <div>
                    <label className="form-label">Tags</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Add tags..."
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input type="radio" name="visibility" className="mr-2" />
                      <span>Private</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="visibility" className="mr-2" />
                      <span>Firm-Wide</span>
                    </label>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="form-label">Report Type</label>
                <select className="input">
                  <option>Standard Report</option>
                  <option>Summary Report</option>
                  <option>Detailed Report</option>
                </select>
              </div>
              <div>
                <label className="form-label">Time Range</label>
                <select className="input">
                  <option>Last 30 Days</option>
                  <option>Last Quarter</option>
                  <option>Year to Date</option>
                  <option>Custom Range</option>
                </select>
              </div>
              <div>
                <label className="form-label">Auto-refresh</label>
                <select className="input">
                  <option>Never</option>
                  <option>Every Hour</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable Scheduling</span>
                <div className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </div>
              </div>
              <div>
                <label className="form-label">Frequency</label>
                <select className="input" disabled>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              <div>
                <label className="form-label">Recipients</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Add email addresses..."
                  disabled
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  leftIcon={<Table size={16} />}
                >
                  Export as CSV
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  leftIcon={<FileText size={16} />}
                >
                  Export as PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
          disabled={currentStep === 5}
        >
          {currentStep === 4 ? 'Save Report' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default ReportsDesigner;