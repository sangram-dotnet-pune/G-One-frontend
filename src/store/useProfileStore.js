import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useProfileStore = create((set) => ({
  // --- STATE ---
  profile: null,
  isLoading: false,
  isUpdating: false,

  // --- ACTIONS ---
  fetchProfile: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/profile');
      set({ profile: res.data.profile });
    } catch (error) {
      console.error('[Profile Fetch Error]:', error);
      toast.error('Failed to load medical profile.');
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (formData) => {
    set({ isUpdating: true });
    try {
      const res = await axiosInstance.put('/profile', formData);
      set({ profile: res.data.profile });
      toast.success('Profile securely updated! AI Context synced.');
    } catch (error) {
      console.error('[Profile Update Error]:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile.');
    } finally {
      set({ isUpdating: false });
    }
  }
}));