// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-store";
import { Container, CircularProgress, Box } from "@mui/material";

export default function Home() {
  const token = useAuth((s) => s.token);
  const router = useRouter();

  useEffect(() => {
    router.replace(token ? "/dashboard" : "/login");
  }, [token, router]);

  return (
    <Container sx={{ mt: 8 }}>
      <Box display="flex" alignItems="center" gap={2}>
        <CircularProgress size={20} /> Redirecting…
      </Box>
    </Container>
  );
}
