import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Services from './pages/Services';
import Jobs from './pages/Jobs';
import Documents from './pages/Documents';
import Billing from './pages/Billing';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import ClientPortal from './pages/ClientPortal';
import PageNotFound from './pages/PageNotFound';
import Automations from './pages/Automations';
import Templates from './pages/Templates';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="clients/*" element={<Clients />} />
        <Route path="services/*" element={<Services />} />
        <Route path="jobs/*" element={<Jobs />} />
        <Route path="documents" element={<Documents />} />
        <Route path="billing/*" element={<Billing />} />
        <Route path="automations/*" element={<Automations />} />
        <Route path="templates/*" element={<Templates />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
      <Route path="/portal/*" element={<ClientPortal />} />
    </Routes>
  );
}

export default App;