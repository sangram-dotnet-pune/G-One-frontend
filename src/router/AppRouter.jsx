import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import all our pages
import App from '../App'; // The Guest Chat Entrance
import AuthPage from '../pages/auth/AuthPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import OmniDashboard from '../pages/dashboard/OmniDashboard';
import HealthVaultPage from '../pages/vault/HealthVaultPage'; 

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* PUBLIC ROUTES */}
        {/* The Guest Entrance (Home Page) */}
        <Route path="/" element={<App />} />
        
        {/* The Login / Register Page */}
        <Route path="/auth" element={<AuthPage onNavigateBack={() => window.history.back()} />} />

        {/* PROTECTED ROUTES (Requires Login) */}
        {/* The Central Hub */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <OmniDashboard />
            </ProtectedRoute>
          } 
        />

        {/* The Deep Health Vault */}
        <Route 
          path="/vault" 
          element={
            <ProtectedRoute>
              <HealthVaultPage />
            </ProtectedRoute>
          } 
        />

        {/* 404 FALLBACK: If user types a random URL, send them to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </BrowserRouter>
  );
}