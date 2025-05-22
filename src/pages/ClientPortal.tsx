import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Briefcase, FileText, CreditCard, MessageSquare, User, Mail, Key, LogOut } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

// Client Portal Components
const PortalDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Projects</p>
                <h3 className="text-xl font-semibold text-gray-900">3</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-secondary/10 p-3">
                <FileText className="h-6 w-6 text-secondary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Documents</p>
                <h3 className="text-xl font-semibold text-gray-900">12</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-error/10 p-3">
                <CreditCard className="h-6 w-6 text-error" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Invoices</p>
                <h3 className="text-xl font-semibold text-gray-900">1</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-3 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <FileText size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New document uploaded</p>
                  <p className="text-xs text-gray-500">Tax return 2023 was uploaded for your review</p>
                  <p className="mt-1 text-xs text-gray-400">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-3 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                  <CreditCard size={16} className="text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Invoice paid</p>
                  <p className="text-xs text-gray-500">Invoice #INV-2023-005 was successfully paid</p>
                  <p className="mt-1 text-xs text-gray-400">5 days ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-3 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10">
                  <MessageSquare size={16} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New message</p>
                  <p className="text-xs text-gray-500">John Smith sent you a message about your project</p>
                  <p className="mt-1 text-xs text-gray-400">1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-md border border-warning/30 bg-warning/5 p-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">Tax Filing Deadline</p>
                  <p className="text-xs text-gray-500">Federal tax return due</p>
                </div>
                <Badge variant="warning">Oct 15, 2025</Badge>
              </div>
              <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">Quarterly Meeting</p>
                  <p className="text-xs text-gray-500">Financial review Q3</p>
                </div>
                <Badge variant="outline">Nov 10, 2025</Badge>
              </div>
              <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">Document Submission</p>
                  <p className="text-xs text-gray-500">Year-end financial statements</p>
                </div>
                <Badge variant="outline">Dec 1, 2025</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Status</th>
                  <th>Next Action</th>
                  <th>Due Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium text-gray-900">
                    Tax Return Preparation 2023
                  </td>
                  <td>
                    <Badge variant="warning">In Progress</Badge>
                  </td>
                  <td className="text-gray-700">Review draft return</td>
                  <td className="text-gray-700">Oct 15, 2025</td>
                  <td>
                    <Button variant="outline" size="sm">View</Button>
                  </td>
                </tr>
                <tr>
                  <td className="font-medium text-gray-900">
                    Financial Planning
                  </td>
                  <td>
                    <Badge variant="primary">Active</Badge>
                  </td>
                  <td className="text-gray-700">Provide investment documents</td>
                  <td className="text-gray-700">Nov 1, 2025</td>
                  <td>
                    <Button variant="outline" size="sm">View</Button>
                  </td>
                </tr>
                <tr>
                  <td className="font-medium text-gray-900">
                    Business Consulting
                  </td>
                  <td>
                    <Badge variant="primary">Active</Badge>
                  </td>
                  <td className="text-gray-700">Strategy meeting</td>
                  <td className="text-gray-700">Oct 25, 2025</td>
                  <td>
                    <Button variant="outline" size="sm">View</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const PortalDocuments = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Documents</h2>
      
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center rounded-lg bg-white p-4 shadow-sm border border-gray-200">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">Tax Documents</p>
            <p className="text-xs text-gray-500">5 files</p>
          </div>
        </div>
        <div className="flex items-center rounded-lg bg-white p-4 shadow-sm border border-gray-200">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary/10">
            <FileText className="h-6 w-6 text-secondary" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">Financial Reports</p>
            <p className="text-xs text-gray-500">3 files</p>
          </div>
        </div>
        <div className="flex items-center rounded-lg bg-white p-4 shadow-sm border border-gray-200">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
            <FileText className="h-6 w-6 text-accent" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">Contracts</p>
            <p className="text-xs text-gray-500">2 files</p>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium text-gray-900">
                    <div className="flex items-center">
                      <FileText size={16} className="mr-2 text-error" />
                      Tax Return 2023 Draft.pdf
                    </div>
                  </td>
                  <td className="text-gray-700">Tax Documents</td>
                  <td className="text-gray-700">Oct 5, 2025</td>
                  <td>
                    <Badge variant="warning">Requires Review</Badge>
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Download</Button>
                      <Button variant="primary" size="sm">Sign</Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="font-medium text-gray-900">
                    <div className="flex items-center">
                      <FileText size={16} className="mr-2 text-primary" />
                      Service Agreement.docx
                    </div>
                  </td>
                  <td className="text-gray-700">Contracts</td>
                  <td className="text-gray-700">Sep 28, 2025</td>
                  <td>
                    <Badge variant="success">Signed</Badge>
                  </td>
                  <td>
                    <Button variant="outline" size="sm">Download</Button>
                  </td>
                </tr>
                <tr>
                  <td className="font-medium text-gray-900">
                    <div className="flex items-center">
                      <FileText size={16} className="mr-2 text-success" />
                      Financial Report Q3.xlsx
                    </div>
                  </td>
                  <td className="text-gray-700">Financial Reports</td>
                  <td className="text-gray-700">Sep 20, 2025</td>
                  <td>
                    <Badge variant="outline">Available</Badge>
                  </td>
                  <td>
                    <Button variant="outline" size="sm">Download</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const PortalPayments = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Payments</h2>
      
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary/10 p-3">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <h3 className="text-xl font-semibold text-gray-900">$3,800</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-success/10 p-3">
                <CreditCard className="h-6 w-6 text-success" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Paid (YTD)</p>
                <h3 className="text-xl font-semibold text-gray-900">$12,500</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-gray-100 p-3">
                <CreditCard className="h-6 w-6 text-gray-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Next Payment</p>
                <h3 className="text-xl font-semibold text-gray-900">Oct 15, 2025</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium text-primary hover:underline">INV-2023-001</td>
                  <td className="text-gray-700">Tax Preparation Services</td>
                  <td className="text-gray-700">Oct 1, 2025</td>
                  <td className="font-medium text-gray-900">$3,800.00</td>
                  <td>
                    <Badge variant="warning">Unpaid</Badge>
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="primary" size="sm">Pay</Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="font-medium text-primary hover:underline">INV-2023-006</td>
                  <td className="text-gray-700">Financial Planning</td>
                  <td className="text-gray-700">Sep 15, 2025</td>
                  <td className="font-medium text-gray-900">$2,500.00</td>
                  <td>
                    <Badge variant="success">Paid</Badge>
                  </td>
                  <td>
                    <Button variant="outline" size="sm">View</Button>
                  </td>
                </tr>
                <tr>
                  <td className="font-medium text-primary hover:underline">INV-2023-005</td>
                  <td className="text-gray-700">Business Consulting</td>
                  <td className="text-gray-700">Aug 30, 2025</td>
                  <td className="font-medium text-gray-900">$1,850.00</td>
                  <td>
                    <Badge variant="success">Paid</Badge>
                  </td>
                  <td>
                    <Button variant="outline" size="sm">View</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const PortalMessages = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Messages</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium text-gray-900">Conversations</h3>
                <Button variant="outline" size="sm">New Message</Button>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="p-4 bg-primary/5 border-l-2 border-primary cursor-pointer">
                  <h4 className="font-medium text-gray-900">John Smith</h4>
                  <p className="text-xs text-gray-500">Regarding your tax return</p>
                  <p className="text-xs text-gray-400 mt-1">Today</p>
                </div>
                <div className="p-4 hover:bg-gray-50 cursor-pointer">
                  <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                  <p className="text-xs text-gray-500">Financial planning meeting</p>
                  <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                </div>
                <div className="p-4 hover:bg-gray-50 cursor-pointer">
                  <h4 className="font-medium text-gray-900">Michael Chen</h4>
                  <p className="text-xs text-gray-500">Business strategy call</p>
                  <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader className="border-b border-gray-200">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                  JS
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">John Smith</h3>
                  <p className="text-xs text-gray-500">Tax Advisor</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto p-4 space-y-4">
              <div className="flex justify-start">
                <div className="max-w-[75%] rounded-lg rounded-tl-none bg-gray-100 p-3">
                  <p className="text-sm text-gray-800">Hi there, I've reviewed your tax documents and have a few questions about your deductions.</p>
                  <p className="mt-1 text-xs text-right text-gray-500">10:30 AM</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[75%] rounded-lg rounded-tr-none bg-primary/10 p-3">
                  <p className="text-sm text-gray-800">Sure, I'm available to discuss. What specific questions do you have?</p>
                  <p className="mt-1 text-xs text-right text-gray-500">10:35 AM</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[75%] rounded-lg rounded-tl-none bg-gray-100 p-3">
                  <p className="text-sm text-gray-800">I noticed your home office deduction seems incomplete. Could you provide more details about the square footage and expenses?</p>
                  <p className="mt-1 text-xs text-right text-gray-500">10:38 AM</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[75%] rounded-lg rounded-tr-none bg-primary/10 p-3">
                  <p className="text-sm text-gray-800">I'll gather that information and upload it to the documents section this afternoon.</p>
                  <p className="mt-1 text-xs text-right text-gray-500">10:42 AM</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[75%] rounded-lg rounded-tl-none bg-gray-100 p-3">
                  <p className="text-sm text-gray-800">Great, thank you. Also, I've uploaded a draft of your return for review.</p>
                  <p className="mt-1 text-xs text-right text-gray-500">10:45 AM</p>
                </div>
              </div>
            </CardContent>
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="input flex-grow"
                />
                <Button variant="primary" className="ml-2">Send</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ClientPortal: React.FC = () => {
  const location = useLocation();
  const isActiveLink = (path: string) => location.pathname === path || location.pathname === `/portal${path}`;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold text-gray-800">ProServ</span>
              <span className="ml-2 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                Client Portal
              </span>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <button className="flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                    AC
                  </div>
                  <span className="hidden text-sm font-medium text-gray-700 md:block">
                    Acme Corporation
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3">
            <Card>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <Link
                    to="/portal"
                    className={`flex items-center px-4 py-3 text-sm font-medium ${
                      isActiveLink('/') 
                        ? 'border-l-2 border-primary bg-primary/5 text-primary' 
                        : 'border-l-2 border-transparent text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Briefcase size={18} className="mr-3" />
                    Dashboard
                  </Link>
                  <Link
                    to="/portal/documents"
                    className={`flex items-center px-4 py-3 text-sm font-medium ${
                      isActiveLink('/documents') 
                        ? 'border-l-2 border-primary bg-primary/5 text-primary' 
                        : 'border-l-2 border-transparent text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <FileText size={18} className="mr-3" />
                    Documents
                  </Link>
                  <Link
                    to="/portal/payments"
                    className={`flex items-center px-4 py-3 text-sm font-medium ${
                      isActiveLink('/payments') 
                        ? 'border-l-2 border-primary bg-primary/5 text-primary' 
                        : 'border-l-2 border-transparent text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <CreditCard size={18} className="mr-3" />
                    Payments
                  </Link>
                  <Link
                    to="/portal/messages"
                    className={`flex items-center px-4 py-3 text-sm font-medium ${
                      isActiveLink('/messages') 
                        ? 'border-l-2 border-primary bg-primary/5 text-primary' 
                        : 'border-l-2 border-transparent text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <MessageSquare size={18} className="mr-3" />
                    Messages
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                      3
                    </span>
                  </Link>
                </nav>
                
                <div className="border-t border-gray-200 p-4">
                  <div className="space-y-4">
                    <div className="rounded-md bg-gray-50 p-3">
                      <div className="flex items-center">
                        <User size={16} className="text-gray-500" />
                        <p className="ml-2 text-sm font-medium text-gray-700">
                          Account Settings
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Mail size={16} />
                      <span>support@proserv.com</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 p-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    leftIcon={<LogOut size={16} />}
                  >
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="col-span-12 md:col-span-9">
            <Routes>
              <Route path="/" element={<PortalDashboard />} />
              <Route path="/documents" element={<PortalDocuments />} />
              <Route path="/payments" element={<PortalPayments />} />
              <Route path="/messages" element={<PortalMessages />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;