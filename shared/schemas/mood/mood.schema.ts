import { z } from 'zod';

export const moodSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

export const moodListSchema = z.array(moodSchema);

export type Mood = z.infer<typeof moodSchema>;
export type MoodList = z.infer<typeof moodListSchema>;
