import { serverSupabaseUser } from '#supabase/server';
import { FavoriteWithParsedRecommendation } from '~/types';
import { toRecommendResponse } from '~/utils/convert';
import { createRepositories } from '~/utils/repository.factory';

/**
 * お気に入り一覧取得 API
 * GET /api/favorite
 */
export default defineEventHandler(async (event): Promise<FavoriteWithParsedRecommendation[]> => {
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const { userFavoritesRepository } = await createRepositories(event);
  const favorites = await userFavoritesRepository.findWithRecommendationByUserId(user.id);

  return favorites.map((favorite) => ({
    ...favorite,
    recommendation: toRecommendResponse(favorite.recommendation),
  }));
});
