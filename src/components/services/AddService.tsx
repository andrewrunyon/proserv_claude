import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save,
  X,
  Plus,
  ChevronDown,
  ChevronUp,
  FileText,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  Calendar,
  Bell,
  Workflow,
  Upload,
  Eye,
  Settings,
  Tag
} from 'lucide-react';
import Button from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';

interface FormSection {
  id: string;
  title: string;
  expanded: boolean;
}

const AddService: React.FC = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState<FormSection[]>([
    { id: 'overview', title: 'Service Overview', expanded: true },
    { id: 'fees', title: 'Fee Settings', expanded: true },
    { id: 'documents', title: 'Document & Form Requirements', expanded: true },
    { id: 'workflow', title: 'Workflow Association', expanded: true },
    { id: 'automation', title: 'Automation & Recurrence', expanded: true },
    { id: 'additional', title: 'Additional Options', expanded: true },
  ]);

  const [formData, setFormData] = useState({
    // Service Overview
    name: '',
    category: '',
    description: '',
    icon: '',
    
    // Fee Settings
    billingType: 'fixed',
    fixedFee: '',
    hourlyRate: '',
    subscriptionFee: '',
    subscriptionInterval: 'monthly',
    discount: '',
    taxable: false,
    
    // Documents
    intakeForm: '',
    requiredDocuments: [] as string[],
    templates: {
      proposal: '',
      contract: '',
      invoice: '',
    },
    
    // Workflow
    workflowTemplate: '',
    taskTemplates: [] as string[],
    
    // Automation
    jobRecurrence: false,
    recurrenceSchedule: 'monthly',
    autoGenerate: false,
    clientReminders: false,
    teamReminders: false,
    overdueEscalation: false,
    
    // Additional Options
    defaultOwner: '',
    tags: [] as string[],
    clientDescription: '',
    portalVisible: true,
  });

  const toggleSection = (sectionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, expanded: !section.expanded }
        : section
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    navigate('/services');
  };

  const renderSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return null;

    return (
      <Card className="mb-6">
        <CardHeader className="cursor-pointer" onClick={() => toggleSection(sectionId)}>
          <div className="flex items-center justify-between">
            <CardTitle>{section.title}</CardTitle>
            {section.expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </CardHeader>
        {section.expanded && (
          <CardContent>
            {sectionId === 'overview' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="form-label required">Service Name</label>
                  <input
                    type="text"
                    id="name"
                    className="input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Tax Return Preparation"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="form-label required">Category</label>
                  <select
                    id="category"
                    className="input"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select a category</option>
                    <option value="tax">Tax</option>
                    <option value="legal">Legal</option>
                    <option value="consulting">Consulting</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    id="description"
                    rows={4}
                    className="input"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the service and its benefits..."
                  />
                </div>

                <div>
                  <label className="form-label">Icon/Image</label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-gray-400" />
                    </div>
                    <Button variant="outline" size="sm">Upload</Button>
                  </div>
                </div>
              </div>
            )}

            {sectionId === 'fees' && (
              <div className="space-y-4">
                <div>
                  <label className="form-label required">Billing Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['fixed', 'hourly', 'subscription', 'custom'].map((type) => (
                      <div
                        key={type}
                        className={`
                          cursor-pointer rounded-lg border p-4 text-center
                          ${formData.billingType === type 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:border-primary/50'}
                        `}
                        onClick={() => setFormData({ ...formData, billingType: type })}
                      >
                        <DollarSign 
                          className={`mx-auto h-6 w-6 ${
                            formData.billingType === type ? 'text-primary' : 'text-gray-400'
                          }`} 
                        />
                        <span className={`mt-2 block text-sm font-medium ${
                          formData.billingType === type ? 'text-primary' : 'text-gray-700'
                        }`}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {formData.billingType === 'fixed' && (
                  <div>
                    <label htmlFor="fixedFee" className="form-label required">Fixed Fee</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <DollarSign size={16} />
                      </span>
                      <input
                        type="text"
                        id="fixedFee"
                        className="input pl-10"
                        value={formData.fixedFee}
                        onChange={(e) => setFormData({ ...formData, fixedFee: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                )}

                {formData.billingType === 'hourly' && (
                  <div>
                    <label htmlFor="hourlyRate" className="form-label required">Hourly Rate</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <DollarSign size={16} />
                      </span>
                      <input
                        type="text"
                        id="hourlyRate"
                        className="input pl-10"
                        value={formData.hourlyRate}
                        onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                )}

                {formData.billingType === 'subscription' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="subscriptionFee" className="form-label required">Subscription Fee</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          <DollarSign size={16} />
                        </span>
                        <input
                          type="text"
                          id="subscriptionFee"
                          className="input pl-10"
                          value={formData.subscriptionFee}
                          onChange={(e) => setFormData({ ...formData, subscriptionFee: e.target.value })}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subscriptionInterval" className="form-label required">Billing Interval</label>
                      <select
                        id="subscriptionInterval"
                        className="input"
                        value={formData.subscriptionInterval}
                        onChange={(e) => setFormData({ ...formData, subscriptionInterval: e.target.value })}
                      >
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="annually">Annually</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="discount" className="form-label">Discount</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="discount"
                        className="input pr-8"
                        value={formData.discount}
                        onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                        placeholder="0"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                        %
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={formData.taxable}
                        onChange={(e) => setFormData({ ...formData, taxable: e.target.checked })}
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900">Taxable</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {sectionId === 'documents' && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="intakeForm" className="form-label">Intake Form</label>
                  <select
                    id="intakeForm"
                    className="input"
                    value={formData.intakeForm}
                    onChange={(e) => setFormData({ ...formData, intakeForm: e.target.value })}
                  >
                    <option value="">Select an intake form</option>
                    <option value="general">General Client Intake</option>
                    <option value="tax">Tax Client Intake</option>
                    <option value="business">Business Client Intake</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Required Documents</label>
                  <div className="space-y-2">
                    {formData.requiredDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                        <div className="flex items-center">
                          <FileText size={16} className="text-gray-500" />
                          <span className="ml-2 text-sm">{doc}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newDocs = [...formData.requiredDocuments];
                            newDocs.splice(index, 1);
                            setFormData({ ...formData, requiredDocuments: newDocs });
                          }}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      leftIcon={<Plus size={16} />}
                      onClick={() => setFormData({
                        ...formData,
                        requiredDocuments: [...formData.requiredDocuments, 'New Document']
                      })}
                    >
                      Add Document
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="proposalTemplate" className="form-label">Proposal Template</label>
                    <select
                      id="proposalTemplate"
                      className="input"
                      value={formData.templates.proposal}
                      onChange={(e) => setFormData({
                        ...formData,
                        templates: { ...formData.templates, proposal: e.target.value }
                      })}
                    >
                      <option value="">Select template</option>
                      <option value="standard">Standard Proposal</option>
                      <option value="detailed">Detailed Proposal</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contractTemplate" className="form-label">Contract Template</label>
                    <select
                      id="contractTemplate"
                      className="input"
                      value={formData.templates.contract}
                      onChange={(e) => setFormData({
                        ...formData,
                        templates: { ...formData.templates, contract: e.target.value }
                      })}
                    >
                      <option value="">Select template</option>
                      <option value="standard">Standard Contract</option>
                      <option value="premium">Premium Contract</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="invoiceTemplate" className="form-label">Invoice Template</label>
                    <select
                      id="invoiceTemplate"
                      className="input"
                      value={formData.templates.invoice}
                      onChange={(e) => setFormData({
                        ...formData,
                        templates: { ...formData.templates, invoice: e.target.value }
                      })}
                    >
                      <option value="">Select template</option>
                      <option value="standard">Standard Invoice</option>
                      <option value="detailed">Detailed Invoice</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {sectionId === 'workflow' && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="workflowTemplate" className="form-label">Workflow Template</label>
                  <select
                    id="workflowTemplate"
                    className="input"
                    value={formData.workflowTemplate}
                    onChange={(e) => setFormData({ ...formData, workflowTemplate: e.target.value })}
                  >
                    <option value="">Select a workflow</option>
                    <option value="standard">Standard Service Workflow</option>
                    <option value="premium">Premium Service Workflow</option>
                    <option value="express">Express Service Workflow</option>
                  </select>
                  {formData.workflowTemplate && (
                    <div className="mt-4 rounded-lg border border-gray-200 p-4">
                      <h4 className="text-sm font-medium text-gray-900">Workflow Preview</h4>
                      <div className="mt-3 space-y-3">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <CheckCircle size={16} className="text-primary" />
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="h-2 w-full rounded-full bg-gray-100">
                              <div className="h-2 rounded-full bg-primary" style={{ width: '100%' }}></div>
                            </div>
                          </div>
                          <span className="ml-3 text-sm text-gray-500">Initial Review</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Clock size={16} className="text-primary" />
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="h-2 w-full rounded-full bg-gray-100">
                              <div className="h-2 rounded-full bg-primary" style={{ width: '60%' }}></div>
                            </div>
                          </div>
                          <span className="ml-3 text-sm text-gray-500">Processing</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <Users size={16} className="text-gray-400" />
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="h-2 w-full rounded-full bg-gray-100"></div>
                          </div>
                          <span className="ml-3 text-sm text-gray-500">Client Review</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-label">Task Templates</label>
                  <div className="space-y-2">
                    {formData.taskTemplates.map((task, index) => (
                      <div key={index} className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                        <div className="flex items-center">
                          <CheckCircle size={16} className="text-gray-500" />
                          <span className="ml-2 text-sm">{task}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newTasks = [...formData.taskTemplates];
                            newTasks.splice(index, 1);
                            setFormData({ ...formData, taskTemplates: newTasks });
                          }}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      leftIcon={<Plus size={16} />}
                      onClick={() => setFormData({
                        ...formData,
                        taskTemplates: [...formData.taskTemplates, 'New Task']
                      })}
                    >
                      Add Task Template
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {sectionId === 'automation' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="form-label mb-0">Job Recurrence</label>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={formData.jobRecurrence}
                        onChange={(e) => setFormData({ ...formData, jobRecurrence: e.target.checked })}
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20"></div>
                    </label>
                  </div>
                  {formData.jobRecurrence && (
                    <div className="mt-4">
                      <select
                        className="input"
                        value={formData.recurrenceSchedule}
                        onChange={(e) => setFormData({ ...formData, recurrenceSchedule: e.target.value })}
                      >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="annually">Annually</option>
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="form-label mb-0">Auto-generate Jobs</label>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={formData.autoGenerate}
                        onChange={(e) => setFormData({ ...formData, autoGenerate: e.target.checked })}
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20"></div>
                    </label>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Automatically create new jobs based on the recurrence schedule
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Reminders & Notifications</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Client Document Reminders</p>
                      <p className="text-xs text-gray-500">Send reminders for missing documents</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={formData.clientReminders}
                        onChange={(e) => setFormData({ ...formData, clientReminders: e.target.checked })}
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Team Task Reminders</p>
                      <p className="text-xs text-gray-500">Send reminders for upcoming tasks</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={formData.teamReminders}
                        onChange={(e) => setFormData({ ...formData, teamReminders: e.target.checked })}
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Overdue Escalation</p>
                      <p className="text-xs text-gray-500">Escalate overdue tasks to managers</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={formData.overdueEscalation}
                        onChange={(e) => setFormData({ ...formData, overdueEscalation: e.target.checked })}
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {sectionId === 'additional' && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="defaultOwner" className="form-label">Default Owner</label>
                  <select
                    id="defaultOwner"
                    className="input"
                    value={formData.defaultOwner}
                    onChange={(e) => setFormData({ ...formData, defaultOwner: e.target.value })}
                  >
                    <option value="">Select an owner</option>
                    <option value="john">John Smith</option>
                    <option value="jane">Jane Doe</option>
                    <option value="team">Tax Team</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Tags</label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="flex items-center"
                        >
                          <span>{tag}</span>
                          <button
                            className="ml-2"
                            onClick={() => {
                              const newTags = [...formData.tags];
                              newTags.splice(index, 1);
                              setFormData({ ...formData, tags: newTags });
                            }}
                          >
                            <X size={14} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      leftIcon={<Tag size={16} />}
                      onClick={() => setFormData({
                        ...formData,
                        tags: [...formData.tags, 'New Tag']
                      })}
                    >
                      Add Tag
                    </Button>
                  </div>
                </div>

                <div>
                  <label htmlFor="clientDescription" className="form-label">Client-facing Description</label>
                  <textarea
                    id="clientDescription"
                    rows={4}
                    className="input"
                    value={formData.clientDescription}
                    onChange={(e) => setFormData({ ...formData, clientDescription: e.target.value })}
                    placeholder="Description visible to clients in the portal..."
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="form-label mb-0">Portal Visibility</label>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={formData.portalVisible}
                        onChange={(e) => setFormData({ ...formData, portalVisible: e.target.checked })}
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20"></div>
                    </label>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Make this service visible in the client portal
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <a href="/services" className="hover:text-primary">Services</a>
            <span>&gt;</span>
            <span>Create New Service</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Create New Service</h1>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            leftIcon={<X size={16} />}
            onClick={() => navigate('/services')}
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
            Create Service
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {sections.map(section => renderSection(section.id))}
        </div>

        <div className="col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye size={18} className="mr-2" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{formData.name || 'Service Name'}</h3>
                  <Badge variant="success">Active</Badge>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {formData.description || 'Service description will appear here...'}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-400" />
                    <span className="ml-2 text-sm text-gray-600">
                      {formData.estimatedHours || 'Est. hours'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign size={16} className="text-gray-400" />
                    <span className="ml-2 text-sm text-gray-600">
                      {formData.fixedFee || formData.hourlyRate || 'Price'}
                    </span>
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
                  leftIcon={<Settings size={16} />}
                >
                  Configure Workflow
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  leftIcon={<Bell size={16} />}
                >
                  Set Up Notifications
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  leftIcon={<Users size={16} />}
                >
                  Manage Permissions
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completion Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Required Fields</span>
                    <span className="font-medium text-gray-900">4/6</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                    <div className="h-2 rounded-full bg-primary" style={{ width: '66.67%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle size={16} className="text-success" />
                    <span className="ml-2">Basic details completed</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle size={16} className="text-success" />
                    <span className="ml-2">Billing type selected</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle size={16} className="text-gray-300" />
                    <span className="ml-2 text-gray-500">Documents configured</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle size={16} className="text-gray-300" />
                    <span className="ml-2 text-gray-500">Workflow assigned</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddService;