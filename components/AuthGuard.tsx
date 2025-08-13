"use client";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth-store";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = useAuth((s) => s.token);
  const router = useRouter();
  useEffect(() => { if (!token) router.replace("/login"); }, [token, router]);
  if (!token) return null;
  return <>{children}</>;
}
