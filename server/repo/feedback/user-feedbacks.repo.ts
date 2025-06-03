import { InsertUserFeedback } from '~/types/db';
import { BaseRepository } from '../base.repo';

export class UserFeedbacksRepository extends BaseRepository<'user_feedbacks'> {
  protected readonly tableName = 'user_feedbacks';

  /** フィードバックを登録する */
  async insert(data: InsertUserFeedback): Promise<void> {
    await super.insert(data);
  }
}
