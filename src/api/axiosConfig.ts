import axios from 'axios';

export const backendApiUrl = import.meta.env.VITE_BACKEND_URL;

console.log(backendApiUrl);

export const roomInstance = axios.create({
  baseURL: `${backendApiUrl}/room`,
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json'
  },
});