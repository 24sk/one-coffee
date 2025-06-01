import type { Database } from '.';

/** ユーザーのフィードバックを挿入するための型 */
export type InsertUserFeedback = Database['public']['Tables']['user_feedbacks']['Insert'];
