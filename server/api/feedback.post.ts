import { serverSupabaseUser } from '#supabase/server';
import { feedbackRequestSchema } from '~/shared/schemas/feedback';
import type { InsertUserFeedback } from '~/types/db';
import { createRepositories } from '~/utils/repository.factory';

/**
 * フィードバックを保存する
 *
 * @param event イベントオブジェクト
 * @returns 成功メッセージ
 */
export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const { recommendation, moods, freeText, rating } = await readValidatedBody(
    event,
    feedbackRequestSchema.parse
  );

  const { recommendationRepository, userFeedbacksRepository } = await createRepositories(event);

  await recommendationRepository.findOrInsert({
    id: recommendation.id!,
    coffee_name: recommendation.coffeeName,
    subtitle: recommendation.subtitle,
    roast: recommendation.roast,
    roast_level: recommendation.roastLevel,
    acidity: recommendation.acidity,
    body: recommendation.body,
    beans_summary: recommendation.beans.map((b) => `${b.origin}${b.ratio}`).join(', '),
    toppings_summary: recommendation.toppings.join(', '),
    comment: recommendation.comment,
  });

  // フィードバック保存
  const feedback: InsertUserFeedback = {
    user_id: user.id,
    recommendation_id: recommendation?.id,
    moods: moods,
    free_text: freeText ?? '',
    rating: rating,
  };

  await userFeedbacksRepository.insert(feedback);

  return { success: true };
});
