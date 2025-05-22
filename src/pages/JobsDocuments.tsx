import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Download, 
  Trash2, 
  MoreVertical, 
  Calendar,
  Users,
  Upload,
  FolderOpen,
  Grid3X3,
  List,
  Eye,
  Edit,
  X
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'xls' | 'jpg' | 'zip';
  size: string;
  client: {
    id: string;
    name: string;
  };
  job?: {
    id: string;
    name: string;
  };
  tags: string[];
  uploadedBy: {
    id: string;
    name: string;
  };
  uploadedAt: string;
  lastModified: string;
  description?: string;
}

const documents: Document[] = [
  {
    id: '1',
    name: 'Tax Return 2023 - Final.pdf',
    type: 'pdf',
    size: '2.4 MB',
    client: {
      id: '1',
      name: 'Acme Corporation'
    },
    job: {
      id: '1',
      name: 'Tax Return 2023'
    },
    tags: ['Tax', 'Final', '2023'],
    uploadedBy: {
      id: '1',
      name: 'Sarah Wilson'
    },
    uploadedAt: '2024-03-15T10:30:00',
    lastModified: '2024-03-15T10:30:00',
    description: 'Final version of 2023 tax return for Acme Corporation'
  },
  {
    id: '2',
    name: 'Financial Statements Q4.xlsx',
    type: 'xls',
    size: '1.8 MB',
    client: {
      id: '2',
      name: 'Tech Solutions Inc.'
    },
    job: {
      id: '2',
      name: 'Q4 Audit'
    },
    tags: ['Financial', 'Q4', '2023'],
    uploadedBy: {
      id: '2',
      name: 'Mike Johnson'
    },
    uploadedAt: '2024-03-14T15:45:00',
    lastModified: '2024-03-14T16:20:00',
    description: 'Q4 2023 financial statements for Tech Solutions Inc.'
  },
  {
    id: '3',
    name: 'Strategic Plan 2024.docx',
    type: 'doc',
    size: '856 KB',
    client: {
      id: '3',
      name: 'Global Industries'
    },
    job: {
      id: '3',
      name: 'Strategic Planning'
    },
    tags: ['Strategy', '2024', 'Draft'],
    uploadedBy: {
      id: '3',
      name: 'David Chen'
    },
    uploadedAt: '2024-03-13T09:15:00',
    lastModified: '2024-03-13T11:30:00',
    description: '2024 strategic planning document for Global Industries'
  }
];

const fileTypeIcons = {
  pdf: <FileText size={16} className="text-error" />,
  doc: <FileText size={16} className="text-primary" />,
  xls: <FileText size={16} className="text-success" />,
  jpg: <FileText size={16} className="text-warning" />,
  zip: <FileText size={16} className="text-gray-400" />
};

