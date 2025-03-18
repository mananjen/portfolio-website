// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import About from '../pages/About';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root path to /about */}
      <Route path="/" element={<Navigate to="/about" replace />} />
      <Route path="/about" element={<About />} />
      {/* Optionally, catch-all route */}
      <Route path="*" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;