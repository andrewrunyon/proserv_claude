import React, { useState } from 'react';
import {
  Building2,
  Users,
  Database,
  Globe,
  Mail,
  Bell,
  CreditCard,
  Wallet,
  Link as LinkIcon,
  Shield,
  Search,
  ChevronDown,
  ChevronUp,
  Settings as SettingsIcon,
  Layout,
  BellRing,
  UserCog,
  Upload,
  Check,
  X,
  DollarSign,
  Calendar,
  Clock,
  FileText,
  Tag,
  Sliders,
  AlertTriangle,
  Plus,
  Download
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  expanded?: boolean;
}

const Settings: React.FC = () => {
  const [sections, setSections] = useState<SettingsSection[]>([
    {
      id: 'firm',
      title: 'Firm Settings',
      icon: <Building2 className="h-6 w-6" />,
      description: "Configure your firm's basic information and preferences",
      expanded: true
    },
    {
      id: 'team',
      title: 'Team & Roles',
      icon: <Users className="h-6 w-6" />,
      description: 'Manage team members and role-based permissions',
      expanded: false
    },
    {
      id: 'portal',
      title: 'Portal Customization',
      icon: <Globe className="h-6 w-6" />,
      description: 'Customize the client portal experience',
      expanded: false
    },
    {
      id: 'email',
      title: 'Email & Communication',
      icon: <Mail className="h-6 w-6" />,
      description: 'Set up email templates and communication preferences',
      expanded: false
    },
    {
      id: 'notifications',
      title: 'Notifications & Reminders',
      icon: <Bell className="h-6 w-6" />,
      description: 'Configure automated alerts and reminders',
      expanded: false
    },
    {
      id: 'billing',
      title: 'Billing Preferences',
      icon: <CreditCard className="h-6 w-6" />,
      description: 'Set up billing rules and payment settings',
      expanded: false
    },
    {
      id: 'fields',
      title: 'Custom Fields',
      icon: <Database className="h-6 w-6" />,
      description: 'Create and manage custom data fields',
      expanded: false
    },
    {
      id: 'integrations',
      title: 'Integrations',
      icon: <LinkIcon className="h-6 w-6" />,
      description: 'Connect with external services and apps',
      expanded: false
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: <Shield className="h-6 w-6" />,
      description: 'Manage security settings and data privacy',
      expanded: false
    }
  ]);

  const toggleSection = (sectionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, expanded: !section.expanded }
        : section
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500">
            Configure your firm's operations, team access, billing rules, and client experience
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search settings..."
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button
          variant="outline"
          leftIcon={<UserCog size={16} />}
        >
          User Preferences
        </Button>
        <Button
          variant="outline"
          leftIcon={<Layout size={16} />}
        >
          Customize Dashboard
        </Button>
        <Button
          variant="outline"
          leftIcon={<BellRing size={16} />}
        >
          Notification Settings
        </Button>
        <Button
          variant="outline"
          leftIcon={<SettingsIcon size={16} />}
        >
          System Status
        </Button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <Card key={section.id}>
            <div 
              className="flex items-center justify-between p-6 cursor-pointer"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="rounded-lg bg-gray-100 p-3">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                  <p className="text-sm text-gray-500">{section.description}</p>
                </div>
              </div>
              {section.expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {section.expanded && (
              <CardContent className="border-t border-gray-200 p-6">
                {section.id === 'firm' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        <div className="h-24 w-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <Upload className="h-8 w-8 text-gray-400" />
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 w-full">
                          Upload Logo
                        </Button>
                      </div>
                      <div className="flex-grow space-y-4">
                        <div>
                          <label className="form-label">Firm Name</label>
                          <input type="text" className="input" defaultValue="Acme Professional Services" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="form-label">Time Zone</label>
                            <select className="input">
                              <option>Pacific Time (PT)</option>
                              <option>Mountain Time (MT)</option>
                              <option>Central Time (CT)</option>
                              <option>Eastern Time (ET)</option>
                            </select>
                          </div>
                          <div>
                            <label className="form-label">Date Format</label>
                            <select className="input">
                              <option>MM/DD/YYYY</option>
                              <option>DD/MM/YYYY</option>
                              <option>YYYY-MM-DD</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Business Address</label>
                      <input type="text" className="input" placeholder="Street Address" />
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <input type="text" className="input" placeholder="City" />
                        <input type="text" className="input" placeholder="State" />
                        <input type="text" className="input" placeholder="ZIP Code" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Support Email</label>
                        <input type="email" className="input" placeholder="support@example.com" />
                      </div>
                      <div>
                        <label className="form-label">Support Phone</label>
                        <input type="tel" className="input" placeholder="(555) 123-4567" />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Invoice Footer Note</label>
                      <textarea className="input" rows={3} placeholder="Enter default invoice footer text..." />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button variant="outline">Cancel</Button>
                      <Button variant="primary">Save Changes</Button>
                    </div>
                  </div>
                )}

                {section.id === 'team' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-medium text-gray-900">Team Members</h4>
                      <Button variant="primary" leftIcon={<Plus size={16} />}>
                        Add Member
                      </Button>
                    </div>

                    <div className="table-container">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Last Login</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Sarah Wilson</td>
                            <td>Administrator</td>
                            <td>sarah@example.com</td>
                            <td><Badge variant="success">Active</Badge></td>
                            <td>2 hours ago</td>
                            <td>
                              <Button variant="outline" size="sm">Manage</Button>
                            </td>
                          </tr>
                          <tr>
                            <td>Mike Johnson</td>
                            <td>Manager</td>
                            <td>mike@example.com</td>
                            <td><Badge variant="success">Active</Badge></td>
                            <td>1 day ago</td>
                            <td>
                              <Button variant="outline" size="sm">Manage</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-8">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Roles & Permissions</h4>
                      <div className="space-y-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-medium text-gray-900">Administrator</h5>
                                <p className="text-sm text-gray-500">Full system access and control</p>
                              </div>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-medium text-gray-900">Manager</h5>
                                <p className="text-sm text-gray-500">Team and client management</p>
                              </div>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                )}

                {section.id === 'portal' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        <div className="h-24 w-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <Upload className="h-8 w-8 text-gray-400" />
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 w-full">
                          Upload Logo
                        </Button>
                      </div>
                      <div className="flex-grow">
                        <label className="form-label">Portal Title</label>
                        <input type="text" className="input" placeholder="Client Portal" />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Welcome Message</label>
                      <textarea className="input" rows={3} placeholder="Enter welcome message..." />
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Module Visibility</h4>
                      <div className="space-y-3">
                        {['Documents', 'Invoices', 'Messages', 'Tasks', 'Job Status'].map((module) => (
                          <label key={module} className="flex items-center">
                            <input type="checkbox" className="form-checkbox" defaultChecked />
                            <span className="ml-2">{module}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button variant="outline">Preview Portal</Button>
                      <Button variant="primary">Save Changes</Button>
                    </div>
                  </div>
                )}

                {section.id === 'email' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Default Sender Name</label>
                        <input type="text" className="input" placeholder="Your Firm Name" />
                      </div>
                      <div>
                        <label className="form-label">Reply-to Email</label>
                        <input type="email" className="input" placeholder="support@example.com" />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Email Signature</label>
                      <textarea className="input" rows={4} placeholder="Enter email signature..." />
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-4">Email Templates</h4>
                      <div className="space-y-4">
                        {['Invoice', 'Reminder', 'Welcome', 'Document Request'].map((template) => (
                          <Card key={template}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="font-medium text-gray-900">{template} Template</h5>
                                  <p className="text-sm text-gray-500">Default template for {template.toLowerCase()} emails</p>
                                </div>
                                <Button variant="outline" size="sm">Edit</Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {section.id === 'notifications' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-4">Internal Notifications</h4>
                      <div className="space-y-3">
                        {[
                          'Task completed',
                          'Job status updated',
                          'New client added',
                          'Document uploaded',
                          'Payment received'
                        ].map((notification) => (
                          <label key={notification} className="flex items-center justify-between">
                            <span>{notification}</span>
                            <div className="relative inline-flex cursor-pointer items-center">
                              <input type="checkbox" className="peer sr-only" defaultChecked />
                              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-4">Client Notifications</h4>
                      <div className="space-y-3">
                        {[
                          'Invoice due reminder',
                          'Missing document reminder',
                          'Job status updates',
                          'New message notification'
                        ].map((notification) => (
                          <label key={notification} className="flex items-center justify-between">
                            <span>{notification}</span>
                            <div className="relative inline-flex cursor-pointer items-center">
                              <input type="checkbox" className="peer sr-only" defaultChecked />
                              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-4">Reminder Settings</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="form-label">First Reminder</label>
                          <select className="input">
                            <option>3 days before</option>
                            <option>5 days before</option>
                            <option>7 days before</option>
                          </select>
                        </div>
                        <div>
                          <label className="form-label">Follow-up Reminder</label>
                          <select className="input">
                            <option>1 day after</option>
                            <option>3 days after</option>
                            <option>5 days after</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {section.id === 'billing' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Default Due Terms</label>
                        <select className="input">
                          <option>Net 15</option>
                          <option>Net 30</option>
                          <option>Net 45</option>
                          <option>Net 60</option>
                        </select>
                      </div>
                      <div>
                        <label className="form-label">Default Tax Rate (%)</label>
                        <input type="number" className="input" placeholder="0.00" />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-4">Late Fees</h4>
                      <div className="flex items-center justify-between mb-4">
                        <span>Enable Late Fees</span>
                        <div className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" className="peer sr-only" />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="form-label">Late Fee Amount (%)</label>
                          <input type="number" className="input" placeholder="0.00" disabled />
                        </div>
                        <div>
                          <label className="form-label">Grace Period (days)</label>
                          <input type="number" className="input" placeholder="0" disabled />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-4">Payment Methods</h4>
                      <div className="space-y-3">
                        {[
                          'Credit Card',
                          'ACH Transfer',
                          'Check',
                          'Wire Transfer'
                        ].map((method) => (
                          <label key={method} className="flex items-center justify-between">
                            <span>{method}</span>
                            <div className="relative inline-flex cursor-pointer items-center">
                              <input type="checkbox" className="peer sr-only" defaultChecked />
                              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-4">Automation</h4>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span>Auto-send Invoices</span>
                          <div className="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                          </div>
                        </label>
                        <label className="flex items-center justify-between">
                          <span>Send Payment Confirmation</span>
                          <div className="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" className="peer sr-only" defaultChecked />
                            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {section.id === 'fields' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-x-2">
                        <Button variant="outline" className="border-b-2 border-primary">Clients</Button>
                        <Button variant="outline">Jobs</Button>
                        <Button variant="outline">Invoices</Button>
                        <Button variant="outline">Services</Button>
                      </div>
                      <Button variant="primary" leftIcon={<Plus size={16} />}>
                        Add Field
                      </Button>
                    </div>

                    <div className="table-container">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Label</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Portal Visible</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Industry</td>
                            <td>Dropdown</td>
                            <td><Check size={16} className="text-success" /></td>
                            <td><Check size={16} className="text-success" /></td>
                            <td>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="outline" size="sm">Delete</Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Tax ID</td>
                            <td>Text</td>
                            <td><Check size={16} className="text-success" /></td>
                            <td><X size={16} className="text-gray-400" /></td>
                            <td>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="outline" size="sm">Delete</Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {section.id === 'integrations' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {[
                        { name: 'QuickBooks', status: 'connected' },
                        { name: 'Stripe', status: 'connected' },
                        { name: 'Google Drive', status: 'not_connected' },
                        { name: 'Outlook', status: 'not_connected' },
                        { name: 'Zapier', status: 'not_connected' },
                        { name: 'Slack', status: 'connected' }
                      ].map((integration) => (
                        <Card key={integration.name}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-medium text-gray-900">{integration.name}</h5>
                                <Badge
                                  variant={integration.status === 'connected' ? 'success' : 'secondary'}
                                >
                                  {integration.status === 'connected' ? 'Connected' : 'Not Connected'}
                                </Badge>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                              >
                                {integration.status === 'connected' ? 'Manage' : 'Connect'}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="flex justify-center">
                      <Button variant="outline" leftIcon={<Plus size={16} />}>
                        Request New Integration
                      </Button>
                    </div>
                  </div>
                )}

                {section.id === 'security' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-4">Password Policy</h4>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span>Require Strong Passwords</span>
                          <div className="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" className="peer sr-only" defaultChecked />
                            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                          </div>
                        </label>
                        <div>
                          <label className="form-label">Minimum Password Length</label>
                          <select className="input">
                            <option>8 characters</option>
                            <option>10 characters</option>
                            <option>12 characters</option>
                          </select>
                        </div>
                        <div>
                          <label className="form-label">Password Expiration</label>
                          <select className="input">
                            <option>Never</option>
                            <option>30 days</option>
                            <option>60 days</option>
                            <option>90 days</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-4">Two-Factor Authentication</h4>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span>Require 2FA for all users</span>
                          <div className="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                          </div>
                        </label>
                      
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-4">Session Management</h4>
                      <div>
                        <label className="form-label">Auto-logout after inactivity</label>
                        <select className="input">
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>2 hours</option>
                          <option>4 hours</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-4">IP Access Control</h4>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span>Enable IP Whitelist</span>
                          <div className="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                          </div>
                        </label>
                        <textarea
                          className="input"
                          rows={3}
                          placeholder="Enter allowed IP addresses (one per line)"
                          disabled
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-4">Data Management</h4>
                      <div className="space-y-4">
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          leftIcon={<Download size={16} />}
                        >
                          Export All Data
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-error"
                          leftIcon={<AlertTriangle size={16} />}
                        >
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Settings;