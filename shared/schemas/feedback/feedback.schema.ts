import { z } from 'zod';

export const feedbackRequestSchema = z.object({
    recommendationId: z.string().uuid().optional(), // 推奨結果ID（任意）
    rating: z.number().int().min(1).max(3), // 👍=3 😐=2 👎=1
    moods: z.array(z.string()),
    freeText: z.string().optional(),
  });

export type FeedbackRequest = z.infer<typeof feedbackRequestSchema>;
