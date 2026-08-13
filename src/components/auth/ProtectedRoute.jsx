// Filename: src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore'; 

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  
  // Actually use the Zustand store to check auth status
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full mb-4"
        />
        <p className="text-slate-500 font-medium text-sm">Verifying secure session...</p>
      </div>
    );
  }

  // If no user is logged in, redirect them to the Auth page.
  // We use `state={{ from: location }}` so that after they log in, 
  // we can send them right back to the page they were trying to access.
  if (!authUser) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If they are logged in, render the requested page (the children)
  return <>{children}</>;
}