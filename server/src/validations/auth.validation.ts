import { z } from 'zod';
import { Gender } from '@prisma/client';

export const registerValidation = z.object({
  body: z.object({
    username: z.string(),
    email: z.email(),
    gender: z.enum(Gender),
    password: z.string().min(8).max(20),
  }),
});

export const loginValidation = z.object({
  body: z.object({
    email: z.email(),
    password: z.string(),
  }),
});
