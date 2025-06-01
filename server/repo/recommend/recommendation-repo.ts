import { Tables } from '~/types';
import { BaseRepository } from '../base.repo';

/** おすすめコーヒーを管理するリポジトリ */
export class RecommendationRepository extends BaseRepository<'recommendation_results', 'id'> {
  protected readonly tableName = 'recommendation_results';

  /**
   * おすすめコーヒーを保存する
   * @param data おすすめコーヒーのデータ
   */
  async findOrInsert(data: Tables['recommendation_results']['Insert']) {
    const existing = await super.findById(data.id!);
    if (!existing) await super.insert(data);
  }
}
