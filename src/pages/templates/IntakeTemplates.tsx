import React, { useState } from 'react';
import { Search, Filter, Grid3X3, List, Plus, FileText, Eye, Edit, Copy, Trash2, Hand as DragHandle, X, ChevronDown, ChevronUp, Settings, Save } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  restrictToVerticalAxis
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

interface Field {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file';
  label: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
  description?: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: Field[];
  lastModified: string;
  status: 'active' | 'draft';
  usageCount: number;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'General Client Intake',
    description: 'Standard intake form for new clients',
    category: 'General',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Full Name',
        required: true,
        placeholder: 'Enter your full name'
      },
      {
        id: 'email',
        type: 'text',
        label: 'Email Address',
        required: true,
        placeholder: 'Enter your email'
      },
      {
        id: 'phone',
        type: 'text',
        label: 'Phone Number',
        required: false,
        placeholder: '(555) 555-5555'
      }
    ],
    lastModified: '2024-03-15',
    status: 'active',
    usageCount: 45
  },
  {
    id: '2',
    name: 'Tax Client Questionnaire',
    description: 'Detailed intake form for tax clients',
    category: 'Tax',
    fields: [
      {
        id: 'taxYear',
        type: 'select',
        label: 'Tax Year',
        required: true,
        options: ['2023', '2024']
      },
      {
        id: 'filingStatus',
        type: 'radio',
        label: 'Filing Status',
        required: true,
        options: ['Single', 'Married Filing Jointly', 'Married Filing Separately', 'Head of Household']
      }
    ],
    lastModified: '2024-03-10',
    status: 'active',
    usageCount: 32
  }
];

const fieldTypes = [
  { type: 'text', label: 'Short Text' },
  { type: 'textarea', label: 'Long Text' },
  { type: 'select', label: 'Dropdown' },
  { type: 'checkbox', label: 'Checkboxes' },
  { type: 'radio', label: 'Radio Buttons' },
  { type: 'file', label: 'File Upload' }
];

const SortableField = ({ field, onEdit, onDelete }: { field: Field; onEdit: () => void; onDelete: () => void }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: field.id });

  const style = {
    transform: transform ? `translate3d(0, ${transform.y}px, 0)` : undefined,
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center space-x-4 bg-white p-4 rounded-lg border border-gray-200 mb-2"
    >
      <button {...attributes} {...listeners}>
        <DragHandle className="text-gray-400 cursor-move" />
      </button>
      <div className="flex-grow">
        <div className="flex items-center">
          <span className="font-medium">{field.label}</span>
          {field.required && <span className="text-error ml-1">*</span>}
        </div>
        <span className="text-sm text-gray-500">{field.type}</span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onEdit}
          className="p-1 hover:bg-gray-100 rounded-lg"
        >
          <Edit size={16} className="text-gray-500" />
        </button>
        <button
          onClick={onDelete}
          className="p-1 hover:bg-gray-100 rounded-lg"
        >
          <Trash2 size={16} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

