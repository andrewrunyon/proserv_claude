import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReportsDashboard from './ReportsDashboard';
import ReportsDesigner from './ReportsDesigner';
import ReportsCommunity from './ReportsCommunity';

const Reports: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ReportsDashboard />} />
      <Route path="designer" element={<ReportsDesigner />} />
      <Route path="community" element={<ReportsCommunity />} />
    </Routes>
  );
};

export default Reports;