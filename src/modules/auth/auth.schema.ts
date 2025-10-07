import { z } from 'zod';

// Schema for user registration
export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Schema for user login
export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;