const IntakeTemplates: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState<Field | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && selectedTemplate) {
      const oldIndex = selectedTemplate.fields.findIndex(f => f.id === active.id);
      const newIndex = selectedTemplate.fields.findIndex(f => f.id === over.id);

      const newFields = arrayMove(selectedTemplate.fields, oldIndex, newIndex);
      setSelectedTemplate({
        ...selectedTemplate,
        fields: newFields
      });
    }
  };

  const handleAddField = (type: Field['type']) => {
    if (!selectedTemplate) return;

    const newField: Field = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type} field`,
      required: false,
      options: type === 'select' || type === 'radio' || type === 'checkbox' ? ['Option 1'] : undefined
    };

    setSelectedTemplate({
      ...selectedTemplate,
      fields: [...selectedTemplate.fields, newField]
    });
    setEditingField(newField);
  };

  const handleEditField = (field: Field) => {
    setEditingField(field);
  };

  const handleDeleteField = (fieldId: string) => {
    if (!selectedTemplate) return;

    setSelectedTemplate({
      ...selectedTemplate,
      fields: selectedTemplate.fields.filter(f => f.id !== fieldId)
    });
  };

  const handleSaveField = (field: Field) => {
    if (!selectedTemplate || !editingField) return;

    setSelectedTemplate({
      ...selectedTemplate,
      fields: selectedTemplate.fields.map(f => f.id === field.id ? field : f)
    });
    setEditingField(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Intake Templates</h1>
          <p className="text-sm text-gray-500">Manage client intake forms and questionnaires</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => {
            setSelectedTemplate({
              id: `template-${Date.now()}`,
              name: 'New Template',
              description: '',
              category: 'General',
              fields: [],
              lastModified: new Date().toISOString(),
              status: 'draft',
              usageCount: 0
            });
            setIsEditing(true);
          }}
        >
          Create Template
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-grow md:flex-grow-0">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full rounded-md border border-gray-300 pl-9 pr-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select className="rounded-md border border-gray-300 py-2 pl-3 pr-8 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option>All Categories</option>
            <option>General</option>
            <option>Tax</option>
            <option>Advisory</option>
          </select>

          <select className="rounded-md border border-gray-300 py-2 pl-3 pr-8 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option>All Status</option>
            <option>Active</option>
            <option>Draft</option>
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
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant={template.status === 'active' ? 'success' : 'secondary'}>
                    {template.status}
                  </Badge>
                </div>
                <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{template.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>Used {template.usageCount} times</span>
                  <span>Modified {new Date(template.lastModified).toLocaleDateString()}</span>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    leftIcon={<Eye size={16} />}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    leftIcon={<Edit size={16} />}
                    onClick={() => {
                      setSelectedTemplate(template);
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText size={20} className="text-primary mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-500">{template.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={template.status === 'active' ? 'success' : 'secondary'}>
                      {template.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Eye size={14} />}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Edit size={14} />}
                        onClick={() => {
                          setSelectedTemplate(template);
                          setIsEditing(true);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {selectedTemplate && !isEditing && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setSelectedTemplate(null)}
            ></div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">{selectedTemplate.name}</h3>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  {selectedTemplate.fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <label className="block font-medium text-gray-700">
                        {field.label}
                        {field.required && <span className="text-error ml-1">*</span>}
                      </label>
                      {field.type === 'text' && (
                        <input
                          type="text"
                          className="input"
                          placeholder={field.placeholder}
                          disabled
                        />
                      )}
                      {field.type === 'textarea' && (
                        <textarea
                          className="input"
                          rows={3}
                          placeholder={field.placeholder}
                          disabled
                        />
                      )}
                      {field.type === 'select' && (
                        <select className="input" disabled>
                          <option value="">Select an option</option>
                          {field.options?.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      )}
                      {field.type === 'checkbox' && field.options?.map((option) => (
                        <label key={option} className="flex items-center space-x-2">
                          <input type="checkbox" disabled />
                          <span>{option}</span>
                        </label>
                      ))}
                      {field.type === 'radio' && field.options?.map((option) => (
                        <label key={option} className="flex items-center space-x-2">
                          <input type="radio" name={field.id} disabled />
                          <span>{option}</span>
                        </label>
                      ))}
                      {field.type === 'file' && (
                        <input type="file" className="input" disabled />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTemplate(null)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSelectedTemplate(null);
                      // Handle using the template
                    }}
                  >
                    Use Template
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {selectedTemplate && isEditing && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => {
                setSelectedTemplate(null);
                setIsEditing(false);
              }}
            ></div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-6">
                  <input
                    type="text"
                    value={selectedTemplate.name}
                    onChange={(e) => setSelectedTemplate({
                      ...selectedTemplate,
                      name: e.target.value
                    })}
                    className="text-lg font-medium text-gray-900 border-0 focus:ring-0 focus:border-b-2 focus:border-primary"
                  />
                  <button
                    onClick={() => {
                      setSelectedTemplate(null);
                      setIsEditing(false);
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2 space-y-6">
                    <textarea
                      value={selectedTemplate.description}
                      onChange={(e) => setSelectedTemplate({
                        ...selectedTemplate,
                        description: e.target.value
                      })}
                      placeholder="Enter template description..."
                      className="input w-full"
                      rows={2}
                    />

                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                      modifiers={[restrictToVerticalAxis]}
                    >
                      <SortableContext
                        items={selectedTemplate.fields.map(f => f.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        {selectedTemplate.fields.map((field) => (
                          <SortableField
                            key={field.id}
                            field={field}
                            onEdit={() => handleEditField(field)}
                            onDelete={() => handleDeleteField(field.id)}
                          />
                        ))}
                      </SortableContext>
                    </DndContext>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Add Field</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {fieldTypes.map((type) => (
                            <Button
                              key={type.type}
                              variant="outline"
                              className="w-full justify-start"
                              onClick={() => handleAddField(type.type)}
                            >
                              {type.label}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Template Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="form-label">Category</label>
                          <select
                            className="input"
                            value={selectedTemplate.category}
                            onChange={(e) => setSelectedTemplate({
                              ...selectedTemplate,
                              category: e.target.value
                            })}
                          >
                            <option value="General">General</option>
                            <option value="Tax">Tax</option>
                            <option value="Advisory">Advisory</option>
                          </select>
                        </div>

                        <div>
                          <label className="form-label">Status</label>
                          <select
                            className="input"
                            value={selectedTemplate.status}
                            onChange={(e) => setSelectedTemplate({
                              ...selectedTemplate,
                              status: e.target.value as 'active' | 'draft'
                            })}
                          >
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                          </select>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedTemplate(null);
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    leftIcon={<Save size={16} />}
                    onClick={() => {
                      // Handle saving the template
                      setSelectedTemplate(null);
                      setIsEditing(false);
                    }}
                  >
                    Save Template
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Field Editor Modal */}
      {editingField && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setEditingField(null)}
            ></div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Edit Field</h3>
                  <button
                    onClick={() => setEditingField(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="form-label">Label</label>
                    <input
                      type="text"
                      className="input"
                      value={editingField.label}
                      onChange={(e) => setEditingField({
                        ...editingField,
                        label: e.target.value
                      })}
                    />
                  </div>

                  {(editingField.type === 'text' || editingField.type === 'textarea') && (
                    <div>
                      <label className="form-label">Placeholder</label>
                      <input
                        type="text"
                        className="input"
                        value={editingField.placeholder || ''}
                        onChange={(e) => setEditingField({
                          ...editingField,
                          placeholder: e.target.value
                        })}
                      />
                    </div>
                  )}

                  {(editingField.type === 'select' || editingField.type === 'radio' || editingField.type === 'checkbox') && (
                    <div>
                      <label className="form-label">Options</label>
                      <div className="space-y-2">
                        {editingField.options?.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="text"
                              className="input flex-grow"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...(editingField.options || [])];
                                newOptions[index] = e.target.value;
                                setEditingField({
                                  ...editingField,
                                  options: newOptions
                                });
                              }}
                            />
                            <button
                              onClick={() => {
                                const newOptions = [...(editingField.options || [])];
                                newOptions.splice(index, 1);
                                setEditingField({
                                  ...editingField,
                                  options: newOptions
                                });
                              }}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<Plus size={14} />}
                          onClick={() => setEditingField({
                            ...editingField,
                            options: [...(editingField.options || []), `Option ${(editingField.options?.length || 0) + 1}`]
                          })}
                        >
                          Add Option
                        </Button>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editingField.required}
                        onChange={(e) => setEditingField({
                          ...editingField,
                          required: e.target.checked
                        })}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span>Required field</span>
                    </label>
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setEditingField(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleSaveField(editingField)}
                  >
                    Save Field
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntakeTemplates;