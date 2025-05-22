import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BillingDashboard from './BillingDashboard';
import Invoices from './Invoices';
import Subscriptions from './Subscriptions';

const Billing: React.FC = () => {
  return (
    <Routes>
      <Route index element={<BillingDashboard />} />
      <Route path="invoices" element={<Invoices />} />
      <Route path="subscriptions" element={<Subscriptions />} />
    </Routes>
  );
};

export default Billing;