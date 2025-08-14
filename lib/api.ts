"use client";

import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import { useAuth } from "./auth-store";

function makeClient(baseURL?: string): AxiosInstance {
  const instance = axios.create({ baseURL });

  instance.interceptors.request.use((config) => {
    const { token } = useAuth.getState();

    // Ensure headers exists with the right type
    config.headers = (config.headers || {}) as AxiosRequestHeaders;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
}

export const api = {
  accounts:      makeClient(process.env.NEXT_PUBLIC_ACCOUNTS_API_BASE),
  leagues:       makeClient(process.env.NEXT_PUBLIC_LEAGUES_API_BASE),
  guesses:       makeClient(process.env.NEXT_PUBLIC_GUESSES_API_BASE),
  notifications: makeClient(process.env.NEXT_PUBLIC_NOTIFICATIONS_API_BASE),
};
