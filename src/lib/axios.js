// Filename: src/lib/axios.js

import axios from 'axios';

// We create a custom Axios instance. 
// This saves us from typing the full URL and setting headers every single time we make an API call.
export const axiosInstance = axios.create({
  // In development, it points to our local Node server.
  // In production, you can set VITE_API_URL in your hosting platform (like Vercel).
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  
  // TOP-NOTCH SECURITY REQUIREMENT:
  // Since our backend issues JWTs inside HTTP-Only Cookies (not in the JSON body),
  // we MUST tell the browser to attach those cookies to every request. 
  // If this is false, the user will never stay logged in.
  withCredentials: true, 
});