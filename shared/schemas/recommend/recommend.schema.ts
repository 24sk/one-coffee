import { z } from 'zod';

export const recommendRequestSchema = z.object({
  moods: z.array(z.string().min(1)).min(1).optional(),
  freeText: z.string().min(1).optional(),
});

export const recommendResponseSchema = z.object({
  coffeeName: z.string(),
  subtitle: z.string(),
  beans: z.array(
    z.object({
      origin: z.string(),
      ratio: z.number(),
    })
  ),
  roast: z.string(),
  roastLevel: z.number(),
  acidity: z.number(),
  body: z.number(),
  toppings: z.array(z.string()),
  comment: z.string(),
});

export type RecommendRequest = z.infer<typeof recommendRequestSchema>;
export type RecommendResponse = z.infer<typeof recommendResponseSchema>;
