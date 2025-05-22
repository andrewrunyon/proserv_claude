import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Plus,
  Play,
  Pause,
  Copy,
  Trash2,
  Settings,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MoreVertical,
  Workflow,
  FileText,
  Mail,
  Bell,
  Users
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

interface AutomationStep {
  id: string;
  type: 'trigger' | 'condition' | 'action';
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface Automation {
  id: string;
  name: string;
  description: string;
  service: string;
  status: 'active' | 'inactive' | 'draft';
  steps: AutomationStep[];
  activeJobs: number;
  lastRun: string;
  createdBy: {
    name: string;
    avatar?: string;
  };
  lastModified: string;
  stats: {
    runs: number;
    success: number;
    failed: number;
  };
}

const automations: Automation[] = [
  {
    id: '1',
    name: 'Tax Return Workflow',
    description: 'Automated workflow for tax return preparation and review',
    service: 'Tax Services',
    status: 'active',
    steps: [
      {
        id: 's1',
        type: 'trigger',
        name: 'New Tax Return Job',
        description: 'Triggers when a new tax return job is created',
        icon: <FileText size={16} className="text-primary" />
      },
      {
        id: 's2',
        type: 'action',
        name: 'Send Client Checklist',
        description: 'Sends tax document checklist to client',
        icon: <Mail size={16} className="text-primary" />
      },
      {
        id: 's3',
        type: 'condition',
        name: 'Documents Received',
        description: 'Checks if all required documents are received',
        icon: <CheckCircle2 size={16} className="text-warning" />
      },
      {
        id: 's4',
        type: 'action',
        name: 'Assign Preparer',
        description: 'Assigns tax return to available preparer',
        icon: <Users size={16} className="text-primary" />
      }
    ],
    activeJobs: 12,
    lastRun: '2024-03-15T10:30:00',
    createdBy: {
      name: 'Sarah Wilson'
    },
    lastModified: '2024-02-28T15:45:00',
    stats: {
      runs: 45,
      success: 42,
      failed: 3
    }
  },
  {
    id: '2',
    name: 'Monthly Bookkeeping',
    description: 'Automated monthly bookkeeping and reporting workflow',
    service: 'Bookkeeping',
    status: 'active',
    steps: [
      {
        id: 's1',
        type: 'trigger',
        name: 'Month End',
        description: 'Triggers on the last day of each month',
        icon: <Clock size={16} className="text-primary" />
      },
      {
        id: 's2',
        type: 'action',
        name: 'Import Transactions',
        description: 'Imports transactions from banking feeds',
        icon: <FileText size={16} className="text-primary" />
      },
      {
        id: 's3',
        type: 'action',
        name: 'Generate Reports',
        description: 'Generates monthly financial reports',
        icon: <FileText size={16} className="text-primary" />
      },
      {
        id: 's4',
        type: 'action',
        name: 'Send to Client',
        description: 'Sends reports to client for review',
        icon: <Mail size={16} className="text-primary" />
      }
    ],
    activeJobs: 8,
    lastRun: '2024-03-14T00:00:00',
    createdBy: {
      name: 'Mike Johnson'
    },
    lastModified: '2024-02-15T09:30:00',
    stats: {
      runs: 24,
      success: 23,
      failed: 1
    }
  },
  {
    id: '3',
    name: 'Document Review Reminder',
    description: 'Automated reminders for document review and approval',
    service: 'All Services',
    status: 'draft',
    steps: [
      {
        id: 's1',
        type: 'trigger',
        name: 'Document Upload',
        description: 'Triggers when a document is uploaded for review',
        icon: <FileText size={16} className="text-primary" />
      },
      {
        id: 's2',
        type: 'condition',
        name: 'Check Type',
        description: 'Checks document type and routing',
        icon: <CheckCircle2 size={16} className="text-warning" />
      },
      {
        id: 's3',
        type: 'action',
        name: 'Send Notification',
        description: 'Notifies appropriate reviewer',
        icon: <Bell size={16} className="text-primary" />
      }
    ],
    activeJobs: 0,
    lastRun: '',
    createdBy: {
      name: 'David Chen'
    },
    lastModified: '2024-03-10T14:20:00',
    stats: {
      runs: 0,
      success: 0,
      failed: 0
    }
  }
];

const AutomationsHome: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedAutomations, setSelectedAutomations] = useState<string[]>([]);

  const handleSelectAll = () => {
    if (selectedAutomations.length === automations.length) {
      setSelectedAutomations([]);
    } else {
      setSelectedAutomations(automations.map(automation => automation.id));
    }
  };

  const handleSelectAutomation = (automationId: string) => {
    setSelectedAutomations(prev => {
      if (prev.includes(automationId)) {
        return prev.filter(id => id !== automationId);
      }
      return [...prev, automationId];
    });
  };

  const handleCreateAutomation = () => {
    navigate('/automations/new');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Automations</h1>
          <p className="text-sm text-gray-500">Manage automated workflows and processes</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={handleCreateAutomation}
        >
          Create Automation
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Workflow className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Automations</p>
                <h3 className="text-xl font-semibold text-gray-900">{automations.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-success/10 p-3">
                <Play className="h-6 w-6 text-success" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active</p>
                <h3 className="text-xl font-semibold text-gray-900">
                  {automations.filter(a => a.status === 'active').length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-warning/10 p-3">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Needs Attention</p>
                <h3 className="text-xl font-semibold text-gray-900">1</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search automations..."
            className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
          <select className="rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option>All Services</option>
            <option>Tax Services</option>
            <option>Bookkeeping</option>
            <option>Audit</option>
          </select>

          <select className="rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
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

      {viewMode === 'list' ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="w-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedAutomations.length === automations.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Name</th>
                <th>Service</th>
                <th>Steps</th>
                <th>Active Jobs</th>
                <th>Last Run</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {automations.map((automation) => (
                <tr key={automation.id} className="group hover:bg-gray-50">
                  <td>
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedAutomations.includes(automation.id)}
                      onChange={() => handleSelectAutomation(automation.id)}
                    />
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <button
                        className="font-medium text-gray-900 hover:text-primary text-left"
                        onClick={() => navigate(`/automations/${automation.id}`)}
                      >
                        {automation.name}
                      </button>
                      <span className="text-sm text-gray-500">{automation.description}</span>
                    </div>
                  </td>
                  <td>
                    <Badge variant="outline">{automation.service}</Badge>
                  </td>
                  <td>
                    <div className="flex items-center space-x-1">
                      {automation.steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                          <div className="flex items-center rounded bg-gray-100 px-2 py-1">
                            {step.icon}
                            <span className="ml-1 text-xs">{step.name}</span>
                          </div>
                          {index < automation.steps.length - 1 && (
                            <ArrowRight size={12} className="text-gray-400" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </td>
                  <td className="text-center">{automation.activeJobs}</td>
                  <td>
                    {automation.lastRun ? (
                      <div className="flex items-center text-gray-500">
                        <Clock size={14} className="mr-1" />
                        {new Date(automation.lastRun).toLocaleDateString()}
                      </div>
                    ) : (
                      <span className="text-gray-400">Never</span>
                    )}
                  </td>
                  <td>
                    <Badge
                      variant={
                        automation.status === 'active' ? 'success' :
                        automation.status === 'inactive' ? 'warning' :
                        'outline'
                      }
                    >
                      {automation.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100">
                      {automation.status === 'active' ? (
                        <button className="text-gray-500 hover:text-warning" title="Pause">
                          <Pause size={16} />
                        </button>
                      ) : (
                        <button className="text-gray-500 hover:text-success" title="Activate">
                          <Play size={16} />
                        </button>
                      )}
                      <button className="text-gray-500 hover:text-primary" title="Edit">
                        <Settings size={16} />
                      </button>
                      <button className="text-gray-500 hover:text-primary" title="Duplicate">
                        <Copy size={16} />
                      </button>
                      <button className="text-gray-500 hover:text-error" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {automations.map((automation) => (
            <Card key={automation.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Workflow size={20} className="text-primary" />
                    <h3 className="ml-2 font-medium text-gray-900">{automation.name}</h3>
                  </div>
                  <Badge
                    variant={
                      automation.status === 'active' ? 'success' :
                      automation.status === 'inactive' ? 'warning' :
                      'outline'
                    }
                  >
                    {automation.status}
                  </Badge>
                </div>

                <p className="mt-2 text-sm text-gray-500">{automation.description}</p>

                <div className="mt-4">
                  <Badge variant="outline">{automation.service}</Badge>
                </div>

                <div className="mt-4 space-y-2">
                  {automation.steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                        {step.icon}
                      </div>
                      <ArrowRight size={12} className="mx-2 text-gray-400" />
                      <span className="text-sm text-gray-600">{step.name}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="rounded-md bg-gray-50 p-2">
                    <p className="font-medium text-gray-900">{automation.stats.runs}</p>
                    <p className="text-xs text-gray-500">Total Runs</p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-2">
                    <p className="font-medium text-success">{automation.stats.success}</p>
                    <p className="text-xs text-gray-500">Successful</p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-2">
                    <p className="font-medium text-error">{automation.stats.failed}</p>
                    <p className="text-xs text-gray-500">Failed</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                      {automation.createdBy.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">{automation.createdBy.name}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/automations/${automation.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutomationsHome;