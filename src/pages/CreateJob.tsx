import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { 
  X, 
  Save, 
  CheckCircle, 
  Users, 
  Calendar, 
  Clock, 
  Tag,
  Upload,
  AlertTriangle,
  Repeat
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

interface FormData {
  name: string;
  client: string;
  service: string;
  assignee: string;
  workflow: string;
  dueDate: Date | null;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  notes: string;
  documents: File[];
  isRecurring: boolean;
  recurrence: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
    endDate: Date | null;
  };
}

const CreateJob: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    client: '',
    service: '',
    assignee: '',
    workflow: '',
    dueDate: null,
    priority: 'medium',
    tags: [],
    notes: '',
    documents: [],
    isRecurring: false,
    recurrence: {
      frequency: 'monthly',
      endDate: null
    }
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [newTag, setNewTag] = useState('');

  // Mock data for dropdowns
  const clients = [
    { id: '1', name: 'Acme Corporation' },
    { id: '2', name: 'Tech Solutions Inc.' },
    { id: '3', name: 'Global Industries' }
  ];

  const services = [
    { id: '1', name: 'Tax Return Preparation' },
    { id: '2', name: 'Financial Audit' },
    { id: '3', name: 'Business Advisory' }
  ];

  const teamMembers = [
    { id: '1', name: 'Sarah Wilson' },
    { id: '2', name: 'Mike Johnson' },
    { id: '3', name: 'David Chen' }
  ];

  const workflows = [
    { id: '1', name: 'Standard Tax Return' },
    { id: '2', name: 'Audit Process' },
    { id: '3', name: 'Advisory Engagement' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name) newErrors.name = 'Job name is required';
    if (!formData.client) newErrors.client = 'Client is required';
    if (!formData.service) newErrors.service = 'Service is required';
    if (!formData.assignee) newErrors.assignee = 'Assignee is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle form submission
    console.log('Form submitted:', formData);
    navigate('/jobs');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(e.target.files!)]
      }));
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(newTag.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()]
        }));
      }
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const removeFile = (fileToRemove: File) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter(file => file !== fileToRemove)
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <a href="/jobs" className="hover:text-primary">Jobs</a>
            <span>&gt;</span>
            <span>Create New Job</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Create New Job</h1>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            leftIcon={<X size={16} />}
            onClick={() => navigate('/jobs')}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            leftIcon={<Save size={16} />}
          >
            Save as Draft
          </Button>
          <Button
            variant="primary"
            leftIcon={<CheckCircle size={16} />}
            onClick={handleSubmit}
          >
            Create Job
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="name" className="form-label required">Job Name</label>
                <input
                  type="text"
                  id="name"
                  className={`input ${errors.name ? 'border-error' : ''}`}
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter job name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-error">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="client" className="form-label required">Client</label>
                  <select
                    id="client"
                    className={`input ${errors.client ? 'border-error' : ''}`}
                    value={formData.client}
                    onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                  >
                    <option value="">Select client</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                  {errors.client && (
                    <p className="mt-1 text-sm text-error">{errors.client}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="service" className="form-label required">Service</label>
                  <select
                    id="service"
                    className={`input ${errors.service ? 'border-error' : ''}`}
                    value={formData.service}
                    onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                  >
                    <option value="">Select service</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>{service.name}</option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-sm text-error">{errors.service}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="assignee" className="form-label required">Assignee</label>
                  <select
                    id="assignee"
                    className={`input ${errors.assignee ? 'border-error' : ''}`}
                    value={formData.assignee}
                    onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
                  >
                    <option value="">Select team member</option>
                    {teamMembers.map(member => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                  {errors.assignee && (
                    <p className="mt-1 text-sm text-error">{errors.assignee}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="workflow" className="form-label">Workflow</label>
                  <select
                    id="workflow"
                    className="input"
                    value={formData.workflow}
                    onChange={(e) => setFormData(prev => ({ ...prev, workflow: e.target.value }))}
                  >
                    <option value="">Select workflow</option>
                    {workflows.map(workflow => (
                      <option key={workflow.id} value={workflow.id}>{workflow.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dueDate" className="form-label required">Due Date</label>
                  <DatePicker
                    selected={formData.dueDate}
                    onChange={(date) => setFormData(prev => ({ ...prev, dueDate: date }))}
                    className={`input w-full ${errors.dueDate ? 'border-error' : ''}`}
                    placeholderText="Select due date"
                    minDate={new Date()}
                  />
                  {errors.dueDate && (
                    <p className="mt-1 text-sm text-error">{errors.dueDate}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="priority" className="form-label">Priority</label>
                  <select
                    id="priority"
                    className="input"
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      priority: e.target.value as 'high' | 'medium' | 'low' 
                    }))}
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="flex items-center"
                    >
                      <span>{tag}</span>
                      <button
                        className="ml-2"
                        onClick={() => removeTag(tag)}
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="Type tag and press Enter"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddTag}
                />
              </div>

              <div>
                <label htmlFor="notes" className="form-label">Notes</label>
                <textarea
                  id="notes"
                  className="input"
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any additional notes or instructions..."
                />
              </div>

              <div>
                <label className="form-label">Attachments</label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="flex justify-center">
                    <div className="space-y-2 text-center">
                      <div className="mx-auto h-12 w-12 text-gray-400">
                        <Upload size={48} />
                      </div>
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                          <span>Upload files</span>
                          <input
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, XLS up to 10MB each
                      </p>
                    </div>
                  </div>
                </div>

                {formData.documents.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.documents.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md border border-gray-200 p-3"
                      >
                        <div className="flex items-center">
                          <Upload size={16} className="text-gray-400" />
                          <span className="ml-2 text-sm text-gray-700">{file.name}</span>
                          <span className="ml-2 text-xs text-gray-500">
                            ({Math.round(file.size / 1024)} KB)
                          </span>
                        </div>
                        <button
                          onClick={() => removeFile(file)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="recurring"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={formData.isRecurring}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      isRecurring: e.target.checked 
                    }))}
                  />
                  <label htmlFor="recurring" className="text-sm font-medium text-gray-700">
                    Make this a recurring job
                  </label>
                </div>

                {formData.isRecurring && (
                  <div className="mt-4 rounded-md bg-gray-50 p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="frequency" className="form-label">Frequency</label>
                        <select
                          id="frequency"
                          className="input"
                          value={formData.recurrence.frequency}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            recurrence: {
                              ...prev.recurrence,
                              frequency: e.target.value as FormData['recurrence']['frequency']
                            }
                          }))}
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="yearly">Yearly</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="endDate" className="form-label">End Date</label>
                        <DatePicker
                          selected={formData.recurrence.endDate}
                          onChange={(date) => setFormData(prev => ({
                            ...prev,
                            recurrence: {
                              ...prev.recurrence,
                              endDate: date
                            }
                          }))}
                          className="input w-full"
                          placeholderText="Select end date"
                          minDate={formData.dueDate || new Date()}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <Badge variant="warning">Draft</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Priority</span>
                  <Badge
                    variant={
                      formData.priority === 'high' ? 'error' :
                      formData.priority === 'medium' ? 'warning' : 'success'
                    }
                  >
                    {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)}
                  </Badge>
                </div>

                {formData.dueDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Due Date</span>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1 text-gray-400" />
                      <span className="text-sm">
                        {formData.dueDate.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}

                {formData.assignee && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Assignee</span>
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                        {teamMembers.find(m => m.id === formData.assignee)?.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="ml-2 text-sm">
                        {teamMembers.find(m => m.id === formData.assignee)?.name}
                      </span>
                    </div>
                  </div>
                )}

                {formData.isRecurring && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Recurrence</span>
                    <div className="flex items-center">
                      <Repeat size={14} className="mr-1 text-gray-400" />
                      <span className="text-sm">
                        {formData.recurrence.frequency.charAt(0).toUpperCase() + 
                         formData.recurrence.frequency.slice(1)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900">Completion Checklist</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-success" />
                    <span className="ml-2 text-sm text-gray-600">Basic details</span>
                  </div>
                  <div className="flex items-center">
                    {formData.client ? (
                      <CheckCircle size={16} className="text-success" />
                    ) : (
                      <AlertTriangle size={16} className="text-warning" />
                    )}
                    <span className="ml-2 text-sm text-gray-600">Client selected</span>
                  </div>
                  <div className="flex items-center">
                    {formData.service ? (
                      <CheckCircle size={16} className="text-success" />
                    ) : (
                      <AlertTriangle size={16} className="text-warning" />
                    )}
                    <span className="ml-2 text-sm text-gray-600">Service selected</span>
                  </div>
                  <div className="flex items-center">
                    {formData.assignee ? (
                      <CheckCircle size={16} className="text-success" />
                    ) : (
                      <AlertTriangle size={16} className="text-warning" />
                    )}
                    <span className="ml-2 text-sm text-gray-600">Assignee set</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  leftIcon={<Users size={16} />}
                >
                  Add Team Members
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  leftIcon={<Clock size={16} />}
                >
                  Set Reminders
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  leftIcon={<Tag size={16} />}
                >
                  Manage Tags
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;