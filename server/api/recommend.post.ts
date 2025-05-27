import { recommendRequestSchema, recommendResponseSchema } from '~/shared/schemas/recommend';
import type { RecommendRequest, RecommendResponseWithId } from '~/types/recommend';
import { buildPrompt } from '~/server/util';
import { randomUUID } from 'crypto';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: useRuntimeConfig().openai.apiKey,
});

/**
 * おすすめのコーヒー提案を取得する
 * @param event
 * @returns おすすめコーヒー情報
 */
export default defineEventHandler(async (event): Promise<RecommendResponseWithId> => {
  const body = await readValidatedBody<RecommendRequest>(event, recommendRequestSchema.parse);
  const recommendationId = randomUUID();

  const prompt = buildPrompt(body);

  const chat = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview', // 最新の function calling 対応モデル
    temperature: 0.5,
    messages: [
      { role: 'system', content: 'あなたはプロのバリスタです。お客様の気分・好み・自由なご要望を参考に、最適なコーヒーを提案し、JSON形式で返答してください。' },
      { role: 'user', content: prompt },
    ],
    tools: [
      {
        type: 'function',
        function: {
          name: 'recommendCoffee',
          description: 'ユーザーの気分に合ったコーヒーを提案する',
          parameters: {
            type: 'object',
            properties: {
              coffeeName: { type: 'string', minLength: 1 },
              subtitle: { type: 'string', minLength: 1 },
              imageUrl: { type: 'string' },
              roast: { type: 'string' },
              roastLevel: { type: 'integer', minimum: 1, maximum: 5 },
              acidity: { type: 'integer', minimum: 1, maximum: 5 },
              body: { type: 'integer', minimum: 1, maximum: 5 },
              beans: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    origin: { type: 'string' },
                    ratio: { type: 'number' },
                  },
                  required: ['origin', 'ratio'],
                },
              },
              toppings: {
                type: 'array',
                items: { type: 'string', minLength: 1 },
                minItems: 1,
              },
              comment: { type: 'string' },
            },
            required: [
              'coffeeName',
              'subtitle',
              'roast',
              'roastLevel',
              'acidity',
              'body',
              'beans',
              'toppings',
              'comment',
            ],
          },
        },
      },
    ],
    tool_choice: { type: 'function', function: { name: 'recommendCoffee' } },
  });

  const toolCall = chat.choices?.[0]?.message?.tool_calls?.[0];
  const args = toolCall?.function?.arguments;

  if (!args) {
    throw createError({ statusCode: 500, message: 'OpenAIのtool_callsの抽出に失敗しました。' });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(args);
  } catch {
    throw createError({
      statusCode: 500,
      message: 'tool_callsからのJSON解析に失敗しました',
    });
  }

  const result = recommendResponseSchema.parse(parsed);

  return {
    ...result,
    recommendationId,
  };
});
