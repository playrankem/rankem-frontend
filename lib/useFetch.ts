"use client";
import useSWR from "swr";
import { api } from "./api";

export function useFetch<T = unknown>(service: keyof typeof api, url: string | null) {
  return useSWR<T>(
    url ? [service, url] as const : null,
    ([svc, u]: [keyof typeof api, string]) =>
      api[svc].get(u).then((r) => r.data)
  );
}
