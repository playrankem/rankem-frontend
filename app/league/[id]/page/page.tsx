"use client";
import AuthGuard from "@/components/AuthGuard";
import { useParams } from "next/navigation";
import { Container, Typography } from "@mui/material";

export default function LeaguePage() {
  const { id } = useParams<{ id: string }>();
  return (
    <AuthGuard>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">League {id}</Typography>
        {/* Add tabs for Submit Guess / Leaderboards later */}
      </Container>
    </AuthGuard>
  );
}
