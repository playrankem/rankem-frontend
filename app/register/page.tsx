"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/forms";
import { api } from "@/lib/api";
import { Button, Container, TextField, Typography, Stack, Alert } from "@mui/material";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import type { AxiosError } from "axios";

type FormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(registerSchema) });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      await api.accounts.post("/accounts", data);
      router.replace("/login");
    } catch (e: unknown) {
      const err = e as AxiosError<{ message?: string }>;
      setError(err.response?.data?.message ?? "Registration failed");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>Create account</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField label="Username" {...register("username")} error={!!errors.username} helperText={errors.username?.message} />
          <TextField label="Password" type="password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
          <Button type="submit" variant="contained">Sign up</Button>
        </Stack>
      </form>
    </Container>
  );
}
