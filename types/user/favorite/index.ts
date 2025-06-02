import type { FavoriteWithRecommendation } from '~/types/db';
import type { RecommendResponse } from '~/types/recommend';

/**
 * お気に入りとおすすめコーヒーを結合した型
 * おすすめコーヒーのデータを RecommendResponse 型にパースしたもの
 */
export type FavoriteWithParsedRecommendation = Omit<
  FavoriteWithRecommendation,
  'recommendation'
> & {
  recommendation: RecommendResponse;
};
