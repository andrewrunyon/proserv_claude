import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Building2, 
  Phone, 
  MapPin, 
  Plus,
  ChevronRight,
  Tag,
  User,
  FileText,
  X
} from 'lucide-react';
import Button from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  additionalEmails: string[];
  phone: string;
  companyName: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  tags: string[];
  assignedTo: string;
  notes: string;
  customFields: {
    field1: string;
    field2: string;
  };
}

const AddClientForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    additionalEmails: [],
    phone: '',
    companyName: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    },
    tags: [],
    assignedTo: '',
    notes: '',
    customFields: {
      field1: '',
      field2: ''
    }
  });

  const [newTag, setNewTag] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof FormData],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddEmail = () => {
    if (newEmail && !formData.additionalEmails.includes(newEmail)) {
      setFormData(prev => ({
        ...prev,
        additionalEmails: [...prev.additionalEmails, newEmail]
      }));
      setNewEmail('');
    }
  };

  const handleRemoveEmail = (email: string) => {
    setFormData(prev => ({
      ...prev,
      additionalEmails: prev.additionalEmails.filter(e => e !== email)
    }));
  };

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    navigate('/clients');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <button
          className="hover:text-primary"
          onClick={() => navigate('/clients')}
        >
          Clients
        </button>
        <ChevronRight size={16} />
        <span>Create New Client</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">Create New Client</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="form-label required">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="form-label required">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="form-label required">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label">Additional Emails</label>
              <div className="flex space-x-2">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="input pl-10"
                    placeholder="Enter additional email"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddEmail}
                  leftIcon={<Plus size={16} />}
                >
                  Add
                </Button>
              </div>
              {formData.additionalEmails.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.additionalEmails.map((email) => (
                    <Badge
                      key={email}
                      variant="outline"
                      className="flex items-center"
                    >
                      <span>{email}</span>
                      <button
                        type="button"
                        className="ml-2"
                        onClick={() => handleRemoveEmail(email)}
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="(555) 555-5555"
                />
              </div>
            </div>

            <div>
              <label htmlFor="companyName" className="form-label">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="input pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="street" className="form-label">Street Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="street"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="input pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="form-label">City</label>
                <input
                  type="text"
                  id="city"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="state" className="form-label">State/Province</label>
                <select
                  id="state"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select State</option>
                  {/* Add state options */}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="zip" className="form-label">Zip/Postal Code</label>
                <input
                  type="text"
                  id="zip"
                  name="address.zip"
                  value={formData.address.zip}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="country" className="form-label">Country</label>
                <select
                  id="country"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select Country</option>
                  {/* Add country options */}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <div className="relative flex-grow">
                <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
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

            {formData.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="notes" className="form-label">Notes</label>
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
                <label htmlFor="field1" className="form-label">Custom Field 1</label>
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
                <label htmlFor="field2" className="form-label">Custom Field 2</label>
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
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/clients')}
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
            Save Client
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddClientForm;