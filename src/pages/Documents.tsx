import React from 'react';
import { FileText, FolderOpen, Upload, Download, MoreVertical, Search, Filter, Plus, Calendar, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

interface Document {
  id: string;
  name: string;
  client: string;
  category: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  fileType: 'pdf' | 'doc' | 'xls' | 'ppt' | 'jpg' | 'zip';
}

const documents: Document[] = [
  {
    id: '1',
    name: 'Tax Return 2023 Final.pdf',
    client: 'Acme Corporation',
    category: 'Tax Return',
    size: '2.4 MB',
    uploadedBy: 'Jane Doe',
    uploadDate: 'Oct 10, 2025',
    fileType: 'pdf',
  },
  {
    id: '2',
    name: 'Contract Agreement.doc',
    client: 'Tech Innovations Inc.',
    category: 'Legal Documents',
    size: '1.8 MB',
    uploadedBy: 'Michael Smith',
    uploadDate: 'Oct 8, 2025',
    fileType: 'doc',
  },
  {
    id: '3',
    name: 'Financial Statement Q3.xls',
    client: 'Global Solutions LLC',
    category: 'Financial',
    size: '3.5 MB',
    uploadedBy: 'Amanda Rivera',
    uploadDate: 'Oct 5, 2025',
    fileType: 'xls',
  },
  {
    id: '4',
    name: 'Strategic Plan Presentation.ppt',
    client: 'City Consulting Group',
    category: 'Planning',
    size: '5.2 MB',
    uploadedBy: 'David Wilson',
    uploadDate: 'Oct 3, 2025',
    fileType: 'ppt',
  },
  {
    id: '5',
    name: 'Office Location Photos.jpg',
    client: 'Nexus Partners',
    category: 'Assets',
    size: '8.7 MB',
    uploadedBy: 'Sarah Johnson',
    uploadDate: 'Sep 29, 2025',
    fileType: 'jpg',
  },
];

const fileTypeIcons = {
  pdf: <FileText size={16} className="text-error" />,
  doc: <FileText size={16} className="text-primary" />,
  xls: <FileText size={16} className="text-success" />,
  ppt: <FileText size={16} className="text-warning" />,
  jpg: <FileText size={16} className="text-accent" />,
  zip: <FileText size={16} className="text-gray-500" />,
};

const Documents: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-sm text-gray-500">Manage files and documents</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-md bg-primary/10 p-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">All Documents</p>
              <h3 className="text-xl font-semibold text-gray-900">156</h3>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-md bg-secondary/10 p-3">
              <FolderOpen className="h-6 w-6 text-secondary" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Categories</p>
              <h3 className="text-xl font-semibold text-gray-900">12</h3>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-md bg-success/10 p-3">
              <Upload className="h-6 w-6 text-success" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Uploaded Today</p>
              <h3 className="text-xl font-semibold text-gray-900">4</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full md:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={18} className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex w-full flex-wrap gap-2 md:w-auto">
          <Button
            variant="outline"
            leftIcon={<Filter size={16} />}
          >
            Filter
          </Button>
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            className="ml-auto md:ml-0"
          >
            Upload Document
          </Button>
        </div>
      </div>
      
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Client</th>
              <th>Category</th>
              <th>Size</th>
              <th>Uploaded By</th>
              <th>Upload Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => (
              <tr key={document.id} className="hover:bg-gray-50">
                <td>
                  <div className="flex items-center">
                    {fileTypeIcons[document.fileType]}
                    <span className="ml-2 font-medium text-gray-900">
                      {document.name}
                    </span>
                  </div>
                </td>
                <td className="text-gray-700">{document.client}</td>
                <td>
                  <Badge variant="outline">{document.category}</Badge>
                </td>
                <td className="text-gray-500">{document.size}</td>
                <td className="text-gray-700">{document.uploadedBy}</td>
                <td>
                  <div className="flex items-center text-gray-700">
                    <Calendar size={14} className="mr-1 text-gray-400" />
                    {document.uploadDate}
                  </div>
                </td>
                <td>
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-gray-700" title="Download">
                      <Download size={18} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700" title="More options">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900">Document Templates</h3>
        <p className="mt-1 text-sm text-gray-500">
          Use templates to quickly create standardized documents for your clients
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="rounded-md border border-gray-200 p-4 hover:border-primary hover:shadow-sm">
            <div className="flex items-center">
              <FileText size={24} className="text-primary" />
              <h4 className="ml-2 text-sm font-medium text-gray-900">Client Intake Form</h4>
            </div>
            <p className="mt-2 text-xs text-gray-500">Used for onboarding new clients</p>
            <button className="mt-3 text-xs font-medium text-primary hover:text-primary-dark">
              Use Template
            </button>
          </div>
          <div className="rounded-md border border-gray-200 p-4 hover:border-primary hover:shadow-sm">
            <div className="flex items-center">
              <FileText size={24} className="text-primary" />
              <h4 className="ml-2 text-sm font-medium text-gray-900">Service Agreement</h4>
            </div>
            <p className="mt-2 text-xs text-gray-500">Standard client agreement template</p>
            <button className="mt-3 text-xs font-medium text-primary hover:text-primary-dark">
              Use Template
            </button>
          </div>
          <div className="rounded-md border border-gray-200 p-4 hover:border-primary hover:shadow-sm">
            <div className="flex items-center">
              <FileText size={24} className="text-primary" />
              <h4 className="ml-2 text-sm font-medium text-gray-900">Invoice Template</h4>
            </div>
            <p className="mt-2 text-xs text-gray-500">Branded invoice with terms</p>
            <button className="mt-3 text-xs font-medium text-primary hover:text-primary-dark">
              Use Template
            </button>
          </div>
          <div className="rounded-md border border-gray-200 p-4 hover:border-primary hover:shadow-sm flex items-center justify-center">
            <div className="text-center">
              <div className="flex justify-center">
                <Plus size={24} className="text-gray-400" />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-500">Create New Template</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;