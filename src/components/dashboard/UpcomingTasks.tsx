import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Badge from '../ui/Badge';

interface Task {
  id: number;
  title: string;
  client: string;
  dueDate: string;
  status: 'completed' | 'in-progress' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  link: string;
}

const tasks: Task[] = [
  {
    id: 1,
    title: 'Review quarterly tax filing',
    client: 'Acme Corp',
    dueDate: 'Today',
    status: 'in-progress',
    priority: 'high',
    link: '/jobs/tasks'
  },
  {
    id: 2,
    title: 'Prepare financial statement',
    client: 'Johnson Inc',
    dueDate: 'Tomorrow',
    status: 'in-progress',
    priority: 'medium',
    link: '/jobs/tasks'
  },
  {
    id: 3,
    title: 'Client meeting preparation',
    client: 'Globex Corp',
    dueDate: 'Overdue (2 days)',
    status: 'overdue',
    priority: 'high',
    link: '/jobs/tasks'
  },
  {
    id: 4,
    title: 'Review contract revisions',
    client: 'TechStart LLC',
    dueDate: 'Oct 15, 2025',
    status: 'completed',
    priority: 'medium',
    link: '/jobs/tasks'
  },
];

const statusIcons = {
  completed: <CheckCircle2 size={16} className="text-success" />,
  'in-progress': <Clock size={16} className="text-warning" />,
  overdue: <AlertCircle size={16} className="text-error" />,
};

const priorityBadges = {
  high: <Badge variant="error">High</Badge>,
  medium: <Badge variant="warning">Medium</Badge>,
  low: <Badge variant="secondary">Low</Badge>,
};

const UpcomingTasks: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <h3 className="text-lg font-medium text-gray-900">Upcoming Tasks</h3>
        <button 
          className="btn btn-sm btn-outline"
          onClick={() => navigate('/jobs/tasks')}
        >
          Add Task
        </button>
      </div>
      <div className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="px-5 py-4 cursor-pointer hover:bg-gray-50"
            onClick={() => navigate(task.link)}
          >
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                {statusIcons[task.status]}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                  {priorityBadges[task.priority]}
                </div>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm text-gray-500">
                    Client: <span className="font-medium">{task.client}</span>
                  </p>
                  <p className={`text-xs font-medium ${
                    task.status === 'overdue' ? 'text-error' : 'text-gray-500'
                  }`}>
                    {task.dueDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 px-5 py-3">
        <button 
          className="text-sm font-medium text-primary hover:text-primary-dark"
          onClick={() => navigate('/jobs/tasks')}
        >
          View all tasks
        </button>
      </div>
    </div>
  );
};

export default UpcomingTasks;