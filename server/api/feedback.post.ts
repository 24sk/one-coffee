import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { feedbackRequestSchema } from '~/shared/schemas/feedback';
import { randomUUID } from 'crypto';
import type { Database } from '~/supabase/schema';
import type { InsertUserFeedback } from '~/types/db';

/**
 * フィードバックを保存する
 * 
 * @param event イベントオブジェクト
 * @returns 成功メッセージ
 */
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const body = await readValidatedBody(event, feedbackRequestSchema.parse);


  // おすすめコーヒー保存
  if (body.recommendation) {
    const r = body.recommendation;
    const { error: insertError } = await client
      .from('recommendation_results')
      .insert({
        id: r.id ?? randomUUID(),
        coffee_name: r.coffeeName,
        subtitle: r.subtitle,
        roast: r.roast,
        roast_level: r.roastLevel,
        acidity: r.acidity,
        body: r.body,
        beans_summary: r.beans.map((b) => `${b.origin}${b.ratio}`).join(', '),
        toppings_summary: r.toppings.join(', '),
        comment: r.comment,
      });

    if (insertError) {
      throw createError({
        statusCode: 500,
        statusMessage: `recommendation_results登録失敗: ${insertError.message}`,
      });
    }
  }

  // フィードバック保存
  const feedback: InsertUserFeedback = {
    user_id: user.id,
    recommendation_id: body.recommendation?.id,
    moods: body.moods,
    free_text: body.freeText ?? '',
    rating: body.rating,
  };

  const { error } = await client.from('user_feedbacks').insert(feedback);

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `user_feedbacks登録失敗: ${error.message}`,
    });
  }

  return { success: true };
});
