import axios from "axios";
// import { getCookies } from "cookies-next";
import { getCookie } from "cookies-next/client";
import { getTokenFromCookies } from "./cookieServer";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(async (config) => {
  let token: string | undefined;
  if (typeof window === "undefined") {
    const tokenFromServer = await getTokenFromCookies();
    token = tokenFromServer;
  } else {
    token = getCookie("token") as string;
  }
  //  token = typeof window !== "undefined" ? getCookie("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
