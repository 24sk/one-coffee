import type { H3Event } from 'h3';
import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '~/types';
import {
  RecommendationRepository,
  UserFavoritesRepository,
  UserFeedbacksRepository,
} from '~/server/repo';

/**
 * リポジトリを作成するファクトリークラス
 * @param event イベントオブジェクト
 * @returns リポジトリオブジェクト
 */
export const createRepositories = async (event: H3Event) => {
  const client = await serverSupabaseClient<Database>(event);

  return {
    recommendationRepository: new RecommendationRepository(client),
    userFavoritesRepository: new UserFavoritesRepository(client),
    userFeedbacksRepository: new UserFeedbacksRepository(client),
  };
};
