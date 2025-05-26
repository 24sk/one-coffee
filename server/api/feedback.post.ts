import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { feedbackRequestSchema } from '~/shared/schemas/feedback';
import type { Database } from '~/supabase/schema';
import type { InsertUserFeedback } from '~/types/db';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const body = await readValidatedBody(event, feedbackRequestSchema.parse);

  const feedback: InsertUserFeedback = {
    user_id: user.id,
    recommendation_id: body.recommendationId ?? null,
    moods: body.moods,
    free_text: body.freeText ?? '',
    rating: body.rating,
    created_at: new Date().toISOString(),
  };

  const { error } = await client.from('user_feedbacks').insert(feedback);

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return { success: true };
});
