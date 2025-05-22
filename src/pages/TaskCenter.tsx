import React, { useState } from 'react';
import { Search, Filter, Plus, Calendar, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

interface Task {
  id: string;
  title: string;
  client: string;
  service: string;
  assignee: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  stage: 'intake' | 'in-progress' | 'review' | 'complete';
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Tax Return 2023',
    client: 'Acme Corp',
    service: 'Tax Preparation',
    assignee: 'Sarah Wilson',
    dueDate: 'Oct 15, 2025',
    priority: 'high',
    stage: 'intake'
  },
  {
    id: '2',
    title: 'Financial Audit Q3',
    client: 'Tech Solutions',
    service: 'Audit',
    assignee: 'Mike Johnson',
    dueDate: 'Nov 30, 2025',
    priority: 'medium',
    stage: 'in-progress'
  },
  {
    id: '3',
    title: 'Strategic Planning',
    client: 'Global Industries',
    service: 'Consulting',
    assignee: 'David Chen',
    dueDate: 'Oct 10, 2025',
    priority: 'high',
    stage: 'review'
  },
  {
    id: '4',
    title: 'Quarterly Report',
    client: 'City Services',
    service: 'Financial Reporting',
    assignee: 'Emily Brown',
    dueDate: 'Sep 30, 2025',
    priority: 'medium',
    stage: 'complete'
  }
];

const stages = [
  { id: 'intake', name: 'Intake' },
  { id: 'in-progress', name: 'In Progress' },
  { id: 'review', name: 'Review' },
  { id: 'complete', name: 'Complete' }
];

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <Card className="mb-3 hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-900">{task.title}</h3>
          <Badge variant={
            task.priority === 'high' ? 'error' :
            task.priority === 'medium' ? 'warning' : 'success'
          }>
            {task.priority}
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Users size={14} className="mr-2" />
            {task.client}
          </div>
          
          <div className="flex items-center text-gray-600">
            <Calendar size={14} className="mr-2" />
            {task.dueDate}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                {task.assignee.split(' ').map(n => n[0]).join('')}
              </div>
              <span className="ml-2 text-gray-600 text-xs">{task.assignee}</span>
            </div>
            <span className="text-xs text-gray-500">{task.service}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Column = ({ title, tasks }: { title: string; tasks: Task[] }) => {
  return (
    <div className="flex-1 min-w-[300px] bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium text-gray-700 mb-4 flex items-center justify-between">
        <span>{title}</span>
        <span className="text-sm text-gray-500">{tasks.length}</span>
      </h3>
      
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

const TaskCenter: React.FC = () => {
  const [tasks] = useState(initialTasks);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Center</h1>
          <p className="text-sm text-gray-500">Manage and track all tasks across projects</p>
        </div>
        
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
        >
          Create Task
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-grow md:flex-grow-0">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full rounded-md border border-gray-300 pl-9 pr-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select className="rounded-md border border-gray-300 py-2 pl-3 pr-8 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option>All Assignees</option>
            <option>Sarah Wilson</option>
            <option>Mike Johnson</option>
            <option>David Chen</option>
          </select>
          
          <select className="rounded-md border border-gray-300 py-2 pl-3 pr-8 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option>All Services</option>
            <option>Tax</option>
            <option>Audit</option>
            <option>Advisory</option>
          </select>
          
          <Button
            variant="outline"
            leftIcon={<Filter size={16} />}
          >
            More Filters
          </Button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6">
        {stages.map(stage => (
          <Column
            key={stage.id}
            title={stage.name}
            tasks={tasks.filter(task => task.stage === stage.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskCenter;