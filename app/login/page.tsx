"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/forms";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-store";
import {
  Button,
  Container,
  TextField,
  Typography,
  Stack,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import type { AxiosError } from "axios";

type FormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setAuth = useAuth((s) => s.setAuth);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setError(null);
    setLoading(true);
    try {
      const res = await api.accounts.post("/accounts/account/login", data);
      const token = (res.data as { jwt?: string; token?: string }).jwt ?? res.data.token;
      const profile = await api.accounts.get("/accounts/account/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAuth(token, profile.data.username);
      router.replace("/dashboard"); // keep spinner until navigation
    } catch (e: unknown) {
      const err = e as AxiosError<{ message?: string }>;
      setError(err.response?.data?.message ?? "Login failed");
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>Sign in</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)} aria-busy={loading}>
        <Stack spacing={2}>
          <TextField
            label="Username"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
            disabled={loading}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={loading}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} /> : null}
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
