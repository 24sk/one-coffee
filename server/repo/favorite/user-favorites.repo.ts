import { Tables } from '~/types';
import { BaseRepository } from '../base.repo';

/** ユーザーのお気に入りを管理するリポジト */
export class UserFavoritesRepository extends BaseRepository<'user_favorites'> {
  protected readonly tableName = 'user_favorites';

  /**
   * お気に入りを追加する
   * @param data お気に入りデータ
   */
  async insert(data: Tables['user_favorites']['Insert']) {
    await super.insert(data);
  }

  /**
   * お気に入りを削除する
   * @param id お気に入りID
   */
  async delete(id: Tables['user_favorites']['Row']['id']) {
    await super.delete(id);
  }
}
