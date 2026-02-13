import axios from "axios";
// import { getCookies } from "cookies-next";
import { getCookie, deleteCookie } from "cookies-next/client";
import { getTokenFromCookies } from "./cookieServer";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(async (config) => {
  let token: string | undefined;
  if (typeof window === "undefined") {
    // if api call from server side get token from request
    const tokenFromServer = await getTokenFromCookies();
    token = tokenFromServer;
  } else {
    //if api call from client side get token from browser apis
    token = getCookie("token") as string;
  }
  if (token && config.headers) {
    //if has token send it for every api call
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear authentication data
      if (typeof window !== "undefined") {
        // Clear token from cookies
        deleteCookie("token");
        // Clear user from localStorage
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);
