import React from 'react';
import { 
  CreditCard, 
  DollarSign, 
  ArrowUpRight, 
  AlertCircle, 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Download, 
  ExternalLink,
  MoreVertical 
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/Card';

const BillingDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
          <p className="text-sm text-gray-500">Manage invoices and payments</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary/10 p-3">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-xl font-semibold text-gray-900">$28,450</h3>
                <p className="text-xs font-medium text-success flex items-center">
                  <ArrowUpRight size={12} className="mr-1" />
                  +18% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-success/10 p-3">
                <CreditCard className="h-6 w-6 text-success" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Paid Invoices</p>
                <h3 className="text-xl font-semibold text-gray-900">12</h3>
                <p className="text-xs text-gray-500">$18,200 this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-warning/10 p-3">
                <CreditCard className="h-6 w-6 text-warning" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Invoices</p>
                <h3 className="text-xl font-semibold text-gray-900">9</h3>
                <p className="text-xs text-gray-500">$12,650 outstanding</p>
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
                <p className="text-sm font-medium text-gray-500">Overdue Invoices</p>
                <h3 className="text-xl font-semibold text-gray-900">3</h3>
                <p className="text-xs text-gray-500">$4,200 overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Payments</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="rounded-full bg-success/10 p-2">
                    <DollarSign className="h-4 w-4 text-success" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Tech Innovations Inc.</p>
                    <p className="text-xs text-gray-500">INV-2023-002 • Oct 5, 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">$2,500.00</p>
                  <Badge variant="success">Received</Badge>
                </div>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="rounded-full bg-success/10 p-2">
                    <DollarSign className="h-4 w-4 text-success" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Digital Media Group</p>
                    <p className="text-xs text-gray-500">INV-2023-006 • Sep 28, 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">$1,850.00</p>
                  <Badge variant="success">Received</Badge>
                </div>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="rounded-full bg-success/10 p-2">
                    <DollarSign className="h-4 w-4 text-success" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Johnson & Partners</p>
                    <p className="text-xs text-gray-500">INV-2023-008 • Sep 22, 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">$3,200.00</p>
                  <Badge variant="success">Received</Badge>
                </div>
              </li>
            </ul>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" className="w-full">
                View All Payments
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                <div className="flex items-center">
                  <div className="rounded-md bg-primary p-2">
                    <CreditCard className="h-4 w-4 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Credit Card</p>
                    <p className="text-xs text-gray-500">Visa •••• 4242</p>
                  </div>
                </div>
                <Badge variant="success">Default</Badge>
              </li>
              <li className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                <div className="flex items-center">
                  <div className="rounded-md bg-gray-200 p-2">
                    <CreditCard className="h-4 w-4 text-gray-700" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Credit Card</p>
                    <p className="text-xs text-gray-500">Mastercard •••• 5555</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Make Default</Button>
              </li>
              <li className="flex items-center justify-between rounded-md border border-dashed border-gray-300 p-3">
                <div className="flex items-center">
                  <div className="rounded-md bg-gray-100 p-2">
                    <Plus className="h-4 w-4 text-gray-500" />
                  </div>
                  <p className="ml-3 text-sm font-medium text-gray-700">Add Payment Method</p>
                </div>
                <Button variant="outline" size="sm">Add</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillingDashboard;