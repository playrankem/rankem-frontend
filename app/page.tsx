// app/page.tsx
"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-store";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Button,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupIcon from "@mui/icons-material/Group";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SecurityIcon from "@mui/icons-material/Security";
import BoltIcon from "@mui/icons-material/Bolt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Home() {
  const token = useAuth((s) => s.token);
  const router = useRouter();

  const ctaHref = useMemo(() => (token ? "/dashboard" : "/register"), [token]);
  const ctaLabel = token ? "Go to Dashboard" : "Get Started";

  return (
    <Container sx={{padding: 4}}>
      {/* Intro */}
      <Box sx={{ textAlign: "start" }}>
        <Typography variant="h3" gutterBottom>
          Welcome to RankEm
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          RankEm is my open‑source fantasy app where users predict AP Top 25 polls
          before they drop and compete with friends in private leagues.
          The app is currently in early development with a focus on the CFB AP Poll. However, I plan to expand to other sports in the future.
          Additionally, I plan to add more features such as gathering personal polls from users to create a sort of &lsquo;People&apos;s Top 25&rsquo and more.
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }} useFlexGap flexWrap="wrap">
          <Button
            variant="contained"
            size="large"
            color="primary"
            component={Link}
            href={ctaHref}
          >
            {ctaLabel}
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<GitHubIcon />}
            component={Link}
            href="https://github.com/playrankem"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </Button>
        </Stack>
      </Box>

      {/* Quick badges */}
      <Stack direction="row" spacing={2} sx={{ mt: 3 }} useFlexGap flexWrap="wrap">
        <Chip label="Open Source" size="small" />
        <Chip label="Free to Play" size="small" />
        <Chip label="AP Polls" size="small" />
      </Stack>

      <Divider sx={{ my: 5 }} />

      {/* How it works */}
      <Grid container spacing={3}>
        <Grid size={{xs: 12, md: 6}}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                How it works:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Create or join a league"
                    secondary="After creating an account, you can either create or join a league. Commissioners can invite players by username where they are shown in player notifications."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmojiEventsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Submit your Top 25 guess"
                    secondary="Pick 1–25 for the week and lock it in before the official poll releases."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <QueryStatsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Score and leaderboards"
                    secondary="We score guesses when the real poll is live and update weekly and seasonal standings."
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Scoring */}
        <Grid size={{xs: 12, md: 6}}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Scoring
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                Position‑based points with future plans to add other scoring options:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <BoltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Exact match = 3 points" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BoltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Off by 1 = 2 points" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BoltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Off by 2 = 1 point" />
                </ListItem>
              </List>
              <Typography variant="body2" color="text.secondary">
                Totals roll up to weekly and seasonal leaderboards.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* FAQ */}
      <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
        FAQ
      </Typography>
      <Stack>
        <Accordion disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>When are guesses scored?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              After the official AP poll is available for that week. Right now, I have to manually trigger scoring, but I plan to automate this in the future.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Can I play in multiple leagues?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              Yes. Submit one guess per league per week. Each league tracks its own standings.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Is RankEm free?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              Yes. The project is community‑driven. Contributions are welcome.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How is my data stored and secured?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              Right now, passwords are sent to the server via HTTPS before being salted and hashed using bcrypt and then stored. Besides your username, no other personal data is collected.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>

      {/* Final CTA */}
      <Divider sx={{ my: 5 }} />
      <Box>
        <Typography variant="h5" gutterBottom>
          Ready to play?
        </Typography>
        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
          <Button variant="contained" component={Link} href={ctaHref}>
            {ctaLabel}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
