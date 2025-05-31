import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import type { Database } from '~/supabase/schema';

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

(async () => {
  const { data, error } = await supabase
    .from('user_feedbacks')
    .select(`
      user_id,
      moods,
      free_text,
      rating,
      recommendation_results:recommendation_id (
        roast_level,
        acidity,
        body,
        beans_summary
      )
    `);

  if (error || !data) {
    console.error('Error fetching data:', error?.message);
    process.exit(1);
  }

  const rows = data.map((row) => {
    const userId = row.user_id ?? 'unknown_user';
    const moods = (row.moods || []).join(', ');
    const input = `${moods} ${row.free_text || ''}`.trim();

    const recommendation = (row.recommendation_results ?? {}) as {
      roast_level?: number | null;
      acidity?: number | null;
      body?: number | null;
      beans_summary?: string | null;
    };

    const roast_level = recommendation.roast_level ?? '';
    const acidity = recommendation.acidity ?? '';
    const body = recommendation.body ?? '';
    const beans_summary = recommendation.beans_summary ?? '';

    return {
      user_id: userId,
      mood_input: input,
      roast_level_label: `roast_level_${roast_level}`,
      acidity_label: `acidity_${acidity}`,
      body_label: `body_${body}`,
      beans_label: beans_summary.replace(/[, ]+/g, '_'),
    };
  });

  const csv = [
    'user_id,mood_input,roast_level_label,acidity_label,body_label,beans_label',
    ...rows.map(
      (r) =>
        `"${r.user_id}","${r.mood_input}","${r.roast_level_label}","${r.acidity_label}","${r.body_label}","${r.beans_label}"`
    ),
  ].join('\n');

  fs.writeFileSync(path.join(__dirname, 'feedback_data.csv'), csv);
  console.log('✅ CSV exported to feedback_data.csv');
})();
