"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/forms";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-store";
import { Button, Container, TextField, Typography, Stack, Alert } from "@mui/material";
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
  const setAuth = useAuth((s) => s.setAuth);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const res = await api.accounts.post("/accounts/account/login", data);
      const token = (res.data as { jwt?: string; token?: string }).jwt ?? res.data.token;
      const profile = await api.accounts.get(
        "/accounts/account/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAuth(token, profile.data.username);
      router.replace("/dashboard");
    } catch (e: unknown) {
      const err = e as AxiosError<{ message?: string }>;
      setError(err.response?.data?.message ?? "Login failed");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>Sign in</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField label="Username" {...register("username")} error={!!errors.username} helperText={errors.username?.message} />
          <TextField label="Password" type="password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
          <Button type="submit" variant="contained">Sign in</Button>
        </Stack>
      </form>
    </Container>
  );
}
