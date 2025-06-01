import { serverSupabaseUser } from '#supabase/server';
import { favoriteRequestSchema } from '~/shared/schemas/favorite/favorite.schema';
import { createRepositories } from '~/utils/repository.factory';

/**
 * お気に入りを追加する
 *
 * @param event イベントオブジェクト
 * @returns 成功メッセージ
 */
export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }
  const { recommendation, moods, freeText } = await readValidatedBody(
    event,
    favoriteRequestSchema.parse
  );

  const { recommendationRepository, userFavoritesRepository } = await createRepositories(event);

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

  await userFavoritesRepository.insert({
    user_id: user.id,
    recommendation_id: recommendation.id!,
    moods: moods,
    free_text: freeText,
  });

  return { success: true };
});
