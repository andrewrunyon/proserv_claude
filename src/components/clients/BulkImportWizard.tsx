import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  Download,
  ChevronRight,
  X,
  Check,
  AlertTriangle,
  Users,
  FileText
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Card, CardContent } from '../ui/Card';

interface ImportStep {
  number: number;
  title: string;
  completed?: boolean;
}

interface CSVPreviewData {
  row: number;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  status?: string;
  issues?: string[];
}

const BulkImportWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<CSVPreviewData[]>([]);
  const [mappedFields, setMappedFields] = useState<Record<string, string>>({});
  const [importSettings, setImportSettings] = useState({
    tags: [] as string[],
    owner: '',
    status: 'active',
    inviteToPortal: false,
    matchExisting: false,
    duplicateHandling: 'skip'
  });
  const [importStats, setImportStats] = useState({
    total: 0,
    valid: 0,
    warnings: 0,
    errors: 0
  });

  const steps: ImportStep[] = [
    { number: 1, title: 'Upload CSV', completed: currentStep > 1 },
    { number: 2, title: 'Map Fields', completed: currentStep > 2 },
    { number: 3, title: 'Import Settings', completed: currentStep > 3 },
    { number: 4, title: 'Review', completed: currentStep > 4 },
    { number: 5, title: 'Results', completed: currentStep > 5 }
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith('.csv')) {
      setFile(selectedFile);
      // Simulate CSV parsing and preview
      setPreviewData([
        {
          row: 1,
          firstName: 'John',
          lastName: 'Smith',
          email: 'john@example.com',
          company: 'Acme Inc',
          status: 'Valid',
          issues: []
        },
        {
          row: 2,
          firstName: 'Sarah',
          lastName: 'Connor',
          email: 'sarah@example.com',
          company: 'Tech Corp',
          status: 'Warning',
          issues: ['Possible duplicate']
        },
        {
          row: 3,
          firstName: 'Mike',
          lastName: 'Wilson',
          email: 'invalid-email',
          company: 'Dev Labs',
          status: 'Error',
          issues: ['Invalid email format']
        }
      ]);
      setImportStats({
        total: 245,
        valid: 218,
        warnings: 27,
        errors: 0
      });
    }
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

  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
    link.href = '/templates/client-import-template.csv';
    link.download = 'client-import-template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              {step.completed ? <Check size={16} /> : step.number}
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

  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Upload your CSV file</h2>
        <p className="text-gray-500">
          Your CSV file should contain the following required fields: First Name, Last Name, Email
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
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <button
          className="hover:text-primary"
          onClick={() => navigate('/clients')}
        >
          Clients
        </button>
        <ChevronRight size={16} />
        <span>Bulk Import</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">Bulk Import Clients</h1>

      {renderStepIndicator()}

      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && renderStep1()}
          {/* ... other steps rendering remains the same ... */}

          {currentStep < 5 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : navigate('/clients')}
              >
                {currentStep === 1 ? 'Cancel' : 'Back'}
              </Button>
              <Button
                variant="primary"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={currentStep === 1 && !file}
              >
                {currentStep === 4 ? 'Start Import' : 'Next Step'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkImportWizard;