import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Upload, 
  Download,
  FileText,
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react';
import Button from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';

interface ImportStep {
  number: number;
  title: string;
  completed?: boolean;
}

interface CSVPreviewData {
  row: number;
  name: string;
  type: string;
  email: string;
  phone: string;
  status?: string;
  issues?: string[];
}

const ImportAccounts: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<CSVPreviewData[]>([]);
  const [importSettings, setImportSettings] = useState({
    matchExisting: false,
    duplicateHandling: 'skip',
    defaultStatus: 'prospect',
    defaultOwner: '',
    sendInvites: false
  });

  const steps: ImportStep[] = [
    { number: 1, title: 'Upload CSV', completed: currentStep > 1 },
    { number: 2, title: 'Map Fields', completed: currentStep > 2 },
    { number: 3, title: 'Configure Settings', completed: currentStep > 3 },
    { number: 4, title: 'Review', completed: currentStep > 4 }
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith('.csv')) {
      setFile(selectedFile);
      // Simulate CSV parsing and preview
      setPreviewData([
        {
          row: 1,
          name: 'Acme Corporation',
          type: 'company',
          email: 'contact@acme.com',
          phone: '(555) 123-4567',
          status: 'Valid'
        },
        {
          row: 2,
          name: 'Tech Solutions Inc',
          type: 'company',
          email: 'info@techsolutions.com',
          phone: '(555) 987-6543',
          status: 'Warning',
          issues: ['Possible duplicate']
        }
      ]);
    }
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
    link.href = '/templates/account-import-template.csv';
    link.download = 'account-import-template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.csv')) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex items-center">
            <div className={`
              flex h-8 w-8 items-center justify-center rounded-full
              ${step.completed ? 'bg-primary text-white' : 
                currentStep === step.number ? 'bg-primary text-white' : 
                'bg-gray-200 text-gray-500'}
            `}>
              {step.completed ? <CheckCircle size={16} /> : step.number}
            </div>
            <span className="ml-2 hidden md:block text-sm">
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="hidden md:block h-[2px] w-16 bg-gray-200">
              <div className={`h-full ${step.completed ? 'bg-primary' : 'bg-gray-200'}`} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <button
          className="hover:text-primary"
          onClick={() => navigate('/clients/accounts')}
        >
          Accounts
        </button>
        <ChevronRight size={16} />
        <span>Import Accounts</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">Import Accounts</h1>

      {renderStepIndicator()}

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Upload your CSV file</h2>
              <p className="text-gray-500">
                Your CSV file should contain the following required fields: Account Name, Type, Email
              </p>
              <button 
                className="flex items-center text-primary hover:text-primary-dark mt-2"
                onClick={handleDownloadTemplate}
              >
                <Download size={16} className="mr-2" />
                Download sample CSV template
              </button>
            </div>

            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="mx-auto w-16 h-16 text-gray-400 mb-4">
                <Upload size={64} />
              </div>
              <p className="text-gray-600 mb-2">Drag and drop your CSV file here, or</p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-dark"
              >
                Browse Files
              </label>
              {file && (
                <div className="mt-4 text-left bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText size={20} className="text-gray-400 mr-2" />
                      <span className="font-medium">{file.name}</span>
                    </div>
                    <button
                      onClick={() => setFile(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {previewData.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preview</h3>
                <div className="space-y-2">
                  {previewData.map((row) => (
                    <div
                      key={row.row}
                      className={`rounded-lg border p-4 ${
                        row.status === 'Warning' ? 'border-warning bg-warning/5' :
                        row.status === 'Error' ? 'border-error bg-error/5' :
                        'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{row.name}</p>
                          <p className="text-sm text-gray-500">
                            {row.type} • {row.email} • {row.phone}
                          </p>
                        </div>
                        <Badge
                          variant={
                            row.status === 'Warning' ? 'warning' :
                            row.status === 'Error' ? 'error' :
                            'success'
                          }
                        >
                          {row.status}
                        </Badge>
                      </div>
                      {row.issues && row.issues.length > 0 && (
                        <div className="mt-2 flex items-center text-sm text-warning">
                          <AlertTriangle size={14} className="mr-1" />
                          {row.issues.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => navigate('/clients/accounts')}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!file}
            >
              Next Step
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportAccounts;