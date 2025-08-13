"use client";
import useSWR from "swr";
import { api } from "./api";

const fetcher = (url: string) => api.get(url).then(r => r.data);
export function useFetch<T = any>(url: string | null) {
  return useSWR<T>(url, (u) => fetcher(u));
}
