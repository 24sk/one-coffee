import { defineEventHandler, readBody } from 'h3';
import { recommendResponseSchema } from '~/shared/schemas';
import { createRepositories } from '~/utils/repository.factory';

/**
 * おすすめコーヒーを保存する
 * @param event イベントオブジェクト
 * @returns 成功メッセージ
 */
export default defineEventHandler(async (event) => {
  const {
    id,
    coffeeName,
    subtitle,
    roast,
    roastLevel,
    acidity,
    body: bodyValue,
    beans,
    toppings,
    comment,
  } = await readValidatedBody(event, recommendResponseSchema.parse);

  const { recommendationRepository } = await createRepositories(event);

  const data = {
    coffee_name: coffeeName,
    subtitle,
    roast,
    roast_level: roastLevel,
    acidity,
    body: bodyValue,
    beans_summary: JSON.stringify(beans),
    toppings_summary: JSON.stringify(toppings),
    comment,
  };

  console.log('data', data);

  await recommendationRepository.update(id!, data);

  return { success: true };
});
