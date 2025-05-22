import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Save,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Mail,
  FileText,
  Clock,
  Bell,
  Users,
  Calendar,
  Tag,
  Settings,
  AlertTriangle,
  ChevronRight,
  Plus,
  Trash2
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: 'trigger' | 'condition' | 'action';
}

const triggers: Step[] = [
  {
    id: 'client-created',
    title: 'Client Created',
    description: 'Trigger when a new client is added to the system',
    icon: <Users size={24} />,
    type: 'trigger'
  },
  {
    id: 'job-created',
    title: 'Job Created',
    description: 'Trigger when a new job is created',
    icon: <FileText size={24} />,
    type: 'trigger'
  },
  {
    id: 'job-status-changed',
    title: 'Job Status Changed',
    description: 'Trigger when a job status is updated',
    icon: <Settings size={24} />,
    type: 'trigger'
  },
  {
    id: 'document-missing',
    title: 'Document Missing',
    description: 'Trigger when required documents are not received after X days',
    icon: <AlertTriangle size={24} />,
    type: 'trigger'
  },
  {
    id: 'invoice-unpaid',
    title: 'Invoice Unpaid',
    description: 'Trigger when an invoice remains unpaid after due date',
    icon: <AlertTriangle size={24} />,
    type: 'trigger'
  }
];

const conditions: Step[] = [
  {
    id: 'service-type',
    title: 'Service Type',
    description: 'Filter by specific service types',
    icon: <Settings size={24} />,
    type: 'condition'
  },
  {
    id: 'client-tags',
    title: 'Client Tags',
    description: 'Filter by client tags',
    icon: <Tag size={24} />,
    type: 'condition'
  },
  {
    id: 'account-owner',
    title: 'Account Owner',
    description: 'Filter by account owner',
    icon: <Users size={24} />,
    type: 'condition'
  },
  {
    id: 'job-type',
    title: 'Job Type',
    description: 'Filter by job type',
    icon: <FileText size={24} />,
    type: 'condition'
  }
];

const actions: Step[] = [
  {
    id: 'send-reminder',
    title: 'Send Reminder',
    description: 'Send an automated reminder email',
    icon: <Mail size={24} />,
    type: 'action'
  },
  {
    id: 'create-job',
    title: 'Create Job',
    description: 'Create a new job automatically',
    icon: <FileText size={24} />,
    type: 'action'
  },
  {
    id: 'assign-task',
    title: 'Assign Task',
    description: 'Create and assign a task to team member',
    icon: <Users size={24} />,
    type: 'action'
  },
  {
    id: 'notify-team',
    title: 'Notify Team',
    description: 'Send notification to team members',
    icon: <Bell size={24} />,
    type: 'action'
  },
  {
    id: 'update-status',
    title: 'Update Status',
    description: 'Update job or document status',
    icon: <Settings size={24} />,
    type: 'action'
  },
  {
    id: 'generate-document',
    title: 'Generate Document',
    description: 'Generate a document from template',
    icon: <FileText size={24} />,
    type: 'action'
  }
];

interface FormData {
  name: string;
  description: string;
  trigger: string;
  triggerConfig: {
    delay?: number;
    delayUnit?: 'minutes' | 'hours' | 'days';
  };
  conditions: {
    id: string;
    config: Record<string, any>;
  }[];
  actions: {
    id: string;
    config: Record<string, any>;
  }[];
  schedule: {
    type: 'immediate' | 'scheduled';
    startDate?: Date;
    frequency?: 'once' | 'daily' | 'weekly' | 'monthly';
  };
  status: 'active' | 'draft';
}

