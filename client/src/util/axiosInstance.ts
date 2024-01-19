import axios from "axios";



export const fileClient = axios.create({
  baseURL: `${import.meta.env.VITE_URL}`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});


export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});


export const authClient = axios.create({
  baseURL: `${import.meta.env.VITE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});


