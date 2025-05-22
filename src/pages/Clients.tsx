import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientList from '../components/clients/ClientList';
import AddClientForm from '../components/clients/AddClientForm';
import BulkImportWizard from '../components/clients/BulkImportWizard';
import ClientProfile from '../components/clients/ClientProfile';
import AccountsList from '../components/clients/AccountsList';
import AddAccountForm from '../components/clients/AddAccountForm';
import ImportAccounts from '../components/clients/ImportAccounts';
import AccountProfile from '../components/clients/AccountProfile';

const Clients: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ClientList />} />
      <Route path="new" element={<AddClientForm />} />
      <Route path="import" element={<BulkImportWizard />} />
      <Route path=":id" element={<ClientProfile />} />
      <Route path="accounts" element={<AccountsList />} />
      <Route path="accounts/new" element={<AddAccountForm />} />
      <Route path="accounts/import" element={<ImportAccounts />} />
      <Route path="accounts/:id" element={<AccountProfile />} />
    </Routes>
  );
};

export default Clients;