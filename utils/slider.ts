/**
 * 数値を 1〜value の配列に変換する
 * 例: getStepValues(3) -> [1, 2, 3]
 */
export function getStepValues(value: number): number[] {
  return Array.from({ length: value }, (_, i) => i + 1);
}
