import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Users, 
  Calendar,
  Filter,
  Plus,
  Search,
  ArrowUpRight,
  DollarSign,
  BarChart2,
  List,
  Grid3X3,
  ChevronDown,
  MoreVertical,
  Edit,
  MessageSquare,
  Eye
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/Card';

interface Job {
  id: string;
  title: string;
  client: {
    name: string;
    id: string;
  };
  assignee: {
    name: string;
    avatar?: string;
  };
  dueDate: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  stage: 'intake' | 'in-progress' | 'review' | 'delivery';
}

const jobs: Job[] = [
  {
    id: '1',
    title: 'Website Redesign',
    client: {
      name: 'Acme Corp',
      id: 'client-1'
    },
    assignee: {
      name: 'John Doe'
    },
    dueDate: '2024-06-30',
    priority: 'High',
    stage: 'intake'
  },
  {
    id: '2',
    title: 'Mobile App Development',
    client: {
      name: 'HealthTech',
      id: 'client-2'
    },
    assignee: {
      name: 'Mike Chen'
    },
    dueDate: '2024-06-25',
    priority: 'Critical',
    stage: 'in-progress'
  },
  {
    id: '3',
    title: 'Marketing Strategy',
    client: {
      name: 'FitLife Co',
      id: 'client-3'
    },
    assignee: {
      name: 'Emma Davis'
    },
    dueDate: '2024-07-05',
    priority: 'Medium',
    stage: 'review'
  },
  {
    id: '4',
    title: 'SEO Optimization',
    client: {
      name: 'Global Tech',
      id: 'client-4'
    },
    assignee: {
      name: 'Alex Kim'
    },
    dueDate: '2024-07-15',
    priority: 'High',
    stage: 'delivery'
  }
];

const stages = [
  { id: 'intake', name: 'Intake Received', count: 3 },
  { id: 'in-progress', name: 'In Progress', count: 4 },
  { id: 'review', name: 'Review', count: 2 },
  { id: 'delivery', name: 'Ready for Delivery', count: 1 }
];

const priorityColors = {
  Critical: 'error',
  High: 'warning',
  Medium: 'primary',
  Low: 'success'
} as const;

const JobsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    service: '',
    teamMember: '',
    dateFrom: '',
    dateTo: ''
  });

  const handleCreateJob = () => {
    navigate('/jobs/new');
  };

  const handleJobClick = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  const filteredJobs = jobs.filter(job => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        job.title.toLowerCase().includes(query) ||
        job.client.name.toLowerCase().includes(query) ||
        job.assignee.name.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const jobsByStage = stages.reduce((acc, stage) => {
    acc[stage.id] = filteredJobs.filter(job => job.stage === stage.id);
    return acc;
  }, {} as Record<string, Job[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Jobs Dashboard</h1>
          <p className="text-sm text-gray-500">Track and manage all client projects</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={handleCreateJob}
          >
            Create New Job
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                <h3 className="text-xl font-semibold text-gray-900">24</h3>
                <p className="text-xs font-medium text-success flex items-center">
                  <ArrowUpRight size={12} className="mr-1" />
                  12% from last month
                </p>
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
                <p className="text-sm font-medium text-gray-500">Open Tasks</p>
                <h3 className="text-xl font-semibold text-gray-900">156</h3>
                <p className="text-xs font-medium text-error">43 due today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-success/10 p-3">
                <BarChart2 className="h-6 w-6 text-success" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Team Performance</p>
                <h3 className="text-xl font-semibold text-gray-900">92%</h3>
                <p className="text-xs font-medium text-success flex items-center">
                  <ArrowUpRight size={12} className="mr-1" />
                  5% improvement
                </p>
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
                <p className="text-sm font-medium text-gray-500">Revenue This Month</p>
                <h3 className="text-xl font-semibold text-gray-900">$45,250</h3>
                <p className="text-xs font-medium text-success flex items-center">
                  <ArrowUpRight size={12} className="mr-1" />
                  18% increase
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-error/10 p-3">
                <AlertCircle className="h-6 w-6 text-error" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">At Risk Jobs</p>
                <h3 className="text-xl font-semibold text-gray-900">5</h3>
                <p className="text-xs font-medium text-error">2 new this week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <select
            className="rounded-md border border-gray-300 py-2 pl-3 pr-8 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="on-hold">On Hold</option>
            <option value="completed">Completed</option>
          </select>

          <select
            className="rounded-md border border-gray-300 py-2 pl-3 pr-8 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            value={filters.service}
            onChange={(e) => setFilters({ ...filters, service: e.target.value })}
          >
            <option value="">All Services</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
          </select>

          <select
            className="rounded-md border border-gray-300 py-2 pl-3 pr-8 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            value={filters.teamMember}
            onChange={(e) => setFilters({ ...filters, teamMember: e.target.value })}
          >
            <option value="">All Team Members</option>
            <option value="john">John Doe</option>
            <option value="sarah">Sarah Wilson</option>
            <option value="mike">Mike Chen</option>
          </select>

          <div className="flex items-center space-x-2">
            <input
              type="date"
              className="rounded-md border border-gray-300 py-2 px-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
            />
            <span>to</span>
            <input
              type="date"
              className="rounded-md border border-gray-300 py-2 px-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            />
          </div>
        </div>

        <div className="ml-auto flex items-center space-x-2">
          <div className="border border-gray-300 rounded-lg flex">
            <button
              className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 text-primary' : 'text-gray-500'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </button>
            <button
              className={`p-2 ${viewMode === 'kanban' ? 'bg-gray-100 text-primary' : 'text-gray-500'}`}
              onClick={() => setViewMode('kanban')}
            >
              <Grid3X3 size={16} />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <div className="flex gap-6 overflow-x-auto pb-6">
          {stages.map((stage) => (
            <div key={stage.id} className="flex-1 min-w-[300px]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{stage.name}</h3>
                <span className="text-sm text-gray-500">{stage.count}</span>
              </div>
              <div className="space-y-3">
                {jobsByStage[stage.id]?.map((job) => (
                  <Card
                    key={job.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleJobClick(job.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{job.title}</h4>
                        <Badge variant={priorityColors[job.priority]}>{job.priority}</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        Client: {job.client.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                            {job.assignee.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">{job.assignee.name}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          {new Date(job.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center space-x-2 opacity-0 group-hover:opacity-100">
                        <button className="p-1 hover:bg-gray-100 rounded-lg">
                          <Eye size={14} className="text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded-lg">
                          <Edit size={14} className="text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded-lg">
                          <MessageSquare size={14} className="text-gray-500" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Job Name</th>
                <th>Client</th>
                <th>Assignee</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id} className="group hover:bg-gray-50">
                  <td>
                    <button
                      className="font-medium text-primary hover:underline text-left"
                      onClick={() => handleJobClick(job.id)}
                    >
                      {job.title}
                    </button>
                  </td>
                  <td>{job.client.name}</td>
                  <td>
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                        {job.assignee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="ml-2">{job.assignee.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      {new Date(job.dueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <Badge variant={priorityColors[job.priority]}>{job.priority}</Badge>
                  </td>
                  <td>
                    <Badge variant="outline">
                      {stages.find(s => s.id === job.stage)?.name}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100">
                      <button className="p-1 hover:bg-gray-100 rounded-lg">
                        <Eye size={14} className="text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg">
                        <Edit size={14} className="text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg">
                        <MessageSquare size={14} className="text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg">
                        <MoreVertical size={14} className="text-gray-500" />
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

export default JobsDashboard;