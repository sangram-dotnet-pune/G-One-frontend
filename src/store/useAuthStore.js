// Filename: src/store/useAuthStore.js

import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast'; // For beautiful UI notifications

// Zustand is a lightweight, modern alternative to Redux.
// It allows any component in our app to access the user's data instantly.
export const useAuthStore = create((set) => ({
  // --- STATE VARIABLES ---
  authUser: null, // Holds the logged-in user's data. If null, they are a Guest.
  isCheckingAuth: true, // Used to show a loading spinner when the app first loads
  isLoggingIn: false, // Used to disable the Login button while loading
  isRegistering: false, // Used to disable the Register button while loading

  // --- ACTIONS (Functions to change the state) ---

  // 1. CHECK AUTH: Runs when the app first opens. 
  // Asks the backend: "Does this browser have a valid cookie?"
  checkAuth: async () => {
    try {
      // (Note: We haven't built the '/auth/me' route yet, but we will soon!)
      const res = await axiosInstance.get('/auth/me');
      set({ authUser: res.data.user });
    } catch (error) {
      // If it fails (no cookie, or expired), user is a guest.
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // 2. REGISTER
  register: async (formData) => {
    set({ isRegistering: true });
    try {
      const res = await axiosInstance.post('/auth/register', formData);
      set({ authUser: res.data.user });
      toast.success('Account created successfully! Welcome to G-ONE.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      set({ isRegistering: false });
    }
  },

  // 3. LOGIN
  login: async (formData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('/auth/login', formData);
      set({ authUser: res.data.user });
      toast.success(`Welcome back, ${res.data.user.name}!`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // 4. LOGOUT
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      toast.success('Logged out securely.');
    } catch (error) {
      toast.error('Failed to log out.');
    }
  },
}));