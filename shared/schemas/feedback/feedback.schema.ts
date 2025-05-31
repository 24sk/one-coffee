import { z } from 'zod';
import { recommendResponseSchema } from '../recommend';

export const feedbackRequestSchema = z.object({
  recommendation: recommendResponseSchema,
    rating: z.number().int().min(1).max(3), // 👍=3 😐=2 👎=1
    moods: z.array(z.string()),
    freeText: z.string().optional(),
  });

export type FeedbackRequest = z.infer<typeof feedbackRequestSchema>;
