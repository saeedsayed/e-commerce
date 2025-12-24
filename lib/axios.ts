import axios from "axios";
// import { getCookies } from "cookies-next";
import { getCookie } from "cookies-next/client";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? getCookie("token") : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
