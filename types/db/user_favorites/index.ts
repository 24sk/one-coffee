import type { TableRow } from '~/types';

export interface UserFavoriteKeys
  extends Pick<TableRow<'user_favorites'>, 'user_id' | 'recommendation_id'> {}
