import React, { useState } from 'react';
import { Search, Filter, Plus, Star, Paperclip, Send, MoreVertical, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

interface Message {
  id: string;
  from: {
    name: string;
    avatar?: string;
    type: 'client' | 'internal' | 'system';
  };
  subject: string;
  preview: string;
  timestamp: string;
  unread: boolean;
  flagged: boolean;
  jobReference?: {
    id: string;
    name: string;
  };
  thread: {
    id: string;
    content: string;
    timestamp: string;
    from: {
      name: string;
      avatar?: string;
      type: 'client' | 'internal' | 'system';
    };
    attachments?: {
      name: string;
      size: string;
    }[];
  }[];
}

const messages: Message[] = [
  {
    id: '1',
    from: {
      name: 'John Smith',
      type: 'client'
    },
    subject: 'Tax Return Documents',
    preview: 'I\'ve attached the requested documents for my tax return...',
    timestamp: '10:30 AM',
    unread: true,
    flagged: true,
    jobReference: {
      id: 'job-1',
      name: 'Tax Return 2023'
    },
    thread: [
      {
        id: 't1',
        content: 'I\'ve attached the requested documents for my tax return. Please let me know if you need anything else.',
        timestamp: '10:30 AM',
        from: {
          name: 'John Smith',
          type: 'client'
        },
        attachments: [
          { name: 'W2-2023.pdf', size: '1.2 MB' },
          { name: 'Investment-Statement.pdf', size: '856 KB' }
        ]
      }
    ]
  },
  {
    id: '2',
    from: {
      name: 'Sarah Wilson',
      type: 'internal'
    },
    subject: 'Client Review Meeting',
    preview: 'Let\'s schedule the quarterly review meeting with...',
    timestamp: 'Yesterday',
    unread: true,
    flagged: false,
    jobReference: {
      id: 'job-2',
      name: 'Q3 Review'
    },
    thread: [
      {
        id: 't2',
        content: 'Let\'s schedule the quarterly review meeting with Acme Corp. I\'m thinking next Tuesday at 2 PM?',
        timestamp: 'Yesterday',
        from: {
          name: 'Sarah Wilson',
          type: 'internal'
        }
      }
    ]
  },
  {
    id: '3',
    from: {
      name: 'System',
      type: 'system'
    },
    subject: 'Document Ready for Review',
    preview: 'The tax return draft for Johnson Inc. is ready...',
    timestamp: '2 days ago',
    unread: false,
    flagged: false,
    jobReference: {
      id: 'job-3',
      name: 'Johnson Tax Return'
    },
    thread: [
      {
        id: 't3',
        content: 'The tax return draft for Johnson Inc. is ready for your review. Click here to access the document.',
        timestamp: '2 days ago',
        from: {
          name: 'System',
          type: 'system'
        }
      }
    ]
  }
];

const JobsInbox: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(messages[0]);
  const [replyText, setReplyText] = useState('');
  const [filter, setFilter] = useState('all');

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="flex h-full space-x-6">
        {/* Left Column - Message List */}
        <div className="w-1/3 flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
            <Button
              variant="primary"
              leftIcon={<Plus size={16} />}
            >
              New Message
            </Button>
          </div>

          <div className="mb-4 flex space-x-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full rounded-md border border-gray-300 pl-9 pr-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <Button
              variant="outline"
              leftIcon={<Filter size={16} />}
            >
              Filter
            </Button>
          </div>

          <div className="flex-grow overflow-auto rounded-lg border border-gray-200">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`
                  cursor-pointer border-b border-gray-200 p-4 hover:bg-gray-50
                  ${selectedMessage?.id === message.id ? 'bg-primary/5' : ''}
                  ${message.unread ? 'bg-gray-50' : ''}
                `}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`
                      h-8 w-8 rounded-full flex items-center justify-center text-white
                      ${message.from.type === 'client' ? 'bg-primary' : 
                        message.from.type === 'internal' ? 'bg-gray-600' : 
                        'bg-warning'}
                    `}>
                      {message.from.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">{message.from.name}</span>
                        {message.unread && (
                          <span className="ml-2 h-2 w-2 rounded-full bg-primary"></span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{message.subject}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                    {message.flagged && (
                      <Star size={14} className="mt-1 text-warning fill-current" />
                    )}
                  </div>
                </div>
                {message.jobReference && (
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      {message.jobReference.name}
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Message View */}
        <div className="flex-1 flex flex-col rounded-lg border border-gray-200">
          {selectedMessage ? (
            <>
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h2 className="text-xl font-semibold text-gray-900">{selectedMessage.subject}</h2>
                    {selectedMessage.flagged && (
                      <Star size={16} className="ml-2 text-warning fill-current" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">Mark as Resolved</Button>
                    <Button variant="outline" size="sm" leftIcon={<MoreVertical size={14} />} />
                  </div>
                </div>
                {selectedMessage.jobReference && (
                  <div className="mt-2">
                    <Badge variant="outline">
                      Related to: {selectedMessage.jobReference.name}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex-grow overflow-auto p-4 space-y-4">
                {selectedMessage.thread.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`
                          h-8 w-8 rounded-full flex items-center justify-center text-white
                          ${message.from.type === 'client' ? 'bg-primary' : 
                            message.from.type === 'internal' ? 'bg-gray-600' : 
                            'bg-warning'}
                        `}>
                          {message.from.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <span className="font-medium text-gray-900">{message.from.name}</span>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock size={12} className="mr-1" />
                            <span>{message.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-11">
                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-gray-800">{message.content}</p>
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.attachments.map((attachment, index) => (
                              <div
                                key={index}
                                className="flex items-center rounded-md border border-gray-200 bg-white p-2"
                              >
                                <Paperclip size={14} className="text-gray-400" />
                                <span className="ml-2 text-sm text-gray-700">{attachment.name}</span>
                                <span className="ml-2 text-xs text-gray-500">({attachment.size})</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 p-4">
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <textarea
                    placeholder="Type your reply..."
                    className="w-full resize-none border-0 bg-transparent p-0 placeholder-gray-400 focus:outline-none focus:ring-0"
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" leftIcon={<Paperclip size={14} />}>
                        Attach
                      </Button>
                    </div>
                    <Button variant="primary" leftIcon={<Send size={14} />}>
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsInbox;