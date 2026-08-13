// Filename: src/pages/auth/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Add navigation hooks
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, HeartPulse, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

// MOCK STORE FOR LIVE PREVIEW
// Note for your local setup: Delete this mock function and uncomment the import below it!
// import { useAuthStore } from '../../store/useAuthStore'; 
const useAuthStore = () => ({
  login: (data) => console.log("Login triggered:", data),
  register: (data) => console.log("Register triggered:", data),
  isLoggingIn: false,
  isRegistering: false,
  authUser: null
});

export default function AuthPage({ onNavigateBack }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  
  // Local form state
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // Connect to Zustand store
  const { login, register, isLoggingIn, isRegistering, authUser } = useAuthStore();

  // Watch for successful login/registration and redirect automatically
  useEffect(() => {
    if (authUser) {
      // If they were trying to visit a protected page before logging in, send them there.
      // Otherwise, send them to the default Health Vault page.
      const from = location.state?.from?.pathname || '/vault';
      navigate(from, { replace: true });
    }
  }, [authUser, navigate, location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(formData);
    } else {
      register(formData);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-slate-50">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header / Back Button */}
      <div className="absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-center">
        <button 
          onClick={onNavigateBack}
          className="text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Guest Mode
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-lg shadow-blue-500/20">
            <HeartPulse className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-center text-3xl font-extrabold text-slate-900 tracking-tight"
        >
          {isLogin ? 'Welcome back' : 'Create your secure account'}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-center text-sm text-slate-500"
        >
          {isLogin ? 'Sign in to access your Health Vault and Personalized AI.' : 'Join G-ONE to unlock context-aware AI and emergency tools.'}
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 24 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4"
      >
        <div className="bg-white/80 backdrop-blur-xl py-8 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-3xl sm:px-10 border border-slate-200/60">
          
          {/* Animated Form Switcher */}
          <AnimatePresence mode="wait">
            <motion.form 
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5" 
              onSubmit={handleSubmit}
            >
              
              {/* Name Field (Only for Register) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input 
                      name="name" 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-sm font-medium" 
                      placeholder="John Doe" 
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input 
                    name="email" 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-sm font-medium" 
                    placeholder="you@example.com" 
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input 
                    name="password" 
                    type="password" 
                    required 
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-sm font-medium" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>

              {/* Forgot Password (Only for Login) */}
              {isLogin && (
                <div className="flex items-center justify-end">
                  <button type="button" className="text-sm font-bold text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button 
                  type="submit" 
                  disabled={isLoggingIn || isRegistering}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
                >
                  {(isLoggingIn || isRegistering) ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                  ) : (
                    isLogin ? 'Sign in securely' : 'Create Account'
                  )}
                </button>
              </div>
            </motion.form>
          </AnimatePresence>

          {/* Value Props for Registering */}
          {!isLogin && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> End-to-end Encrypted
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <Activity className="w-4 h-4 text-blue-500" /> Personalized AI
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Toggle Login/Register */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 font-medium">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-blue-600 hover:text-blue-500 transition-colors"
            >
              {isLogin ? 'Register now' : 'Sign in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}