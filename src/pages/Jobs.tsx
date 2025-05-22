import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JobsDashboard from './JobsDashboard';
import TaskCenter from './TaskCenter';
import JobsInbox from './JobsInbox';
import JobsDocuments from './JobsDocuments';
import CreateJob from './CreateJob';

const Jobs = () => {
  return (
    <Routes>
      <Route index element={<JobsDashboard />} />
      <Route path="dashboard" element={<JobsDashboard />} />
      <Route path="tasks" element={<TaskCenter />} />
      <Route path="inbox" element={<JobsInbox />} />
      <Route path="documents" element={<JobsDocuments />} />
      <Route path="new" element={<CreateJob />} />
    </Routes>
  );
};

export default Jobs;