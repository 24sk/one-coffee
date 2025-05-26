import type { Database } from '~/supabase/schema';
export type { Database };

/** ユーザーのフィードバックを挿入するための型 */
export type InsertUserFeedback = Database['public']['Tables']['user_feedbacks']['Insert'];
