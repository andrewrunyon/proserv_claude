import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight,
  Building2,
  Mail,
  Phone,
  MapPin,
  Plus,
  X,
  Tag,
  User,
  Users,
  Search,
  Settings,
  Lock
} from 'lucide-react';
import Button from '../ui/Button';
import { Card } from '../ui/Card';
import Badge from '../ui/Badge';

interface FormData {
  basicInfo: {
    name: string;
    type: 'individual' | 'business' | 'family';
    tags: string[];
  };
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    additionalContacts: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    }[];
  };
  clients: {
    existingClients: string[];
    isClientAccount: boolean;
  };
  owner: string;
  portal: {
    inviteToPortal: boolean;
    permissions: string[];
  };
  notes: string;
  customFields: Record<string, string>;
}

const AddAccountForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    basicInfo: {
      name: '',
      type: 'business',
      tags: []
    },
    contact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      additionalContacts: []
    },
    clients: {
      existingClients: [],
      isClientAccount: false
    },
    owner: '',
    portal: {
      inviteToPortal: false,
      permissions: ['view_documents', 'view_invoices']
    },
    notes: '',
    customFields: {
      field1: '',
      field2: ''
    }
  });

  const [newTag, setNewTag] = useState('');
  const [showNewContactForm, setShowNewContactForm] = useState(false);
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');
    
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof FormData],
        [field]: value
      }
    }));
  };

  const handleAddTag = () => {
    if (newTag && !formData.basicInfo.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        basicInfo: {
          ...prev.basicInfo,
          tags: [...prev.basicInfo.tags, newTag]
        }
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        tags: prev.basicInfo.tags.filter(t => t !== tag)
      }
    }));
  };

  const handleAddContact = () => {
    if (newContact.firstName && newContact.email) {
      setFormData(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          additionalContacts: [...prev.contact.additionalContacts, newContact]
        }
      }));
      setNewContact({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      });
      setShowNewContactForm(false);
    }
  };

  const handleRemoveContact = (email: string) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        additionalContacts: prev.contact.additionalContacts.filter(c => c.email !== email)
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    navigate('/clients/accounts');
  };

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
        <span>Create New Account</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">Create New Account</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="form-label required">
                  Account Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    id="name"
                    name="basicInfo.name"
                    value={formData.basicInfo.name}
                    onChange={handleChange}
                    className="input pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="type" className="form-label required">
                  Account Type
                </label>
                <select
                  id="type"
                  name="basicInfo.type"
                  value={formData.basicInfo.type}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="individual">Individual</option>
                  <option value="business">Business</option>
                  <option value="family">Family</option>
                </select>
              </div>

              <div>
                <label className="form-label">Tags</label>
                <div className="flex space-x-2">
                  <div className="relative flex-grow">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="input pl-10"
                      placeholder="Add tags"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddTag}
                    leftIcon={<Plus size={16} />}
                  >
                    Add
                  </Button>
                </div>
                {formData.basicInfo.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.basicInfo.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="flex items-center"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          className="ml-2"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <X size={14} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6">Primary Contact</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="form-label required">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="contact.firstName"
                    value={formData.contact.firstName}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="form-label required">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="contact.lastName"
                    value={formData.contact.lastName}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="form-label required">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    id="email"
                    name="contact.email"
                    value={formData.contact.email}
                    onChange={handleChange}
                    className="input pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="tel"
                    id="phone"
                    name="contact.phone"
                    value={formData.contact.phone}
                    onChange={handleChange}
                    className="input pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-medium">Additional Contacts</h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewContactForm(true)}
                  leftIcon={<Plus size={16} />}
                >
                  Add Contact
                </Button>
              </div>

              {showNewContactForm && (
                <div className="border rounded-lg p-4 mb-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="input"
                      value={newContact.firstName}
                      onChange={(e) => setNewContact({...newContact, firstName: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="input"
                      value={newContact.lastName}
                      onChange={(e) => setNewContact({...newContact, lastName: e.target.value})}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="input"
                      value={newContact.email}
                      onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      className="input"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowNewContactForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handleAddContact}
                    >
                      Add Contact
                    </Button>
                  </div>
                </div>
              )}

              {formData.contact.additionalContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg mb-2">
                  <div>
                    <p className="font-medium">{contact.firstName} {contact.lastName}</p>
                    <p className="text-sm text-gray-500">{contact.email}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleRemoveContact(contact.email)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Associated Clients */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6">Associated Clients</h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.clients.isClientAccount}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      clients: {
                        ...prev.clients,
                        isClientAccount: e.target.checked
                      }
                    }))}
                    className="rounded border-gray-300"
                  />
                  <span>Primary contact is also a client</span>
                </label>
              </div>

              <div>
                <label className="form-label">Add Existing Clients</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    className="input pl-10"
                    placeholder="Search clients..."
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Account Owner */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6">Account Owner</h2>
            <div>
              <label htmlFor="owner" className="form-label required">
                Assign Owner
              </label>
              <div className="flex space-x-2">
                <div className="relative flex-grow">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    id="owner"
                    name="owner"
                    value={formData.owner}
                    onChange={handleChange}
                    className="input pl-10"
                    required
                  >
                    <option value="">Select Team Member</option>
                    <option value="sarah">Sarah Wilson</option>
                    <option value="mike">Mike Johnson</option>
                    <option value="david">David Chen</option>
                  </select>
                </div>
                <Button
                  type="button"
                  variant="outline"
                >
                  Assign to me
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Portal Settings */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6">Portal Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.portal.inviteToPortal}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      portal: {
                        ...prev.portal,
                        inviteToPortal: e.target.checked
                      }
                    }))}
                    className="rounded border-gray-300"
                  />
                  <span>Invite to Client Portal</span>
                </label>
              </div>

              {formData.portal.inviteToPortal && (
                <div>
                  <label className="form-label">Portal Permissions</label>
                  <div className="space-y-2">
                    {[
                      { id: 'view_documents', label: 'View Documents' },
                      { id: 'view_invoices', label: 'View Invoices' },
                      { id: 'view_messages', label: 'Send Messages' },
                      { id: 'view_tasks', label: 'View Tasks' }
                    ].map((permission) => (
                      <label key={permission.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.portal.permissions.includes(permission.id)}
                          onChange={(e) => {
                            const newPermissions = e.target.checked
                              ? [...formData.portal.permissions, permission.id]
                              : formData.portal.permissions.filter(p => p !== permission.id);
                            setFormData(prev => ({
                              ...prev,
                              portal: {
                                ...prev.portal,
                                permissions: newPermissions
                              }
                            }));
                          }}
                          className="rounded border-gray-300"
                        />
                        <span>{permission.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Notes & Custom Fields */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6">Additional Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="notes" className="form-label">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="input"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="field1" className="form-label">
                    Custom Field 1
                  </label>
                  <input
                    type="text"
                    id="field1"
                    name="customFields.field1"
                    value={formData.customFields.field1}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div>
                  <label htmlFor="field2" className="form-label">
                    Custom Field 2
                  </label>
                  <input
                    type="text"
                    id="field2"
                    name="customFields.field2"
                    value={formData.customFields.field2}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/clients/accounts')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="outline"
          >
            Save & Add Another
          </Button>
          <Button
            type="submit"
            variant="primary"
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAccountForm;