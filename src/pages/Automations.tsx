import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AutomationsHome from './AutomationsHome';
import CreateAutomation from './CreateAutomation';
import AutomationDetails from './AutomationDetails';
import RecurringJobs from './RecurringJobs';
import DocumentReminders from './DocumentReminders';
import AutomationCommunity from './AutomationCommunity';

const Automations = () => {
  return (
    <Routes>
      <Route index element={<AutomationsHome />} />
      <Route path="new" element={<CreateAutomation />} />
      <Route path=":id" element={<AutomationDetails />} />
      <Route path="recurring" element={<RecurringJobs />} />
      <Route path="reminders" element={<DocumentReminders />} />
      <Route path="community" element={<AutomationCommunity />} />
    </Routes>
  );
};

export default Automations;