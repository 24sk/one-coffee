<script setup lang="ts">
import type { FavoriteWithParsedRecommendation } from '~/types';
import { useApiData } from '~/composables/useApiData';

definePageMeta({ layout: 'user' });

const route = useRoute();
const router = useRouter();

// 遷移元からクエリで渡されたデータがあればパース
const initialFavorite = route.query.favorite
  ? (JSON.parse(
      decodeURIComponent(route.query.favorite as string)
    ) as FavoriteWithParsedRecommendation)
  : null;

const id = route.params.id as string;

const {
  data: favorite,
  pending,
  error,
} = useApiData<FavoriteWithParsedRecommendation>({
  key: `favorite-${id}`,
  url: `/api/favorite/${id}`,
  default: initialFavorite,
  opts: {
    immediate: !initialFavorite,
    server: false,
  },
});

const sliderItems = useTasteSliderItems(computed(() => favorite.value?.recommendation));
</script>

<template>
  <UContainer>
    <UCard v-if="favorite" class="mx-auto max-w-2xl space-y-6 rounded-2xl shadow-lg">
      <template #header>
        <CoffeeDetailHeader :recommendation="favorite.recommendation" />
      </template>

      <!-- 説明 -->
      <BaseSection title="説明" icon="i-lucide-message-square-text">
        <h4 class="mb-1 text-center text-base font-semibold text-gray-800">
          {{ favorite.recommendation.subtitle }}
        </h4>
        <p class="text-left text-sm leading-relaxed text-gray-700">
          {{ favorite.recommendation.comment }}
        </p>
      </BaseSection>

      <!-- コーヒー豆のブレンド比率 -->
      <BaseSection title="コーヒー豆のブレンド比率" icon="i-lucide-bean">
        <CoffeeBeanPieChart :beans="favorite.recommendation.beans" />
      </BaseSection>

      <!-- 味わいの特徴 -->
      <BaseSection title="味わいの特徴" icon="i-lucide-clipboard-list">
        <div class="grid gap-5">
          <div v-for="item in sliderItems" :key="item.label">
            <h4 class="mb-1 text-sm font-semibold text-gray-800">
              {{ item.label }}
            </h4>
            <div class="flex items-center gap-x-2">
              <span class="w-8 text-left text-xs text-gray-500">1</span>
              <USlider
                :model-value="getStepValues(item.value)"
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
        v-if="favorite.recommendation.toppings.length"
        title="相性の良いトッピング"
        icon="i-lucide-coffee"
      >
        <div class="grid gap-3">
          <div
            v-for="(topping, index) in favorite.recommendation.toppings"
            :key="index"
            class="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm"
          >
            {{ topping }}
          </div>
        </div>
      </BaseSection>

      <!-- 調整するボタン -->
      <UButton
        size="lg"
        class="w-full max-w-xs rounded-full font-bold"
        @click="router.push(`/user/menu/favorite/${id}/edit`)"
        trailing-icon="i-lucide-arrow-right"
      >
        <span class="block w-full text-center">調整する</span>
      </UButton>
    </UCard>

    <div v-else-if="pending" class="py-10 text-center text-sm text-gray-500">
      <LoadingIndicator
        message="バリスタがコーヒーを準備中です..."
        image="/images/honyo_pc_search.gif"
      />
    </div>

    <div v-else-if="error" class="py-10 text-center text-red-600">
      {{ (error.data as any)?.message ?? 'お気に入りの取得に失敗しました' }}
    </div>
  </UContainer>
</template>
