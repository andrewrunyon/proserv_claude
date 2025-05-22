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
  Calendar,
  Clock,
  Users,
  Repeat,
  ArrowUpRight,
  MoreVertical
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

interface RecurringJob {
  id: string;
  name: string;
  service: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  nextScheduled: string;
  assignedTo: {
    id: string;
    name: string;
  };
  linkedClients: number;
  status: 'active' | 'paused' | 'draft';
  lastRun?: string;
  pattern: string;
  description?: string;
  stats: {
    completed: number;
    upcoming: number;
    failed: number;
  };
}

const recurringJobs: RecurringJob[] = [
  {
    id: '1',
    name: 'Monthly Bookkeeping',
    service: 'Bookkeeping',
    frequency: 'monthly',
    nextScheduled: '2024-04-01',
    assignedTo: {
      id: '1',
      name: 'Sarah Wilson'
    },
    linkedClients: 8,
    status: 'active',
    lastRun: '2024-03-01',
    pattern: '{client_name} - Monthly Bookkeeping {date}',
    description: 'Monthly bookkeeping and financial statement preparation',
    stats: {
      completed: 24,
      upcoming: 8,
      failed: 0
    }
  },
  {
    id: '2',
    name: 'Quarterly Tax Estimates',
    service: 'Tax Services',
    frequency: 'quarterly',
    nextScheduled: '2024-04-15',
    assignedTo: {
      id: '2',
      name: 'Mike Johnson'
    },
    linkedClients: 12,
    status: 'active',
    lastRun: '2024-01-15',
    pattern: '{client_name} - Q{quarter} Tax Estimate {year}',
    description: 'Quarterly tax estimate calculations and payments',
    stats: {
      completed: 36,
      upcoming: 12,
      failed: 1
    }
  },
  {
    id: '3',
    name: 'Weekly Payroll',
    service: 'Payroll',
    frequency: 'weekly',
    nextScheduled: '2024-03-22',
    assignedTo: {
      id: '3',
      name: 'David Chen'
    },
    linkedClients: 5,
    status: 'paused',
    lastRun: '2024-03-15',
    pattern: '{client_name} - Payroll Week {week}',
    description: 'Weekly payroll processing and tax payments',
    stats: {
      completed: 60,
      upcoming: 0,
      failed: 2
    }
  }
];

const RecurringJobs: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  const handleSelectAll = () => {
    if (selectedJobs.length === recurringJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(recurringJobs.map(job => job.id));
    }
  };

  const handleSelectJob = (jobId: string) => {
    setSelectedJobs(prev => {
      if (prev.includes(jobId)) {
        return prev.filter(id => id !== jobId);
      }
      return [...prev, jobId];
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recurring Jobs</h1>
          <p className="text-sm text-gray-500">Manage jobs that repeat on a defined schedule</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => navigate('/jobs/new?type=recurring')}
        >
          Create Recurring Job
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Repeat className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Jobs</p>
                <h3 className="text-xl font-semibold text-gray-900">{recurringJobs.length}</h3>
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
                  {recurringJobs.filter(job => job.status === 'active').length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-warning/10 p-3">
                <Calendar className="h-6 w-6 text-warning" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Due This Week</p>
                <h3 className="text-xl font-semibold text-gray-900">5</h3>
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
            placeholder="Search recurring jobs..."
            className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
          <select className="rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option>All Services</option>
            <option>Tax Services</option>
            <option>Bookkeeping</option>
            <option>Payroll</option>
          </select>

          <select className="rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option>All Frequencies</option>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
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
                    checked={selectedJobs.length === recurringJobs.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Template Name</th>
                <th>Service</th>
                <th>Frequency</th>
                <th>Next Scheduled</th>
                <th>Assigned To</th>
                <th>Linked Clients</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recurringJobs.map((job) => (
                <tr key={job.id} className="group hover:bg-gray-50">
                  <td>
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedJobs.includes(job.id)}
                      onChange={() => handleSelectJob(job.id)}
                    />
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <button
                        className="font-medium text-gray-900 hover:text-primary text-left"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                      >
                        {job.name}
                      </button>
                      <span className="text-sm text-gray-500">{job.pattern}</span>
                    </div>
                  </td>
                  <td>
                    <Badge variant="outline">{job.service}</Badge>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <Repeat size={14} className="mr-1 text-gray-400" />
                      <span className="capitalize">{job.frequency}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1 text-gray-400" />
                      {new Date(job.nextScheduled).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                        {job.assignedTo.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="ml-2">{job.assignedTo.name}</span>
                    </div>
                  </td>
                  <td className="text-center">{job.linkedClients}</td>
                  <td>
                    <Badge
                      variant={
                        job.status === 'active' ? 'success' :
                        job.status === 'paused' ? 'warning' : 'outline'
                      }
                    >
                      {job.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100">
                      {job.status === 'active' ? (
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
          {recurringJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Repeat size={20} className="text-primary" />
                    <h3 className="ml-2 font-medium text-gray-900">{job.name}</h3>
                  </div>
                  <Badge
                    variant={
                      job.status === 'active' ? 'success' :
                      job.status === 'paused' ? 'warning' : 'outline'
                    }
                  >
                    {job.status}
                  </Badge>
                </div>

                <p className="mt-2 text-sm text-gray-500">{job.pattern}</p>

                <div className="mt-4">
                  <Badge variant="outline">{job.service}</Badge>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Frequency</span>
                    <span className="capitalize">{job.frequency}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Next Run</span>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1 text-gray-400" />
                      {new Date(job.nextScheduled).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Linked Clients</span>
                    <span>{job.linkedClients}</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="rounded-md bg-gray-50 p-2">
                    <p className="font-medium text-gray-900">{job.stats.completed}</p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-2">
                    <p className="font-medium text-warning">{job.stats.upcoming}</p>
                    <p className="text-xs text-gray-500">Upcoming</p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-2">
                    <p className="font-medium text-error">{job.stats.failed}</p>
                    <p className="text-xs text-gray-500">Failed</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                      {job.assignedTo.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">{job.assignedTo.name}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Settings size={14} />}
                  >
                    Configure
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

export default RecurringJobs;