const JobsDocuments: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const handleFileSelect = (documentId: string) => {
    setSelectedFiles(prev => {
      if (prev.includes(documentId)) {
        return prev.filter(id => id !== documentId);
      }
      return [...prev, documentId];
    });
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === documents.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(documents.map(doc => doc.id));
    }
  };

  const handlePreview = (document: Document) => {
    setSelectedDocument(document);
  };

  const closePreview = () => {
    setSelectedDocument(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-sm text-gray-500">Manage files related to jobs and clients</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary/10 p-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Documents</p>
                <h3 className="text-xl font-semibold text-gray-900">{documents.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-success/10 p-3">
                <Upload className="h-6 w-6 text-success" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Uploaded Today</p>
                <h3 className="text-xl font-semibold text-gray-900">2</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-warning/10 p-3">
                <FolderOpen className="h-6 w-6 text-warning" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                <h3 className="text-xl font-semibold text-gray-900">5</h3>
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
            placeholder="Search documents..."
            className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
          <select className="rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option>All Types</option>
            <option>PDF</option>
            <option>Word</option>
            <option>Excel</option>
          </select>

          <select className="rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option>All Clients</option>
            <option>Acme Corporation</option>
            <option>Tech Solutions Inc.</option>
            <option>Global Industries</option>
          </select>

          <Button
            variant="outline"
            leftIcon={<Filter size={16} />}
          >
            More Filters
          </Button>

          <div className="ml-2 flex rounded-md border border-gray-300">
            <button
              className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 text-primary' : 'text-gray-500'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </button>
            <button
              className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 text-primary' : 'text-gray-500'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 size={16} />
            </button>
          </div>

          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            className="ml-auto md:ml-2"
          >
            Upload
          </Button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="w-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedFiles.length === documents.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Name</th>
                <th>Client</th>
                <th>Job</th>
                <th>Tags</th>
                <th>Uploaded By</th>
                <th>Date</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => (
                <tr key={document.id} className="group hover:bg-gray-50">
                  <td>
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedFiles.includes(document.id)}
                      onChange={() => handleFileSelect(document.id)}
                    />
                  </td>
                  <td>
                    <div className="flex items-center">
                      {fileTypeIcons[document.type]}
                      <button
                        className="ml-2 font-medium text-gray-900 hover:text-primary"
                        onClick={() => handlePreview(document)}
                      >
                        {document.name}
                      </button>
                    </div>
                  </td>
                  <td>{document.client.name}</td>
                  <td>
                    {document.job && (
                      <Badge variant="outline">{document.job.name}</Badge>
                    )}
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {document.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                        {document.uploadedBy.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="ml-2">{document.uploadedBy.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      {new Date(document.uploadedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="text-gray-500">{document.size}</td>
                  <td>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100">
                      <button className="text-gray-500 hover:text-primary" title="Preview">
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-500 hover:text-primary" title="Download">
                        <Download size={16} />
                      </button>
                      <button className="text-gray-500 hover:text-primary" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-500 hover:text-error" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {documents.map((document) => (
            <Card key={document.id} className="hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {fileTypeIcons[document.type]}
                    <span className="ml-2 font-medium text-gray-900">{document.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePreview(document)}
                  >
                    <MoreVertical size={16} />
                  </Button>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users size={14} className="mr-1" />
                    {document.client.name}
                  </div>

                  {document.job && (
                    <div className="flex items-center">
                      <Badge variant="outline" className="text-xs">
                        {document.job.name}
                      </Badge>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {document.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {new Date(document.uploadedAt).toLocaleDateString()}
                  </div>
                  <span>{document.size}</span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                      {document.uploadedBy.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">{document.uploadedBy.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-primary">
                      <Download size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-error">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={closePreview}
            ></div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {fileTypeIcons[selectedDocument.type]}
                        <h3 className="ml-2 text-lg font-medium text-gray-900">
                          {selectedDocument.name}
                        </h3>
                      </div>
                      <button
                        className="text-gray-400 hover:text-gray-500"
                        onClick={closePreview}
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Client</p>
                        <p className="mt-1">{selectedDocument.client.name}</p>
                      </div>
                      {selectedDocument.job && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">Related Job</p>
                          <p className="mt-1">{selectedDocument.job.name}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-500">Uploaded By</p>
                        <p className="mt-1">{selectedDocument.uploadedBy.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Upload Date</p>
                        <p className="mt-1">
                          {new Date(selectedDocument.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-500">Tags</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {selectedDocument.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {selectedDocument.description && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-500">Description</p>
                        <p className="mt-1 text-gray-700">{selectedDocument.description}</p>
                      </div>
                    )}

                    <div className="mt-6 flex justify-end space-x-3">
                      <Button
                        variant="outline"
                        leftIcon={<Download size={16} />}
                      >
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        leftIcon={<Edit size={16} />}
                      >
                        Edit Details
                      </Button>
                      <Button
                        variant="error"
                        leftIcon={<Trash2 size={16} />}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsDocuments;