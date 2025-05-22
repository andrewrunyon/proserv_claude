import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TemplatesDashboard from './templates/TemplatesDashboard';
import IntakeTemplates from './templates/IntakeTemplates';
import InvoiceTemplates from './templates/InvoiceTemplates';
import ProposalTemplates from './templates/ProposalTemplates';
import ContractTemplates from './templates/ContractTemplates';
import CustomTemplates from './templates/CustomTemplates';

const Templates: React.FC = () => {
  return (
    <Routes>
      <Route index element={<TemplatesDashboard />} />
      <Route path="intake" element={<IntakeTemplates />} />
      <Route path="invoices" element={<InvoiceTemplates />} />
      <Route path="proposals" element={<ProposalTemplates />} />
      <Route path="contracts" element={<ContractTemplates />} />
      <Route path="custom" element={<CustomTemplates />} />
    </Routes>
  );
};

export default Templates;