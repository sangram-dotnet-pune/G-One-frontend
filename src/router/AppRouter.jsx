// Filename: src/router/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// We import the pages we have built so far
import App from '../App'; // The Guest Chat Entrance we built earlier
import AuthPage from '../pages/auth/AuthPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* PUBLIC ROUTES */}
        {/* The root URL '/' loads our Omni-care Guest Chat */}
        <Route path="/" element={<App />} />
        
        {/* The '/auth' URL loads our Login/Register screen */}
        <Route path="/auth" element={<AuthPage onNavigateBack={() => window.history.back()} />} />

        {/* PROTECTED ROUTES (Placeholder for the next step) */}
        {/* Notice how we wrap the Health Vault inside our reusable ProtectedRoute */}
        <Route 
          path="/vault" 
          element={
            <ProtectedRoute>
              {/* <HealthVaultPage /> */}
              <div className="p-10 text-center">Health Vault (Coming Soon)</div>
            </ProtectedRoute>
          } 
        />

        {/* 404 FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </BrowserRouter>
  );
}