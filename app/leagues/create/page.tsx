"use client";
import AuthGuard from "@/components/AuthGuard";
import { useForm } from "react-hook-form";
import { Button, Container, Stack, TextField, Typography, Alert } from "@mui/material";
import { api } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateLeaguePage() {
  const { register, handleSubmit } = useForm<{ name: string }>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: { name: string }) => {
    try {
      const res = await api.post("/leagues", data);
      router.replace(`/league/${res.data.id}`);
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Failed to create league");
    }
  };

  return (
    <AuthGuard>
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>Create a League</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField label="League name" {...register("name", { required: true })} />
            <Button type="submit" variant="contained">Create</Button>
          </Stack>
        </form>
      </Container>
    </AuthGuard>
  );
}
