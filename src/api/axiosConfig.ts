import axios from "axios";

export const backendApiUrl = import.meta.env.VITE_BACKEND_URL;
console.log("backendApiUrl: ", backendApiUrl);

export const roomInstance = axios.create({
  baseURL: `${backendApiUrl}/room`,
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});

export const commandInstance = axios.create({
  baseURL: `${backendApiUrl}/command`,
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});

export const commandByIdInstance = (id: string) =>
  axios.create({
    baseURL: `${backendApiUrl}/command/${id}`,
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  });
