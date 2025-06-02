import { serverSupabaseUser } from '#supabase/server';
import { FavoriteWithParsedRecommendation } from '~/types';
import { toRecommendResponse } from '~/utils/convert';
import { createRepositories } from '~/utils/repository.factory';

/**
 * お気に入り取得 API
 * GET /api/favorite/[recommendationId]
 */
export default defineEventHandler(
  async (event): Promise<FavoriteWithParsedRecommendation | null> => {
    const user = await serverSupabaseUser(event);
    if (!user) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }

    const { recommendationId } = event.context.params!;
    if (!recommendationId) {
      throw createError({ statusCode: 400, statusMessage: 'Missing recommendationId' });
    }

    const { userFavoritesRepository } = await createRepositories(event);

    const favorite = await userFavoritesRepository.findByRecommendationId({
      recommendation_id: recommendationId,
      user_id: user.id,
    });

    if (!favorite) return null;

    return {
      ...favorite,
      recommendation: toRecommendResponse(favorite.recommendation),
    };
  }
);
