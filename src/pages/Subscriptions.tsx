import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  DollarSign,
  Users,
  ArrowUpRight,
  Edit,
  Pause,
  Play,
  Copy,
  Trash2,
  MoreVertical,
  Repeat,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  FileText,
  Settings
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

interface Subscription {
  id: string;
  name: string;
  client: {
    id: string;
    name: string;
  };
  service: {
    id: string;
    name: string;
  };
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'annually';
  startDate: string;
  nextBilling: string;
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  paymentMethod: {
    type: 'credit_card' | 'ach' | 'check';
    last4?: string;
  };
  lastInvoice?: {
    id: string;
    number: string;
    date: string;
    status: 'paid' | 'pending' | 'overdue';
  };
  autoRenew: boolean;
  notes?: string;
}

const subscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Monthly Bookkeeping',
    client: {
      id: '1',
      name: 'Acme Corporation'
    },
    service: {
      id: '1',
      name: 'Bookkeeping Services'
    },
    amount: 499,
    frequency: 'monthly',
    startDate: '2024-01-01',
    nextBilling: '2024-04-01',
    status: 'active',
    paymentMethod: {
      type: 'credit_card',
      last4: '4242'
    },
    lastInvoice: {
      id: 'inv-1',
      number: 'INV-2024-003',
      date: '2024-03-01',
      status: 'paid'
    },
    autoRenew: true
  },
  {
    id: '2',
    name: 'Quarterly Tax Planning',
    client: {
      id: '2',
      name: 'Tech Solutions Inc.'
    },
    service: {
      id: '2',
      name: 'Tax Advisory'
    },
    amount: 1499,
    frequency: 'quarterly',
    startDate: '2024-01-15',
    nextBilling: '2024-04-15',
    status: 'active',
    paymentMethod: {
      type: 'ach'
    },
    lastInvoice: {
      id: 'inv-2',
      number: 'INV-2024-002',
      date: '2024-01-15',
      status: 'paid'
    },
    autoRenew: true
  },
  {
    id: '3',
    name: 'Annual Audit',
    client: {
      id: '3',
      name: 'Global Industries'
    },
    service: {
      id: '3',
      name: 'Audit Services'
    },
    amount: 5999,
    frequency: 'annually',
    startDate: '2024-02-01',
    nextBilling: '2025-02-01',
    status: 'active',
    paymentMethod: {
      type: 'credit_card',
      last4: '8888'
    },
    lastInvoice: {
      id: 'inv-3',
      number: 'INV-2024-001',
      date: '2024-02-01',
      status: 'paid'
    },
    autoRenew: false
  },
  {
    id: '4',
    name: 'Monthly Payroll',
    client: {
      id: '4',
      name: 'City Services LLC'
    },
    service: {
      id: '4',
      name: 'Payroll Processing'
    },
    amount: 299,
    frequency: 'monthly',
    startDate: '2024-01-01',
    nextBilling: '2024-04-01',
    status: 'paused',
    paymentMethod: {
      type: 'check'
    },
    lastInvoice: {
      id: 'inv-4',
      number: 'INV-2024-004',
      date: '2024-03-01',
      status: 'overdue'
    },
    autoRenew: true,
    notes: 'Paused due to account review'
  }
];

const statusBadges = {
  active: <Badge variant="success">Active</Badge>,
  paused: <Badge variant="warning">Paused</Badge>,
  cancelled: <Badge variant="error">Cancelled</Badge>,
  expired: <Badge variant="secondary">Expired</Badge>
};

const frequencyBadges = {
  monthly: <Badge variant="outline">Monthly</Badge>,
  quarterly: <Badge variant="outline">Quarterly</Badge>,
  annually: <Badge variant="outline">Annually</Badge>
};

