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

export const computerInstance = axios.create({
  baseURL: `${backendApiUrl}/computer`,
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

export const wolInstance = axios.create({
  baseURL: `${backendApiUrl}/wol`,
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});