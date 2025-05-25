<script setup lang="ts">
import type { RecommendResponse } from '~/types/recommend';
import BaseSection from '~/components/BaseSection.vue';

/** スライダー表示項目 */
interface SliderItem {
  /** ラベル */
  label: string;
  /** 値 */
  value: number[];
  /** 最小値のラベル名 */
  minLabel: string;
  /** 最大値のラベル名 */
  maxLabel: string;
}

const moodStore = useMoodStore();

/** スライダー表示項目 */
const sliderItems = computed<SliderItem[]>(() => [
  {
    label: 'ロースト',
    value: getStepValues(recommendation.value?.roastLevel ?? 1),
    minLabel: 'LIGHT',
    maxLabel: 'DARK',
  },
  {
    label: '酸味',
    value: getStepValues(recommendation.value?.acidity ?? 1),
    minLabel: 'LOW',
    maxLabel: 'HIGH',
  },
  {
    label: 'コク',
    value: getStepValues(recommendation.value?.body ?? 1),
    minLabel: 'LIGHT',
    maxLabel: 'FULL',
  },
]);

const {
  data: recommendation,
  pending: isLoading,
  error,
} = useApiDataWithBody<RecommendResponse, { moods: string[]; freeText: string }>({
  key: 'recommendation',
  url: '/api/recommend',
  body: {
    moods: moodStore.moods || [],
    freeText: moodStore.freeText || '',
  },
  opts: { immediate: true, server: false },
});

/**
 * コーヒー豆のブレンド比率の色を取得
 * @param index
 */
const getBeanColor = (index: number): string => {
  const colors = ['#C0D6DF', '#AEC3B0', '#FFD6A5', '#FFADAD', '#CAFFBF'];
  return colors[index % colors.length];
};

/**
 * スライダーの値を配列に変換
 * @param value
 */
const getStepValues = (value: number) => {
  return Array.from({ length: value }, (_, i) => i + 1);
};
</script>

<template>
  <UContainer>
    <UCard v-if="recommendation" class="mx-auto max-w-2xl space-y-6 rounded-2xl shadow-lg">
      <!-- ヘッダー -->
      <template #header>
        <div class="space-y-1 text-center">
          <h2 class="text-2xl font-bold text-gray-900">
            <UIcon name="i-lucide-coffee" class="text-brown-500 mr-2 inline" />
            {{ recommendation.coffeeName }}
          </h2>
          <UBadge color="primary" variant="outline" class="rounded-full font-bold">
            {{ recommendation.roast }} / ホット / アイス
          </UBadge>
        </div>
      </template>

      <!-- 説明 -->
      <BaseSection title="説明" icon="i-lucide-message-square-text">
        <h4 class="mb-1 text-center text-base font-semibold text-gray-800">
          {{ recommendation.subtitle }}
        </h4>
        <p class="text-left text-sm leading-relaxed text-gray-700">
          {{ recommendation.comment }}
        </p>
      </BaseSection>

      <!-- 味わいの特徴 -->
      <BaseSection title="味わいの特徴" icon="i-lucide-bean">
        <!-- コーヒー豆比率 -->
        <div class="mb-6">
          <h4 class="mb-2 text-sm font-semibold text-gray-800">コーヒー豆のブレンド比率</h4>
          <div
            class="flex h-8 w-full overflow-hidden rounded-full border border-gray-200 bg-gray-100 shadow-sm"
          >
            <span
              v-for="(bean, index) in recommendation.beans"
              :key="index"
              class="flex flex-col items-center justify-center text-center text-[10px] leading-[1.1] font-medium text-gray-800"
              :style="{
                width: bean.ratio + '%',
                backgroundColor: getBeanColor(index),
              }"
            >
              {{ bean.origin }}
              <span>{{ Math.round(bean.ratio) }}%</span>
            </span>
          </div>
        </div>

        <!-- スライダー項目 -->
        <div class="grid gap-5">
          <div v-for="item in sliderItems" :key="item.label">
            <h4 class="mb-1 text-sm font-semibold text-gray-800">
              {{ item.label }}
            </h4>
            <div class="flex items-center gap-x-2">
              <span class="w-8 text-left text-xs text-gray-500">1</span>
              <USlider
                :modelValue="item.value"
                :min="1"
                :max="5"
                class="flex-1"
                disabled
                :min-steps-between-thumbs="1"
                tooltip
              />
              <span class="w-8 text-right text-xs text-gray-500">5</span>
            </div>
            <div class="mt-1 flex justify-between text-xs text-gray-500">
              <span>{{ item.minLabel }}</span>
              <span>{{ item.maxLabel }}</span>
            </div>
          </div>
        </div>
      </BaseSection>

      <!-- トッピング -->
      <BaseSection
        v-if="recommendation.toppings.length"
        title="相性の良いトッピング"
        icon="i-lucide-coffee"
      >
        <div class="grid gap-3">
          <UCheckbox
            v-for="(topping, index) in recommendation.toppings"
            :key="index"
            :label="topping"
            variant="card"
          />
        </div>
      </BaseSection>
    </UCard>

    <div v-else-if="isLoading" class="py-10 text-center text-sm text-gray-500">
      <span
        v-for="(char, index) in 'バリスタがコーヒーを準備中です...'.split('')"
        :key="index"
        class="animate-wave inline-block"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        {{ char }}
      </span>

      <!-- ホニョのGIFを追加 -->
      <img
        src="/images/honyo_pc_search.gif"
        alt="ホニョが検索中"
        class="mx-auto mt-6 h-32 w-auto"
      />
    </div>

    <div v-else-if="error" class="py-10 text-center text-red-600">
      {{ (error.data as any)?.message ?? 'コーヒーの提案取得に失敗しました' }}
    </div>
  </UContainer>
</template>

<style scoped>
@keyframes waveFade {
  0%,
  100% {
    opacity: 0.2;
    transform: translateY(2px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-wave {
  animation: waveFade 1.5s ease-in-out infinite;
}
</style>
