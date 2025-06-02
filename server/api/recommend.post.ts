import { recommendRequestSchema, recommendResponseSchema } from '~/shared/schemas/recommend';
import type { RecommendRequest, RecommendResponse } from '~/types/recommend';
import { buildPrompt } from '~/server/util';
import { randomUUID } from 'crypto';
import OpenAI from 'openai';
import { recommend } from '../data/recommend';

const openai = new OpenAI({
  apiKey: useRuntimeConfig().openai.apiKey,
});

/**
 * おすすめのコーヒー提案を取得する
 * @param event
 * @returns おすすめコーヒー情報
 */
export default defineEventHandler(async (event): Promise<RecommendResponse> => {
  const body = await readValidatedBody<RecommendRequest>(event, recommendRequestSchema.parse);

  // 開発環境ではテストデータを返す
  // if (process.env.NODE_ENV === 'development') return recommend;

  const recommendationId = randomUUID();

  const prompt = buildPrompt(body);

  const chat = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
  });

  const content = chat.choices[0]?.message?.content?.trim();
  if (!content) {
    throw createError({
      statusCode: 500,
      message: 'OpenAIの応答が空でした',
    });
  }

  let json: unknown;
  try {
    json = JSON.parse(content);
  } catch (err) {
    throw createError({
      statusCode: 500,
      message: 'OpenAIからのJSON解析に失敗しました',
    });
  }
  const result = recommendResponseSchema.parse(json);

  return {
    ...result,
    id: recommendationId,
  };
});
