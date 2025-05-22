import React from 'react';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'EEEE, MMMM d, yyyy');

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <Clock size={14} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div 
          onClick={() => navigate('/clients')}
          className="cursor-pointer rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="text-sm font-medium text-gray-500">Active Clients</p>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">42</p>
            <p className="ml-2 text-sm font-medium text-success">+12%</p>
          </div>
        </div>

        <div 
          onClick={() => navigate('/jobs')}
          className="cursor-pointer rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="text-sm font-medium text-gray-500">Open Jobs</p>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">18</p>
            <p className="ml-2 text-sm font-medium text-success">+5%</p>
          </div>
        </div>

        <div 
          onClick={() => navigate('/billing/invoices')}
          className="cursor-pointer rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="text-sm font-medium text-gray-500">Pending Invoices</p>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">9</p>
            <p className="ml-2 text-sm font-medium text-error">-2</p>
          </div>
        </div>

        <div 
          onClick={() => navigate('/billing')}
          className="cursor-pointer rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="text-sm font-medium text-gray-500">Revenue (MTD)</p>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">$28,450</p>
            <p className="ml-2 text-sm font-medium text-success">+18%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;