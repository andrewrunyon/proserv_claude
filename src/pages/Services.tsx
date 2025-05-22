import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ServicesList from '../components/services/ServicesList';
import AddService from '../components/services/AddService';
import ServiceProfile from '../components/services/ServiceProfile';
import CommunityServices from '../components/services/CommunityServices';

const ServicesHome: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <p className="text-sm text-gray-500">Manage the services your firm offers to clients</p>
      </div>
      <ServicesList />
    </div>
  );
};

const Services: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ServicesHome />} />
      <Route path="new" element={<AddService />} />
      <Route path="community" element={<CommunityServices />} />
      <Route path=":id" element={<ServiceProfile />} />
    </Routes>
  );
};

export default Services;