<script setup lang="ts">
const recommendStore = useRecommendStore();
const recommendation = computed(() => recommendStore.recommendation);

/** スライダー表示項目 */
const sliderItems = useTasteSliderItems(computed(() => recommendation.value));

// トッピングの状態管理
const selectedToppings = ref<string[]>([]);
</script>

<template>
  <UContainer>
    <UCard v-if="recommendation" class="mx-auto max-w-2xl space-y-6 rounded-2xl shadow-lg">
      <!-- コーヒー名 -->
      <template #header>
        <CoffeeDetailHeader :recommendation="recommendation" />
      </template>

      <!-- コーヒー豆のブレンド比率 -->
      <BaseSection title="コーヒー豆のブレンド比率" icon="i-lucide-bean">
        <CoffeeBeanAdjustSection :beans="recommendation.beans" />
      </BaseSection>

      <!-- 味わい -->
      <BaseSection title="味わい" icon="i-lucide-clipboard-list">
        <!-- スライダー項目 -->
        <div class="grid gap-5">
          <div v-for="item in sliderItems" :key="item.label">
            <h4 class="mb-1 text-sm font-semibold text-gray-800">
              {{ item.label }}
            </h4>
            <div class="flex items-center gap-x-2">
              <span class="w-8 text-left text-xs text-gray-500">1</span>
              <USlider
                :model-value="item.value"
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

      <!-- トッピング -->
      <BaseSection v-if="recommendation.toppings.length" title="トッピング" icon="i-lucide-coffee">
        <div ref="toppingSectionRef" class="grid gap-3">
          <UCheckbox
            v-for="(topping, index) in recommendation.toppings"
            :key="index"
            :label="topping"
            variant="card"
            v-model:checked="selectedToppings"
          />
        </div>
      </BaseSection>
    </UCard>
  </UContainer>
</template>
