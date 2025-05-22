import React from 'react';
import { 
  BarChart2, 
  FileText, 
  Clock, 
  Users, 
  CheckCircle, 
  Plus,
  ArrowUpRight,
  Download,
  Eye,
  PlayCircle,
  Edit,
  Search,
  Filter,
  Calendar,
  DollarSign,
  FileSpreadsheet,
  Settings,
  Star
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

interface SummaryCard {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  icon: React.ReactNode;
  link: string;
}

interface RecentReport {
  id: string;
  name: string;
  type: string;
  lastRun: string;
  status: 'completed' | 'failed' | 'running';
}

const summaryCards: SummaryCard[] = [
  {
    title: 'Revenue YTD',
    value: '$284,500',
    change: '+12%',
    trend: 'up',
    icon: <DollarSign className="h-6 w-6 text-primary" />,
    link: '/reports/revenue'
  },
  {
    title: 'Invoices Sent',
    value: '45',
    change: '+8%',
    trend: 'up',
    icon: <FileText className="h-6 w-6 text-secondary" />,
    link: '/reports/invoices'
  },
  {
    title: 'Avg. Payment Time',
    value: '12 days',
    change: '-2 days',
    trend: 'up',
    icon: <Clock className="h-6 w-6 text-success" />,
    link: '/reports/payments'
  },
  {
    title: 'Jobs Completed',
    value: '28',
    change: '+15%',
    trend: 'up',
    icon: <CheckCircle className="h-6 w-6 text-warning" />,
    link: '/reports/jobs'
  },
  {
    title: 'Open Tasks',
    value: '156',
    change: '-5%',
    trend: 'down',
    icon: <FileSpreadsheet className="h-6 w-6 text-error" />,
    link: '/reports/tasks'
  },
  {
    title: 'New Clients',
    value: '12',
    change: '+33%',
    trend: 'up',
    icon: <Users className="h-6 w-6 text-accent" />,
    link: '/reports/clients'
  }
];

const recentReports: RecentReport[] = [
  {
    id: '1',
    name: 'Monthly Revenue Analysis',
    type: 'Revenue',
    lastRun: '2 hours ago',
    status: 'completed'
  },
  {
    id: '2',
    name: 'Client Acquisition Report',
    type: 'Clients',
    lastRun: '1 day ago',
    status: 'completed'
  },
  {
    id: '3',
    name: 'Team Performance Q1',
    type: 'Performance',
    lastRun: '2 days ago',
    status: 'failed'
  },
  {
    id: '4',
    name: 'Outstanding Invoices',
    type: 'Billing',
    lastRun: '3 days ago',
    status: 'completed'
  }
];

const ReportsDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports Dashboard</h1>
          <p className="text-sm text-gray-500">Get a quick overview of key metrics across your firm</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            leftIcon={<Download size={16} />}
          >
            Export All
          </Button>
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
          >
            New Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {summaryCards.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-gray-100 p-3">
                  {card.icon}
                </div>
                {card.change && (
                  <div className={`flex items-center ${
                    card.trend === 'up' ? 'text-success' : 'text-error'
                  }`}>
                    <ArrowUpRight size={16} className="mr-1" />
                    <span className="text-sm font-medium">{card.change}</span>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-semibold text-gray-900">{card.value}</h3>
                <p className="text-sm text-gray-500">{card.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Recent Reports</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <Button
                  variant="outline"
                  leftIcon={<Filter size={16} />}
                >
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-gray-200">
                {recentReports.map((report) => (
                  <div key={report.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-lg bg-gray-100 p-2">
                        <FileText size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{report.name}</h4>
                        <div className="flex items-center space-x-2 text-sm">
                          <Badge variant="outline">{report.type}</Badge>
                          <span className="text-gray-500">{report.lastRun}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Eye size={14} />}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<PlayCircle size={14} />}
                      >
                        Run Again
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Edit size={14} />}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                leftIcon={<FileText size={16} />}
              >
                Browse Catalogue
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                leftIcon={<Settings size={16} />}
              >
                Build Custom Report
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                leftIcon={<Star size={16} />}
              >
                View Community Templates
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                leftIcon={<Download size={16} />}
              >
                Export All Reports
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Weekly Revenue</p>
                    <p className="text-sm text-gray-500">Every Monday at 9:00 AM</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Monthly KPIs</p>
                    <p className="text-sm text-gray-500">1st of every month</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  leftIcon={<Plus size={16} />}
                >
                  Schedule Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;