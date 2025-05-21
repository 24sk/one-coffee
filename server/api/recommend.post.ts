import { buildPrompt } from '~/server/util';
import { recommendRequestSchema, recommendResponseSchema } from '~/shared/schemas/recommend';
import type { RecommendRequest } from '~/types/recommend';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: useRuntimeConfig().openai.apiKey,
});

/** コーヒーのおすすめを提案する */
export default defineEventHandler(async (event) => {
  const body = await readValidatedBody<RecommendRequest>(event, recommendRequestSchema.parse);
  const { moods } = body;

  // プロンプトを構築
  const prompt = buildPrompt(moods);

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

  // スキーマに沿って検証して返す
  return recommendResponseSchema.parse(json);
});
