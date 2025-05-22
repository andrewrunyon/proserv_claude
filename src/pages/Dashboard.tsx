import React, { useState } from 'react';
import { 
  UserPlus, 
  FolderPlus, 
  CreditCard,
  CheckSquare,
  MessageSquare,
  Briefcase,
  DollarSign,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import RecentActivity from '../components/dashboard/RecentActivity';
import UpcomingTasks from '../components/dashboard/UpcomingTasks';
import RevenueChart from '../components/dashboard/RevenueChart';
import { Card, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('month');
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      {/* Hero Section */}
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          What do you want to do today?
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            leftIcon={<UserPlus size={18} />}
            className="min-w-[160px]"
            onClick={() => navigate('/clients/new')}
          >
            Add New Client
          </Button>
          <Button
            variant="primary"
            leftIcon={<FolderPlus size={18} />}
            className="min-w-[160px]"
            onClick={() => navigate('/jobs/new')}
          >
            Start New Job
          </Button>
          <Button
            variant="primary"
            leftIcon={<CreditCard size={18} />}
            className="min-w-[160px]"
            onClick={() => navigate('/billing/invoices')}
          >
            View Invoices
          </Button>
        </div>
      </div>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Tasks Widget */}
        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => navigate('/jobs/tasks')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckSquare className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="warning">5 Urgent</Badge>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-semibold text-gray-900">18</h3>
              <p className="text-sm text-gray-500">Open Tasks</p>
            </div>
            <div className="mt-4">
              <div className="h-2 w-full rounded-full bg-gray-100">
                <div className="h-2 rounded-full bg-primary" style={{ width: '65%' }} />
              </div>
              <p className="mt-2 text-xs text-gray-500">65% completed this week</p>
            </div>
          </CardContent>
        </Card>

        {/* Messages Widget */}
        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => navigate('/jobs/inbox')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-secondary/10 p-3">
                <MessageSquare className="h-6 w-6 text-secondary" />
              </div>
              <Badge variant="primary">12 New</Badge>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-semibold text-gray-900">28</h3>
              <p className="text-sm text-gray-500">Unread Messages</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm">
                <span className="h-2 w-2 rounded-full bg-primary mr-2" />
                <span className="text-gray-600">8 client responses</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="h-2 w-2 rounded-full bg-secondary mr-2" />
                <span className="text-gray-600">4 team updates</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Jobs Widget */}
        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => navigate('/jobs')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-accent/10 p-3">
                <Briefcase className="h-6 w-6 text-accent" />
              </div>
              <Badge variant="success">On Track</Badge>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-semibold text-gray-900">7</h3>
              <p className="text-sm text-gray-500">Active Jobs</p>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium text-gray-700">75%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                <div className="h-2 rounded-full bg-accent" style={{ width: '75%' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoices Widget */}
        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => navigate('/billing/invoices')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-error/10 p-3">
                <CreditCard className="h-6 w-6 text-error" />
              </div>
              <Badge variant="error">3 Overdue</Badge>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-semibold text-gray-900">$12,450</h3>
              <p className="text-sm text-gray-500">Unpaid Invoices (9)</p>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-500">Due this week</span>
              <span className="font-medium text-gray-700">$4,800</span>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Widget */}
        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer sm:col-span-2"
          onClick={() => navigate('/billing')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="rounded-full bg-success/10 p-3">
                  <DollarSign className="h-6 w-6 text-success" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-semibold text-gray-900">$28,450</h3>
                  <p className="text-sm text-gray-500">Revenue (This Month)</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-success">
                  <ArrowUpRight size={20} />
                  <span className="ml-1 font-medium">18%</span>
                </div>
                <p className="text-xs text-gray-500">vs. previous period</p>
              </div>
            </div>
            <div className="mt-6 h-[100px]">
              <RevenueChart />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <RecentActivity />
        </div>
        <div className="md:col-span-5">
          <UpcomingTasks />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;