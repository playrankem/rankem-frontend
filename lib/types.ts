export type Profile = { username: string };
export type Notification = {
  id: string;               // UUID v4 string
  user_id: string;          // UUID or string user ID
  message: string;          // human-readable text
  timestamp: string;        // ISO timestamp string
  type: "INVITE" | "MESSAGE" | string; // 'GENERIC' fallback allowed
  league_id?: string | null; // optional; can be null
};
export type League = { id: string; name: string };
