"use client";
import AuthGuard from "@/components/AuthGuard";
import { useParams } from "next/navigation";
import { Container, Typography } from "@mui/material";
import { useFetch } from "@/lib/useFetch";

export default function LeaguePage() {
  const { id } = useParams<{ id: string }>();

  // Flesh out with your actual endpoints if you add them:
  const { data: league } = useFetch<any>("leagues", `/${id}`); // e.g., GET /leagues/:id
  // const { data: weekly } = useFetch<any>("guesses", `/${id}/leaderboard/weekly`);
  // const { data: yearly } = useFetch<any>("guesses", `/${id}/leaderboard/yearly`);

  return (
    <AuthGuard>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">{league?.name ?? `League ${id}`}</Typography>
      </Container>
    </AuthGuard>
  );
}
