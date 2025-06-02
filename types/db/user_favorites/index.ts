import type { TableRow } from '~/types';

export interface UserFavoriteKeys
  extends Pick<TableRow<'user_favorites'>, 'user_id' | 'recommendation_id'> {}

/** お気に入りとおすすめコーヒーを結合した型 */
export type FavoriteWithRecommendation = TableRow<'user_favorites'> & {
  recommendation: TableRow<'recommendation_results'>;
};
