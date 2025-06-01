import { BaseRepository } from '../base.repo';

export class UserFeedbacksRepository extends BaseRepository<'user_feedbacks'> {
  protected readonly tableName = 'user_feedbacks';
}
