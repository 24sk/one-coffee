export type { Database } from '~/supabase/schema';
import type { Database } from '~/supabase/schema';

/** テーブル名 */
export type Tables = Database['public']['Tables'];

/** テーブルのレコード */
export type TableRow<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

/** テーブルの挿入レコード */
export type TableInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

/** テーブルの更新レコード */
export type TableUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

export * from './user_feedback';
export * from './user_favorites';
