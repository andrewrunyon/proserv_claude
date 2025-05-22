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
  FileText,
  Mail,
  Bell,
  Users,
  ArrowRight,
  MoreVertical,
  AlertTriangle
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

interface Reminder {
  id: string;
  name: string;
  service: string;
  triggerTiming: {
    type: 'after_start' | 'before_due' | 'after_due';
    days: number;
  };
  documents: string[];
  template: string;
  repeat: {
    enabled: boolean;
    frequency: number;
    maxReminders: number;
  };
  escalation?: {
    enabled: boolean;
    after: number;
    to: string;
  };
  status: 'active' | 'paused' | 'draft';
  stats: {
    sent: number;
    pending: number;
    resolved: number;
  };
  lastTriggered?: string;
  nextScheduled?: string;
}

const reminders: Reminder[] = [
  {
    id: '1',
    name: 'Tax Documents Reminder',
    service: 'Tax Services',
    triggerTiming: {
      type: 'before_due',
      days: 30
    },
    documents: [
      'W-2 Forms',
      'Investment Statements',
      'Business Income Records'
    ],
    template: 'Tax Documents Request',
    repeat: {
      enabled: true,
      frequency: 7,
      maxReminders: 3
    },
    escalation: {
      enabled: true,
      after: 2,
      to: 'Account Manager'
    },
    status: 'active',
    stats: {
      sent: 45,
      pending: 12,
      resolved: 33
    },
    lastTriggered: '2024-03-10',
    nextScheduled: '2024-03-17'
  },
  {
    id: '2',
    name: 'Monthly Statements',
    service: 'Bookkeeping',
    triggerTiming: {
      type: 'after_start',
      days: 5
    },
    documents: [
      'Bank Statements',
      'Credit Card Statements',
      'Expense Reports'
    ],
    template: 'Monthly Documents Request',
    repeat: {
      enabled: true,
      frequency: 5,
      maxReminders: 2
    },
    status: 'active',
    stats: {
      sent: 28,
      pending: 8,
      resolved: 20
    },
    lastTriggered: '2024-03-12',
    nextScheduled: '2024-03-17'
  },
  {
    id: '3',
    name: 'Audit Documentation',
    service: 'Audit',
    triggerTiming: {
      type: 'after_start',
      days: 1
    },
    documents: [
      'Financial Statements',
      'General Ledger',
      'Supporting Documents'
    ],
    template: 'Audit Documents Checklist',
    repeat: {
      enabled: false,
      frequency: 0,
      maxReminders: 0
    },
    status: 'draft',
    stats: {
      sent: 0,
      pending: 0,
      resolved: 0
    }
  }
];

const DocumentReminders: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedReminders, setSelectedReminders] = useState<string[]>([]);

  const handleSelectAll = () => {
    if (selectedReminders.length === reminders.length) {
      setSelectedReminders([]);
    } else {
      setSelectedReminders(reminders.map(reminder => reminder.id));
    }
  };

  const handleSelectReminder = (reminderId: string) => {
    setSelectedReminders(prev => {
      if (prev.includes(reminderId)) {
        return prev.filter(id => id !== reminderId);
      }
      return [...prev, reminderId];
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Reminders</h1>
          <p className="text-sm text-gray-500">Manage automated document request reminders</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => navigate('/automations/reminders/new')}
        >
          Create Reminder
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Reminders</p>
                <h3 className="text-xl font-semibold text-gray-900">
                  {reminders.filter(r => r.status === 'active').length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-warning/10 p-3">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Documents</p>
                <h3 className="text-xl font-semibold text-gray-900">
                  {reminders.reduce((sum, r) => sum + r.stats.pending, 0)}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-success/10 p-3">
                <FileText className="h-6 w-6 text-success" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Resolved This Week</p>
                <h3 className="text-xl font-semibold text-gray-900">15</h3>
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
            placeholder="Search reminders..."
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
            <option>Paused</option>
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
                    checked={selectedReminders.length === reminders.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Reminder Name</th>
                <th>Service</th>
                <th>Trigger</th>
                <th>Template</th>
                <th>Stats</th>
                <th>Next Scheduled</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reminders.map((reminder) => (
                <tr key={reminder.id} className="group hover:bg-gray-50">
                  <td>
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedReminders.includes(reminder.id)}
                      onChange={() => handleSelectReminder(reminder.id)}
                    />
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <button
                        className="font-medium text-gray-900 hover:text-primary text-left"
                        onClick={() => navigate(`/automations/reminders/${reminder.id}`)}
                      >
                        {reminder.name}
                      </button>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {reminder.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge variant="outline">{reminder.service}</Badge>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1 text-gray-400" />
                      <span>
                        {reminder.triggerTiming.days} days 
                        {reminder.triggerTiming.type === 'after_start' && ' after start'}
                        {reminder.triggerTiming.type === 'before_due' && ' before due'}
                        {reminder.triggerTiming.type === 'after_due' && ' after due'}
                      </span>
                    </div>
                  </td>
                  <td>{reminder.template}</td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Badge variant="success" className="text-xs">
                        {reminder.stats.resolved} resolved
                      </Badge>
                      <Badge variant="warning" className="text-xs">
                        {reminder.stats.pending} pending
                      </Badge>
                    </div>
                  </td>
                  <td>
                    {reminder.nextScheduled ? (
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1 text-gray-400" />
                        {new Date(reminder.nextScheduled).toLocaleDateString()}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td>
                    <Badge
                      variant={
                        reminder.status === 'active' ? 'success' :
                        reminder.status === 'paused' ? 'warning' : 'outline'
                      }
                    >
                      {reminder.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100">
                      {reminder.status === 'active' ? (
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
          {reminders.map((reminder) => (
            <Card key={reminder.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell size={20} className="text-primary" />
                    <h3 className="ml-2 font-medium text-gray-900">{reminder.name}</h3>
                  </div>
                  <Badge
                    variant={
                      reminder.status === 'active' ? 'success' :
                      reminder.status === 'paused' ? 'warning' : 'outline'
                    }
                  >
                    {reminder.status}
                  </Badge>
                </div>

                <div className="mt-4">
                  <Badge variant="outline">{reminder.service}</Badge>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Clock size={14} className="mr-1 text-gray-400" />
                    <span>
                      {reminder.triggerTiming.days} days 
                      {reminder.triggerTiming.type === 'after_start' && ' after start'}
                      {reminder.triggerTiming.type === 'before_due' && ' before due'}
                      {reminder.triggerTiming.type === 'after_due' && ' after due'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail size={14} className="mr-1 text-gray-400" />
                    <span>{reminder.template}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700">Required Documents:</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {reminder.documents.map((doc, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="rounded-md bg-gray-50 p-2">
                    <p className="font-medium text-success">{reminder.stats.resolved}</p>
                    <p className="text-xs text-gray-500">Resolved</p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-2">
                    <p className="font-medium text-warning">{reminder.stats.pending}</p>
                    <p className="text-xs text-gray-500">Pending</p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-2">
                    <p className="font-medium text-primary">{reminder.stats.sent}</p>
                    <p className="text-xs text-gray-500">Sent</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                  {reminder.nextScheduled ? (
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      Next: {new Date(reminder.nextScheduled).toLocaleDateString()}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">No upcoming reminders</span>
                  )}
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

export default DocumentReminders;