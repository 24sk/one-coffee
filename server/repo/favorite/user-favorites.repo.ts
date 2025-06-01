import { Tables, UserFavoriteKeys } from '~/types';
import { BaseRepository } from '../base.repo';

/** ユーザーのお気に入りを管理するリポジト */
export class UserFavoritesRepository extends BaseRepository<'user_favorites'> {
  protected readonly tableName = 'user_favorites';

  /**
   * お気に入りを取得する
   * @param recommendationId コーヒーID
   */
  /**
   * recommendation_id + user_id でお気に入りを検索
   */
  async findByRecommendationId(
    userFavoriteKeys: UserFavoriteKeys
  ): Promise<Tables['user_favorites']['Row'] | null> {
    const { recommendation_id, user_id } = userFavoriteKeys;
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('recommendation_id', recommendation_id)
      .eq('user_id', user_id)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to find favorite: ${error.message}`);
    }

    return data;
  }

  /**
   * お気に入りを追加する
   * @param data お気に入りデータ
   */
  async insert(data: Tables['user_favorites']['Insert']) {
    await super.insert(data);
  }

  /**
   * recommendation_id + user_id によるお気に入りの削除
   */
  async deleteByRecommendationIdAndUserId(userFavoriteKeys: UserFavoriteKeys) {
    const { recommendation_id, user_id } = userFavoriteKeys;
    const { error } = await this.client
      .from(this.tableName)
      .delete()
      .eq('recommendation_id', recommendation_id)
      .eq('user_id', user_id);

    if (error) {
      throw new Error(`Failed to delete favorite: ${error.message}`);
    }
  }
}
