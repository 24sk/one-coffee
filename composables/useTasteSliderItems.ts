import type { BaseSliderItem } from '~/types';
import type { RecommendResponse } from '~/types/recommend';

export const useTasteSliderItems = (
  recommendation: ComputedRef<RecommendResponse | null>
): ComputedRef<BaseSliderItem[]> => {

  return computed(() => [
    {
      label: 'ロースト',
      value: recommendation.value?.roastLevel ?? 1,
      minLabel: 'LIGHT',
      maxLabel: 'DARK',
    },
    {
      label: '酸味',
      value: recommendation.value?.acidity ?? 1,
      minLabel: 'LOW',
      maxLabel: 'HIGH',
    },
    {
      label: 'コク',
      value: recommendation.value?.body ?? 1,
      minLabel: 'LIGHT',
      maxLabel: 'FULL',
    },
  ]);
}
