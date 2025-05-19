import { moods } from '~/server/data';
import { moodListSchema } from '~/shared/schemas';
import type { MoodList } from '~/types';

export default defineEventHandler((): Promise<MoodList> => {
  try {
    return Promise.resolve(moodListSchema.parse(moods));
  } catch (error) {
    console.error('気分スキーマ検証エラー:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Invalid mood schema',
    });
  }
});
