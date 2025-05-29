import { z } from 'zod';

export const recommendRequestSchema = z.object({
  moods: z.array(z.string().min(1)).min(1).optional(),
  freeText: z.string().optional(),
});

export const beanSchema = z.object({
  origin: z.string(),
  ratio: z.number().min(0).max(100)
});

export const recommendResponseSchema = z.object({
  coffeeName: z.string(),
  subtitle: z.string(),
  beans: z.array(beanSchema),
  roast: z.string(),
  roastLevel: z.number(),
  acidity: z.number(),
  body: z.number(),
  toppings: z.array(z.string()),
  comment: z.string(),
});

export type RecommendRequest = z.infer<typeof recommendRequestSchema>;
export type RecommendResponse = z.infer<typeof recommendResponseSchema>;
export type Bean = z.infer<typeof beanSchema>;
