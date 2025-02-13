import axios from 'axios';

export const backendApiUrl = import.meta.env.VITE_BACKEND_URL;

console.log(backendApiUrl);

export const authInstance = axios.create({
  baseURL: `${backendApiUrl}/auth`,
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json'
  },
});