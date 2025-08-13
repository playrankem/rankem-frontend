"use client";
import axios from "axios";
import { useAuth } from "./auth-store";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ACCOUNTS_API_ENDPOINT,
});

api.interceptors.request.use((config) => {
  const { token } = useAuth.getState();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
