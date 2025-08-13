"use client";
import AuthGuard from "@/components/AuthGuard";
import { useFetch } from "@/lib/useFetch";
import { api } from "@/lib/api";
import { Button, Card, CardContent, Container, Grid, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import Link from "next/link";
import type { Profile, Notification, League } from "@/lib/types";

export default function Dashboard() {
  const { data: profile } = useFetch<Profile>("/accounts/account/profile");
  const { data: notifications, mutate: refetchNotifs } = useFetch<Notification[]>("/notifications");
  const { data: leagues } = useFetch<League[]>("/leagues/mine"); // add this API if missing

  const acceptInvite = async (id: string) => { await api.post(`/notifications/${id}/accept`); await refetchNotifs(); };
  const deleteNotif  = async (id: string) => { await api.delete(`/notifications/${id}`); await refetchNotifs(); };

  return (
    <AuthGuard>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Welcome{profile?.username ? `, ${profile.username}` : ""}</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card><CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">My Leagues</Typography>
                <Button component={Link} href="/leagues/create" variant="contained">Create League</Button>
              </Stack>
              <List>
                {(leagues ?? []).map((l) => (
                  <ListItem key={l.id} component={Link} href={`/league/${l.id}`}><ListItemText primary={l.name} /></ListItem>
                ))}
              </List>
            </CardContent></Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card><CardContent>
              <Typography variant="h6" mb={2}>Notifications</Typography>
              <List>
                {(notifications ?? []).map((n) => (
                  <ListItem key={n.id}
                    secondaryAction={
                      <Stack direction="row" spacing={1}>
                        {n.type === "INVITE" && <Button size="small" onClick={() => acceptInvite(n.id)}>Accept</Button>}
                        <Button size="small" color="inherit" onClick={() => deleteNotif(n.id)}>Dismiss</Button>
                      </Stack>
                    }>
                    <ListItemText primary={n.message} />
                  </ListItem>
                ))}
              </List>
            </CardContent></Card>
          </Grid>
        </Grid>
      </Container>
    </AuthGuard>
  );
}
