import type { FavoriteDeleteRequest, FavoriteRequest } from '~/types/favorite';

interface FavoriteResponse {
  id: string;
  user_id: string;
  recommendation_id: string;
  moods?: string[];
  free_text?: string;
  created_at: string;
}

export const useFavorite = () => {
  /** お気に入りを追加する */
  const addFavorite = async (favoriteRequest: FavoriteRequest) => {
    try {
      const res = await $fetch<{ success: boolean }>('/api/favorite', {
        method: 'POST',
        body: favoriteRequest,
      });
      return res;
    } catch (err: any) {
      throw new Error(err?.data?.statusMessage);
    }
  };

  /** お気に入りを削除する */
  const removeFavorite = async (favoriteDeleteRequest: FavoriteDeleteRequest) => {
    try {
      await $fetch('/api/favorite/delete', {
        method: 'POST',
        body: favoriteDeleteRequest,
      });
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: 'お気に入り削除に失敗しました',
        cause: error,
      });
    }
  };

  /** お気に入りを取得する */
  const getFavorite = async (recommendationId: string) => {
    try {
      return await $fetch<FavoriteResponse | null>(`/api/favorite/${recommendationId}`);
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: 'お気に入り取得に失敗しました',
        cause: error,
      });
    }
  };

  /** お気に入り一覧を取得する */
  const listFavorites = async () => {
    try {
      return await $fetch<FavoriteResponse[]>('/api/favorite');
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: 'お気に入り一覧の取得に失敗しました',
        cause: error,
      });
    }
  };

  return {
    addFavorite,
    removeFavorite,
    getFavorite,
    listFavorites,
  };
};
