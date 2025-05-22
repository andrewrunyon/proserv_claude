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
  Upload,
  Download,
  GripVertical,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface Client {
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

const clients: Client[] = [
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
  { id: 'name', label: 'Client Name', sortable: true },
  { id: 'type', label: 'Type', sortable: true },
  { id: 'owner', label: 'Owner', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'actions', label: 'Actions' }
];

const ClientList: React.FC = () => {
  const navigate = useNavigate();
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [columns, setColumns] = useState(initialColumns);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSelectAll = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clients.map(client => client.id));
    }
  };

  const handleSelectClient = (clientId: string) => {
    setSelectedClients(prev => {
      if (prev.includes(clientId)) {
        return prev.filter(id => id !== clientId);
      }
      return [...prev, clientId];
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

  const sortedClients = [...clients].sort((a, b) => {
    if (!sortField) return 0;

    let aValue, bValue;

    switch (sortField) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'type':
        aValue = a.type;
        bValue = b.type;
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

    return sortDirection === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
        <p className="text-sm text-gray-500">Manage all client entities and their associated contacts</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search clients..."
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
              leftIcon={<Upload size={16} />}
              onClick={() => navigate('/clients/import')}
            >
              Import Clients
            </Button>
            <Button
              variant="primary"
              leftIcon={<Plus size={16} />}
              onClick={() => navigate('/clients/new')}
            >
              Add New Client
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
                  checked={selectedClients.length === clients.length}
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
            {sortedClients.map((client) => (
              <tr key={client.id} className="group hover:bg-gray-50">
                <td>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedClients.includes(client.id)}
                    onChange={() => handleSelectClient(client.id)}
                  />
                </td>
                <td>
                  <div className="flex flex-col">
                    <button
                      className="font-medium text-primary hover:underline text-left"
                      onClick={() => navigate(`/clients/${client.id}`)}
                    >
                      {client.name}
                    </button>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-900">{client.primaryContact.name}</span>
                      <a
                        href={`mailto:${client.primaryContact.email}`}
                        className="text-sm text-gray-500 hover:text-primary"
                      >
                        {client.primaryContact.email}
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <Building2 size={16} className="mr-2 text-gray-400" />
                    <span className="capitalize">{client.type}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                      {client.owner.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="ml-2">{client.owner.name}</span>
                  </div>
                </td>
                <td>
                  <Badge
                    variant={
                      client.status === 'active' ? 'success' :
                      client.status === 'prospect' ? 'warning' : 'secondary'
                    }
                  >
                    {client.status}
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

      {clients.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No clients yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first client.</p>
          <div className="mt-6">
            <Button
              variant="primary"
              onClick={() => navigate('/clients/new')}
            >
              Add New Client
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <div className="text-sm text-gray-500">
          Showing {clients.length} clients
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

export default ClientList;