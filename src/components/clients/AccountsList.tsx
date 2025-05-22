import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  Building2,
  Users,
  Mail,
  Edit,
  Archive,
  MoreVertical,
  Tag,
  GripVertical
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface Account {
  id: string;
  name: string;
  type: 'individual' | 'company' | 'family';
  tags: string[];
  clientCount: number;
  primaryContact: {
    name: string;
    email: string;
  };
  owner: {
    name: string;
    avatar?: string;
  };
  status: 'active' | 'inactive' | 'prospect';
}

interface Column {
  id: string;
  label: string;
  sortable?: boolean;
}

const accounts: Account[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    type: 'company',
    tags: ['Enterprise', 'Manufacturing'],
    clientCount: 5,
    primaryContact: {
      name: 'John Smith',
      email: 'john@acme.com'
    },
    owner: {
      name: 'Sarah Wilson'
    },
    status: 'active'
  },
  {
    id: '2',
    name: 'Johnson Family',
    type: 'family',
    tags: ['VIP', 'Tax Planning'],
    clientCount: 3,
    primaryContact: {
      name: 'Mike Johnson',
      email: 'mike@example.com'
    },
    owner: {
      name: 'David Chen'
    },
    status: 'active'
  },
  {
    id: '3',
    name: 'Tech Solutions Inc',
    type: 'company',
    tags: ['Startup', 'Technology'],
    clientCount: 2,
    primaryContact: {
      name: 'Sarah Connor',
      email: 'sarah@techsolutions.com'
    },
    owner: {
      name: 'Mike Johnson'
    },
    status: 'prospect'
  }
];

const initialColumns: Column[] = [
  { id: 'account', label: 'Account', sortable: true },
  { id: 'type', label: 'Type', sortable: true },
  { id: 'primary_contact', label: 'Primary Contact', sortable: true },
  { id: 'client_count', label: 'Clients', sortable: true },
  { id: 'owner', label: 'Owner', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'actions', label: 'Actions' }
];

const AccountsList: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [columns, setColumns] = useState(initialColumns);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSelectAll = () => {
    if (selectedAccounts.length === accounts.length) {
      setSelectedAccounts([]);
    } else {
      setSelectedAccounts(accounts.map(account => account.id));
    }
  };

  const handleSelectAccount = (accountId: string) => {
    setSelectedAccounts(prev => {
      if (prev.includes(accountId)) {
        return prev.filter(id => id !== accountId);
      }
      return [...prev, accountId];
    });
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLTableCellElement>, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableCellElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLTableCellElement>, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    const newColumns = [...columns];
    const [removed] = newColumns.splice(sourceIndex, 1);
    newColumns.splice(targetIndex, 0, removed);
    setColumns(newColumns);
  };

  const sortedAccounts = [...accounts].sort((a, b) => {
    if (!sortField) return 0;

    let aValue, bValue;

    switch (sortField) {
      case 'account':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'type':
        aValue = a.type;
        bValue = b.type;
        break;
      case 'primary_contact':
        aValue = a.primaryContact.name;
        bValue = b.primaryContact.name;
        break;
      case 'client_count':
        aValue = a.clientCount;
        bValue = b.clientCount;
        break;
      case 'owner':
        aValue = a.owner.name;
        bValue = b.owner.name;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      default:
        return 0;
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return sortDirection === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Accounts</h1>
        <p className="text-sm text-gray-500">Manage all client entities and their associated contacts</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search accounts..."
            className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">All Types</option>
            <option value="individual">Individual</option>
            <option value="company">Company</option>
            <option value="family">Family</option>
          </select>

          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">All Owners</option>
            <option value="sarah">Sarah Wilson</option>
            <option value="david">David Chen</option>
            <option value="mike">Mike Johnson</option>
          </select>

          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="prospect">Prospect</option>
          </select>

          <Button
            variant="outline"
            leftIcon={<Filter size={16} />}
          >
            More Filters
          </Button>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              leftIcon={<Plus size={16} />}
              onClick={() => navigate('/clients/accounts/import')}
            >
              Import Accounts
            </Button>
            <Button
              variant="primary"
              leftIcon={<Plus size={16} />}
              onClick={() => navigate('/clients/accounts/new')}
            >
              Add New Account
            </Button>
          </div>
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
                  checked={selectedAccounts.length === accounts.length}
                  onChange={handleSelectAll}
                />
              </th>
              {columns.map((column, index) => (
                <th
                  key={column.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className={column.sortable ? 'cursor-pointer select-none' : ''}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  <div className="flex items-center">
                    <GripVertical size={16} className="mr-2 text-gray-400 cursor-move" />
                    <span>{column.label}</span>
                    {column.sortable && sortField === column.id && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedAccounts.map((account) => (
              <tr key={account.id} className="group hover:bg-gray-50">
                <td>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedAccounts.includes(account.id)}
                    onChange={() => handleSelectAccount(account.id)}
                  />
                </td>
                <td>
                  <button
                    className="font-medium text-primary hover:underline text-left"
                    onClick={() => navigate(`/clients/accounts/${account.id}`)}
                  >
                    {account.name}
                  </button>
                </td>
                <td>
                  <div className="flex items-center">
                    <Building2 size={16} className="mr-2 text-gray-400" />
                    <span className="capitalize">{account.type}</span>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{account.primaryContact.name}</span>
                    <a
                      href={`mailto:${account.primaryContact.email}`}
                      className="text-sm text-gray-500 hover:text-primary"
                    >
                      {account.primaryContact.email}
                    </a>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <Users size={16} className="mr-2 text-gray-400" />
                    <span>{account.clientCount}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                      {account.owner.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="ml-2">{account.owner.name}</span>
                  </div>
                </td>
                <td>
                  <Badge
                    variant={
                      account.status === 'active' ? 'success' :
                      account.status === 'prospect' ? 'warning' : 'secondary'
                    }
                  >
                    {account.status}
                  </Badge>
                </td>
                <td>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100">
                    <button className="text-gray-500 hover:text-primary" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-primary" title="Archive">
                      <Archive size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-primary" title="Email">
                      <Mail size={16} />
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

      {accounts.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No accounts yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first account.</p>
          <div className="mt-6">
            <Button
              variant="primary"
              onClick={() => navigate('/clients/accounts/new')}
            >
              Add New Account
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <div className="text-sm text-gray-500">
          Showing {accounts.length} accounts
        </div>
        <div className="flex items-center space-x-2">
          <select className="border border-gray-300 rounded-lg px-2 py-1">
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

export default AccountsList;