"use client";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/lib/auth-store";
import { useRouter } from "next/navigation";

export default function Header() {
  const { username, clear } = useAuth();
  const router = useRouter();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>RankEm</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          {username ? (
            <>
              <Typography>{username}</Typography>
              <Button color="inherit" onClick={() => { clear(); router.replace("/login"); }}>Logout</Button>
              <Button color="inherit" component={Link} href="/dashboard">Dashboard</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} href="/login">Login</Button>
              <Button color="inherit" component={Link} href="/register">Register</Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
