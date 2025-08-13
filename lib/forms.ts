import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6).max(100),
});

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export const guessSchema = z.object({
  picks: z.array(z.string().min(1)).length(25),
});
