import { z } from 'zod';
import { Gender } from '@prisma/client';

export const updateInterestsValidation = z.object({
  body: z.object({
    userId: z.uuid(),
    interests: z.string(),
  })
});

export const setLastRoomValidation = z.object({
  body: z.object({
    userId: z.uuid(),
    roomId: z.string(),
  })
});

export const clearLastRoomValidation = z.object({
  body: z.object({
    userId: z.uuid(),
  })
});

export const setNameValidation = z.object({
  body: z.object({
    userId: z.uuid(),
    name: z.string(),
  })
});

export const setGenderValidation = z.object({
  body: z.object({
    userId: z.uuid(),
    gender: z.enum(Gender),
  })
});
