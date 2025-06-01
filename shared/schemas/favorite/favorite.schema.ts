import { z } from 'zod';
import { recommendResponseSchema } from '../recommend';

export const favoriteRequestSchema = z.object({
  recommendation: recommendResponseSchema, // お気に入り登録対象のコーヒー情報
  moods: z.array(z.string()), // 登録時の気分（任意なら optional() へ）
  freeText: z.string().optional(), // 任意の自由入力（例：コメントなど）
});

export const favoriteDeleteRequestSchema = z.object({
  recommendationId: z.string().uuid(),
});

export type FavoriteRequest = z.infer<typeof favoriteRequestSchema>;
export type FavoriteDeleteRequest = z.infer<typeof favoriteDeleteRequestSchema>;
