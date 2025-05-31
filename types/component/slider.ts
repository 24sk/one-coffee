/** スライダー項目の基底型 */
export interface BaseSliderItem {
  /** ラベル */
  label: string;
  /** 値 */
  value: number;
  /** 最小値のラベル名 */
  minLabel: string;
  /** 最大値のラベル名 */
  maxLabel: string;
}
