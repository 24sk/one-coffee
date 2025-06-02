<script setup lang="ts">
import type { FavoriteWithParsedRecommendation } from '~/types';
import { useApiData } from '~/composables/useApiData';
import { useTasteSliderItems } from '~/composables/useTasteSliderItems';

definePageMeta({ layout: 'user' });

const route = useRoute();
const toast = useToast();

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

// トッピングの状態管理（仮に元データから初期値を設定）
const selectedToppings = ref<string[]>([]);
watchEffect(() => {
  if (favorite.value?.recommendation.toppings) {
    selectedToppings.value = [...favorite.value.recommendation.toppings];
  }
});
</script>

<template>
  <UContainer>
    <UCard v-if="favorite" class="mx-auto max-w-2xl space-y-6 rounded-2xl shadow-lg">
      <template #header>
        <CoffeeDetailHeader :recommendation="favorite.recommendation" />
      </template>

      <!-- コーヒー豆のブレンド比率（編集可） -->
      <BaseSection title="コーヒー豆のブレンド比率" icon="i-lucide-bean">
        <CoffeeBeanAdjustSection :beans="favorite.recommendation.beans" />
      </BaseSection>

      <!-- 味わいの特徴（編集可） -->
      <BaseSection title="味わい" icon="i-lucide-clipboard-list">
        <div class="grid gap-5">
          <div v-for="item in sliderItems" :key="item.label">
            <h4 class="mb-1 text-sm font-semibold text-gray-800">
              {{ item.label }}
            </h4>
            <div class="flex items-center gap-x-2">
              <span class="w-8 text-left text-xs text-gray-500">1</span>
              <USlider
                v-model="item.value"
                :min="1"
                :max="5"
                class="flex-1"
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

      <!-- トッピング選択 -->
      <BaseSection
        v-if="favorite.recommendation.toppings.length"
        title="トッピング"
        icon="i-lucide-coffee"
      >
        <div class="grid gap-3">
          <UCheckbox
            v-for="(topping, index) in favorite.recommendation.toppings"
            :key="index"
            :label="topping"
            variant="card"
            v-model:checked="selectedToppings"
          />
        </div>
      </BaseSection>

      <!-- 保存ボタン（仮） -->
      <div class="pt-4 text-center">
        <UButton
          size="lg"
          class="w-full max-w-xs rounded-full font-bold"
          color="primary"
          @onClick="() => toast.add({ title: '保存しました（実装は仮です）' })"
        >
          <span class="block w-full text-center">保存する</span>
        </UButton>
      </div>
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
