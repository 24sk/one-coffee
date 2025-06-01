import { serverSupabaseUser } from '#supabase/server';
import { favoriteDeleteRequestSchema } from '~/shared/schemas';
import { createRepositories } from '~/utils/repository.factory';

/**
 * お気に入りを削除する
 * @param event
 * @returns 成功メッセージ
 */
export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const { recommendationId } = await readValidatedBody(event, favoriteDeleteRequestSchema.parse);

  const { userFavoritesRepository } = await createRepositories(event);

  await userFavoritesRepository.delete(recommendationId);

  return { success: true };
});
