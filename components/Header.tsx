"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { useAuth } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const { username, clear } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleClose();
    clear();
    router.replace("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>RankEm</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button color="inherit" component={Link} href="/">Home</Button>
          {username ? (
            <>
              <Button color="inherit" component={Link} href="/dashboard">Dashboard</Button>

              {/* Username trigger styled as a Button to match header */}
              <Button
                color="inherit"
                onClick={handleOpen}
                endIcon={<KeyboardArrowDownIcon />}
                startIcon={
                  <Avatar sx={{ width: 24, height: 24 }}>
                    {username.charAt(0).toUpperCase()}
                  </Avatar>
                }
                sx={{ textTransform: "none", px: 1 }}
                aria-controls={open ? "user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                {username}
              </Button>

              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                {/* Logout styled as a Button for visual consistency */}
                <MenuItem disableRipple sx={{ p: 0 }}>
                  <Button
                    onClick={handleLogout}
                    color="inherit"
                    startIcon={<LogoutIcon />}
                    fullWidth
                    sx={{ justifyContent: "flex-start", py: 1.25, px: 2, textTransform: "none" }}
                  >
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
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