const CreateAutomation: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    trigger: '',
    triggerConfig: {},
    conditions: [],
    actions: [],
    schedule: {
      type: 'immediate'
    },
    status: 'draft'
  });

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSave = () => {
    console.log('Saving automation:', formData);
    navigate('/automations');
  };

  const handleCancel = () => {
    navigate('/automations');
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4].map((step) => (
          <React.Fragment key={step}>
            <div className="flex items-center">
              <div
                className={`
                  flex h-10 w-10 items-center justify-center rounded-full
                  ${currentStep >= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}
                `}
              >
                {step}
              </div>
              <span className="ml-2 hidden md:block">
                {step === 1 && 'Select Trigger'}
                {step === 2 && 'Configure Trigger'}
                {step === 3 && 'Choose Actions'}
                {step === 4 && 'Save & Preview'}
              </span>
            </div>
            {step < 4 && (
              <div className="h-1 w-20 bg-gray-200">
                <div
                  className={`h-full ${
                    currentStep > step ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {triggers.map((trigger) => (
        <Card
          key={trigger.id}
          className={`cursor-pointer transition-shadow hover:shadow-md ${
            formData.trigger === trigger.id ? 'border-primary ring-1 ring-primary' : ''
          }`}
          onClick={() => setFormData({ ...formData, trigger: trigger.id })}
        >
          <CardContent className="p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {trigger.icon}
            </div>
            <h3 className="mb-2 font-medium text-gray-900">{trigger.title}</h3>
            <p className="text-sm text-gray-500">{trigger.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderStep2 = () => {
    const selectedTrigger = triggers.find(t => t.id === formData.trigger);
    if (!selectedTrigger) return null;

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configure Trigger</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="form-label required">Automation Name</label>
              <input
                type="text"
                className="input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter automation name"
              />
            </div>

            <div>
              <label className="form-label">Description</label>
              <textarea
                className="input"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what this automation does"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Delay</label>
                <input
                  type="number"
                  className="input"
                  value={formData.triggerConfig.delay || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    triggerConfig: {
                      ...formData.triggerConfig,
                      delay: parseInt(e.target.value)
                    }
                  })}
                  placeholder="Enter delay"
                />
              </div>
              <div>
                <label className="form-label">Delay Unit</label>
                <select
                  className="input"
                  value={formData.triggerConfig.delayUnit || 'minutes'}
                  onChange={(e) => setFormData({
                    ...formData,
                    triggerConfig: {
                      ...formData.triggerConfig,
                      delayUnit: e.target.value as 'minutes' | 'hours' | 'days'
                    }
                  })}
                >
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Conditions (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {conditions.map((condition) => (
                <div
                  key={condition.id}
                  className={`
                    flex cursor-pointer items-center rounded-lg border p-4 transition-colors
                    ${formData.conditions.some(c => c.id === condition.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'}
                  `}
                  onClick={() => {
                    const newConditions = formData.conditions.some(c => c.id === condition.id)
                      ? formData.conditions.filter(c => c.id !== condition.id)
                      : [...formData.conditions, { id: condition.id, config: {} }];
                    setFormData({ ...formData, conditions: newConditions });
                  }}
                >
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    {condition.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{condition.title}</h4>
                    <p className="text-sm text-gray-500">{condition.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => (
          <Card
            key={action.id}
            className={`cursor-pointer transition-shadow hover:shadow-md ${
              formData.actions.some(a => a.id === action.id) ? 'border-primary ring-1 ring-primary' : ''
            }`}
            onClick={() => {
              const newActions = formData.actions.some(a => a.id === action.id)
                ? formData.actions.filter(a => a.id !== action.id)
                : [...formData.actions, { id: action.id, config: {} }];
              setFormData({ ...formData, actions: newActions });
            }}
          >
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {action.icon}
              </div>
              <h3 className="mb-2 font-medium text-gray-900">{action.title}</h3>
              <p className="text-sm text-gray-500">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {formData.actions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Configure Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.actions.map((action, index) => {
                const actionConfig = actions.find(a => a.id === action.id);
                if (!actionConfig) return null;

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex items-center">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        {actionConfig.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{actionConfig.title}</h4>
                        <p className="text-sm text-gray-500">{actionConfig.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Settings size={14} />}
                      >
                        Configure
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Trash2 size={14} />}
                        onClick={() => {
                          const newActions = [...formData.actions];
                          newActions.splice(index, 1);
                          setFormData({ ...formData, actions: newActions });
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Review Automation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-2 font-medium text-gray-900">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <p className="font-medium text-gray-900">{formData.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Status</label>
                  <div>
                    <Badge variant={formData.status === 'active' ? 'success' : 'warning'}>
                      {formData.status === 'active' ? 'Active' : 'Draft'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-medium text-gray-900">Trigger</h3>
              <div className="rounded-lg border border-gray-200 p-4">
                {triggers.find(t => t.id === formData.trigger)?.title}
                {formData.triggerConfig.delay && (
                  <p className="mt-1 text-sm text-gray-500">
                    Delay: {formData.triggerConfig.delay} {formData.triggerConfig.delayUnit}
                  </p>
                )}
              </div>
            </div>

            {formData.conditions.length > 0 && (
              <div>
                <h3 className="mb-2 font-medium text-gray-900">Conditions</h3>
                <div className="space-y-2">
                  {formData.conditions.map((condition, index) => {
                    const conditionConfig = conditions.find(c => c.id === condition.id);
                    return (
                      <div key={index} className="rounded-lg border border-gray-200 p-4">
                        {conditionConfig?.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <h3 className="mb-2 font-medium text-gray-900">Actions</h3>
              <div className="space-y-2">
                {formData.actions.map((action, index) => {
                  const actionConfig = actions.find(a => a.id === action.id);
                  return (
                    <div key={index} className="rounded-lg border border-gray-200 p-4">
                      {actionConfig?.title}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-medium text-gray-900">Schedule</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Type</label>
                  <select
                    className="input mt-1"
                    value={formData.schedule.type}
                    onChange={(e) => setFormData({
                      ...formData,
                      schedule: {
                        ...formData.schedule,
                        type: e.target.value as 'immediate' | 'scheduled'
                      }
                    })}
                  >
                    <option value="immediate">Run Immediately</option>
                    <option value="scheduled">Schedule Run</option>
                  </select>
                </div>
                {formData.schedule.type === 'scheduled' && (
                  <>
                    <div>
                      <label className="text-sm text-gray-500">Start Date</label>
                      <DatePicker
                        selected={formData.schedule.startDate}
                        onChange={(date) => setFormData({
                          ...formData,
                          schedule: {
                            ...formData.schedule,
                            startDate: date || undefined
                          }
                        })}
                        className="input mt-1"
                        placeholderText="Select start date"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Frequency</label>
                      <select
                        className="input mt-1"
                        value={formData.schedule.frequency}
                        onChange={(e) => setFormData({
                          ...formData,
                          schedule: {
                            ...formData.schedule,
                            frequency: e.target.value as 'once' | 'daily' | 'weekly' | 'monthly'
                          }
                        })}
                      >
                        <option value="once">Once</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Activation</span>
              <div className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={formData.status === 'active'}
                  onChange={(e) => setFormData({
                    ...formData,
                    status: e.target.checked ? 'active' : 'draft'
                  })}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Validation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                {formData.name ? (
                  <CheckCircle size={16} className="text-success" />
                ) : (
                  <AlertTriangle size={16} className="text-warning" />
                )}
                <span className="ml-2">Name is set</span>
              </div>
              <div className="flex items-center text-sm">
                {formData.trigger ? (
                  <CheckCircle size={16} className="text-success" />
                ) : (
                  <AlertTriangle size={16} className="text-warning" />
                )}
                <span className="ml-2">Trigger is selected</span>
              </div>
              <div className="flex items-center text-sm">
                {formData.actions.length > 0 ? (
                  <CheckCircle size={16} className="text-success" />
                ) : (
                  <AlertTriangle size={16} className="text-warning" />
                )}
                <span className="ml-2">At least one action is set</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <a href="/automations" className="hover:text-primary">Automations</a>
            <span>&gt;</span>
            <span>Create New Automation</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Create New Automation</h1>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            leftIcon={<X size={16} />}
            onClick={handleCancel}
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
            onClick={handleSave}
          >
            Create Automation
          </Button>
        </div>
      </div>

      {renderStepIndicator()}

      <div className="mb-6">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <Button
          variant="outline"
          leftIcon={<ArrowLeft size={16} />}
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          Back
        </Button>
        <Button
          variant={currentStep === 4 ? 'primary' : 'outline'}
          rightIcon={currentStep < 4 ? <ArrowRight size={16} /> : undefined}
          leftIcon={currentStep === 4 ? <CheckCircle size={16} /> : undefined}
          onClick={currentStep === 4 ? handleSave : handleNext}
        >
          {currentStep === 4 ? 'Create Automation' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default CreateAutomation;