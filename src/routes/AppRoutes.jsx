import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicPage from '../pages/public/PublicPage';
import AdminDashboard from '../pages/admin/AdminDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/links" replace />} />
      <Route path="/links" element={<PublicPage />} />
      
      <Route path="/admin-secret-tj2026x" element={<AdminDashboard />} />
      <Route path="/admin" element={<Navigate to="/links" replace />} />
      <Route path="/dashboard" element={<Navigate to="/links" replace />} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/links" replace />} />
    </Routes>
  );
};

export default AppRoutes;
