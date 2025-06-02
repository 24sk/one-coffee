import { recommendResponseSchema } from '~/shared/schemas';
import type { RecommendResponse, TableRow } from '~/types';

/**
 * Supabaseのrecommendation_results行をUI用のRecommendResponseに変換する
 */
export function toRecommendResponse(row: TableRow<'recommendation_results'>): RecommendResponse {
  return recommendResponseSchema.parse({
    id: row.id ?? undefined,
    coffeeName: row.coffee_name,
    subtitle: row.subtitle,
    roast: row.roast,
    roastLevel: row.roast_level,
    acidity: row.acidity,
    body: row.body,
    comment: row.comment,
    beans: safeJsonBeansArray(row.beans_summary),
    toppings: safeJsonStringArray(row.toppings_summary),
  });
}

/**
 * toppings_summary を安全に string[] に変換する
 */
function safeJsonStringArray(input: string | null | undefined): string[] {
  if (!input) return [];

  try {
    const parsed = JSON.parse(input);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return input
      .split(/[,、]\s*/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
}

function safeJsonBeansArray(input: string | null | undefined): { origin: string; ratio: number }[] {
  if (!input) return [];

  try {
    const parsed = JSON.parse(input);
    if (Array.isArray(parsed)) {
      // 正しい形式: [{ origin, ratio }]
      if (parsed.every((v) => typeof v === 'object' && 'origin' in v && 'ratio' in v)) {
        return parsed;
      }
      // 文字列配列: ["コロンビア70", "ブラジル30"]
      if (parsed.every((v) => typeof v === 'string')) {
        return parsed.map(parseOriginRatioFromString);
      }
    }
  } catch {
    // カンマ区切り文字列 → 配列にして変換
    return input
      .split(/[,、]\s*/)
      .map((s) => parseOriginRatioFromString(s.trim()))
      .filter((b) => b.origin);
  }

  return [];
}

/**
 * 例: "コロンビア70" → { origin: "コロンビア", ratio: 70 }
 *     "ブラジル"     → { origin: "ブラジル", ratio: 0 }
 */
function parseOriginRatioFromString(str: string): { origin: string; ratio: number } {
  const match = str.match(/^(.+?)(\d{1,3})$/); // 最後の数字を ratio として切り出す
  if (match) {
    return {
      origin: match[1].trim(),
      ratio: parseInt(match[2], 10),
    };
  }
  return {
    origin: str.trim(),
    ratio: 0,
  };
}