const Subscriptions: React.FC = () => {
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([]);

  const handleSelectAll = () => {
    if (selectedSubscriptions.length === subscriptions.length) {
      setSelectedSubscriptions([]);
    } else {
      setSelectedSubscriptions(subscriptions.map(sub => sub.id));
    }
  };

  const handleSelectSubscription = (subscriptionId: string) => {
    setSelectedSubscriptions(prev => {
      if (prev.includes(subscriptionId)) {
        return prev.filter(id => id !== subscriptionId);
      }
      return [...prev, subscriptionId];
    });
  };

  const activeRevenue = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((sum, sub) => {
      const multiplier = sub.frequency === 'monthly' ? 12 : sub.frequency === 'quarterly' ? 4 : 1;
      return sum + (sub.amount * multiplier);
    }, 0);

  const monthlyRecurring = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((sum, sub) => {
      if (sub.frequency === 'monthly') return sum + sub.amount;
      if (sub.frequency === 'quarterly') return sum + (sub.amount / 3);
      if (sub.frequency === 'annually') return sum + (sub.amount / 12);
      return sum;
    }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscriptions</h1>
          <p className="text-sm text-gray-500">Manage recurring billing plans for clients</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
        >
          New Subscription
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Repeat className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Subscriptions</p>
                <h3 className="text-xl font-semibold text-gray-900">
                  {subscriptions.filter(sub => sub.status === 'active').length}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-success/10 p-3">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Annual Revenue</p>
                <h3 className="text-xl font-semibold text-gray-900">
                  ${activeRevenue.toLocaleString()}
                </h3>
                <p className="text-xs font-medium text-success flex items-center">
                  <ArrowUpRight size={12} className="mr-1" />
                  +8% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-secondary/10 p-3">
                <CreditCard className="h-6 w-6 text-secondary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Monthly Recurring</p>
                <h3 className="text-xl font-semibold text-gray-900">
                  ${monthlyRecurring.toLocaleString()}
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
                <p className="text-sm font-medium text-gray-500">Due This Month</p>
                <h3 className="text-xl font-semibold text-gray-900">
                  {subscriptions.filter(sub => 
                    new Date(sub.nextBilling).getMonth() === new Date().getMonth()
                  ).length}
                </h3>
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
            placeholder="Search subscriptions..."
            className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
          <select className="rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option value="">All Clients</option>
            <option value="acme">Acme Corporation</option>
            <option value="tech">Tech Solutions Inc.</option>
            <option value="global">Global Industries</option>
          </select>

          <select className="rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option value="">All Services</option>
            <option value="bookkeeping">Bookkeeping</option>
            <option value="tax">Tax Advisory</option>
            <option value="audit">Audit</option>
          </select>

          <Button
            variant="outline"
            leftIcon={<Filter size={16} />}
          >
            More Filters
          </Button>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="w-4">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedSubscriptions.length === subscriptions.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Plan Name</th>
              <th>Client</th>
              <th>Amount</th>
              <th>Frequency</th>
              <th>Next Billing</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription) => (
              <tr key={subscription.id} className="group hover:bg-gray-50">
                <td>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedSubscriptions.includes(subscription.id)}
                    onChange={() => handleSelectSubscription(subscription.id)}
                  />
                </td>
                <td>
                  <div className="flex flex-col">
                    <button className="font-medium text-primary hover:underline text-left">
                      {subscription.name}
                    </button>
                    <span className="text-sm text-gray-500">{subscription.service.name}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                      {subscription.client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="ml-2">{subscription.client.name}</span>
                  </div>
                </td>
                <td className="font-medium">
                  ${subscription.amount.toLocaleString()}
                </td>
                <td>
                  {frequencyBadges[subscription.frequency]}
                </td>
                <td>
                  <div className="flex items-center text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    {new Date(subscription.nextBilling).toLocaleDateString()}
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    {subscription.paymentMethod.type === 'credit_card' && (
                      <>
                        <CreditCard size={14} className="mr-1 text-gray-400" />
                        <span>•••• {subscription.paymentMethod.last4}</span>
                      </>
                    )}
                    {subscription.paymentMethod.type === 'ach' && (
                      <>
                        <FileText size={14} className="mr-1 text-gray-400" />
                        <span>ACH</span>
                      </>
                    )}
                    {subscription.paymentMethod.type === 'check' && (
                      <>
                        <FileText size={14} className="mr-1 text-gray-400" />
                        <span>Check</span>
                      </>
                    )}
                  </div>
                </td>
                <td>{statusBadges[subscription.status]}</td>
                <td>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100">
                    <button className="text-gray-500 hover:text-primary" title="Edit">
                      <Edit size={16} />
                    </button>
                    {subscription.status === 'active' ? (
                      <button className="text-gray-500 hover:text-warning" title="Pause">
                        <Pause size={16} />
                      </button>
                    ) : (
                      <button className="text-gray-500 hover:text-success" title="Resume">
                        <Play size={16} />
                      </button>
                    )}
                    <button className="text-gray-500 hover:text-primary" title="Duplicate">
                      <Copy size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-error" title="Cancel">
                      <Trash2 size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <div className="text-sm text-gray-500">
          Showing {subscriptions.length} subscriptions
        </div>
        <div className="flex items-center space-x-2">
          <select className="rounded-md border border-gray-300 px-2 py-1">
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
          </select>
          <Button variant="outline" disabled>Previous</Button>
          <Button variant="outline" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;