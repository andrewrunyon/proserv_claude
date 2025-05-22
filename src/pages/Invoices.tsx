import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Mail, 
  MoreVertical,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Edit,
  Copy,
  Trash2,
  ExternalLink
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

interface Invoice {
  id: string;
  number: string;
  client: {
    id: string;
    name: string;
  };
  service: {
    id: string;
    name: string;
  };
  job?: {
    id: string;
    name: string;
  };
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'void';
  paymentMethod?: 'credit_card' | 'ach' | 'check' | 'other';
  lastReminder?: string;
  notes?: string;
}

const invoices: Invoice[] = [
  {
    id: '1',
    number: 'INV-2024-001',
    client: {
      id: '1',
      name: 'Acme Corporation'
    },
    service: {
      id: '1',
      name: 'Tax Return Preparation'
    },
    job: {
      id: '1',
      name: 'Tax Return 2023'
    },
    amount: 3800,
    issueDate: '2024-03-01',
    dueDate: '2024-03-15',
    status: 'overdue',
    paymentMethod: 'credit_card',
    lastReminder: '2024-03-10'
  },
  {
    id: '2',
    number: 'INV-2024-002',
    client: {
      id: '2',
      name: 'Tech Solutions Inc.'
    },
    service: {
      id: '2',
      name: 'Monthly Bookkeeping'
    },
    amount: 2500,
    issueDate: '2024-02-25',
    dueDate: '2024-03-10',
    status: 'paid',
    paymentMethod: 'ach'
  },
  {
    id: '3',
    number: 'INV-2024-003',
    client: {
      id: '3',
      name: 'Global Industries'
    },
    service: {
      id: '3',
      name: 'Business Advisory'
    },
    job: {
      id: '3',
      name: 'Strategic Planning Q1'
    },
    amount: 4200,
    issueDate: '2024-02-15',
    dueDate: '2024-02-28',
    status: 'sent',
    lastReminder: '2024-03-01'
  },
  {
    id: '4',
    number: 'INV-2024-004',
    client: {
      id: '4',
      name: 'City Consulting Group'
    },
    service: {
      id: '4',
      name: 'Financial Planning'
    },
    amount: 1850,
    issueDate: '2024-03-05',
    dueDate: '2024-03-20',
    status: 'draft'
  },
  {
    id: '5',
    number: 'INV-2024-005',
    client: {
      id: '5',
      name: 'Nexus Partners'
    },
    service: {
      id: '5',
      name: 'Audit Services'
    },
    amount: 7600,
    issueDate: '2024-02-28',
    dueDate: '2024-03-12',
    status: 'viewed'
  }
];

const statusBadges = {
  draft: <Badge variant="outline">Draft</Badge>,
  sent: <Badge variant="primary">Sent</Badge>,
  viewed: <Badge variant="warning">Viewed</Badge>,
  paid: <Badge variant="success">Paid</Badge>,
  overdue: <Badge variant="error">Overdue</Badge>,
  void: <Badge variant="secondary">Void</Badge>
};

const Invoices: React.FC = () => {
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  const handleSelectAll = () => {
    if (selectedInvoices.length === invoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(invoices.map(invoice => invoice.id));
    }
  };

  const handleSelectInvoice = (invoiceId: string) => {
    setSelectedInvoices(prev => {
      if (prev.includes(invoiceId)) {
        return prev.filter(id => id !== invoiceId);
      }
      return [...prev, invoiceId];
    });
  };

  const totalRevenue = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const unpaidTotal = invoices
    .filter(inv => ['sent', 'viewed'].includes(inv.status))
    .reduce((sum, inv) => sum + inv.amount, 0);

  const overdueTotal = invoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-sm text-gray-500">Manage and track all invoices</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            leftIcon={<Download size={16} />}
          >
            Export
          </Button>
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
          >
            Create Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-success/10 p-3">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-xl font-semibold text-gray-900">
                  ${totalRevenue.toLocaleString()}
                </h3>
                <p className="text-xs font-medium text-success flex items-center">
                  <ArrowUpRight size={12} className="mr-1" />
                  +12% from last month
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
                <p className="text-sm font-medium text-gray-500">Unpaid</p>
                <h3 className="text-xl font-semibold text-gray-900">
                  ${unpaidTotal.toLocaleString()}
                </h3>
                <p className="text-xs font-medium text-warning flex items-center">
                  <ArrowUpRight size={12} className="mr-1" />
                  {invoices.filter(inv => ['sent', 'viewed'].includes(inv.status)).length} invoices
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-error/10 p-3">
                <AlertTriangle className="h-6 w-6 text-error" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Overdue</p>
                <h3 className="text-xl font-semibold text-gray-900">
                  ${overdueTotal.toLocaleString()}
                </h3>
                <p className="text-xs font-medium text-error flex items-center">
                  <ArrowDownRight size={12} className="mr-1" />
                  {invoices.filter(inv => inv.status === 'overdue').length} invoices
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary/10 p-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Drafts</p>
                <h3 className="text-xl font-semibold text-gray-900">
                  {invoices.filter(inv => inv.status === 'draft').length}
                </h3>
                <p className="text-xs text-gray-500">Ready to send</p>
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
            placeholder="Search invoices..."
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
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
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
                  checked={selectedInvoices.length === invoices.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Invoice #</th>
              <th>Client</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="group hover:bg-gray-50">
                <td>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedInvoices.includes(invoice.id)}
                    onChange={() => handleSelectInvoice(invoice.id)}
                  />
                </td>
                <td>
                  <button className="font-medium text-primary hover:underline">
                    {invoice.number}
                  </button>
                </td>
                <td>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                      {invoice.client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="ml-2">{invoice.client.name}</span>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    <span>{invoice.service.name}</span>
                    {invoice.job && (
                      <span className="text-sm text-gray-500">{invoice.job.name}</span>
                    )}
                  </div>
                </td>
                <td className="font-medium">${invoice.amount.toLocaleString()}</td>
                <td>
                  <div className="flex items-center text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    {new Date(invoice.issueDate).toLocaleDateString()}
                  </div>
                </td>
                <td>
                  <div className="flex items-center text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </div>
                </td>
                <td>{statusBadges[invoice.status]}</td>
                <td>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100">
                    {invoice.status === 'draft' && (
                      <button className="text-gray-500 hover:text-primary" title="Edit">
                        <Edit size={16} />
                      </button>
                    )}
                    {['sent', 'viewed', 'overdue'].includes(invoice.status) && (
                      <button className="text-gray-500 hover:text-primary" title="Send Reminder">
                        <Mail size={16} />
                      </button>
                    )}
                    <button className="text-gray-500 hover:text-primary" title="Download">
                      <Download size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-primary" title="Duplicate">
                      <Copy size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-error" title="Delete">
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
          Showing {invoices.length} invoices
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

export default Invoices;