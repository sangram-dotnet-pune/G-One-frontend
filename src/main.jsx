// Filename: src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router/AppRouter';
import { Toaster } from 'react-hot-toast'; // For beautiful notifications
import { useAuthStore } from './store/useAuthStore';
import './index.css'; // Tailwind CSS

// Top-notch architecture: We check if the user has a valid session cookie 
// before we even try to paint the screen.
useAuthStore.getState().checkAuth().finally(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AppRouter />
      
      {/* This renders our beautiful success/error popups globally */}
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: '#333',
            color: '#fff',
            fontSize: '14px',
            fontWeight: '600'
          },
        }} 
      />
    </React.StrictMode>
  );
});