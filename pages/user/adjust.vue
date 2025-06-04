<script setup lang="ts">
const recommendStore = useRecommendStore();
const recommendation = computed(() => recommendStore.recommendation);

const toast = useToast();

/** スライダー表示項目 */
const sliderItems = useTasteSliderItems(computed(() => recommendation.value));

// トッピングの状態管理
const selectedToppings = ref<string[]>(recommendation.value?.toppings ?? []);

/**  ユーザーの好みを保存する */
const saveRecommendation = async () => {
  if (!recommendation.value) return;

  try {
    await $fetch('/api/recommendation-results', {
      method: 'POST',
      body: {
        ...recommendation.value,
        toppings: selectedToppings.value,
      },
    });

    toast.add({ title: 'お好みの調整を保存しました', color: 'primary', icon: 'i-lucide-check' });
  } catch (e) {
    console.error('保存失敗:', e);
    toast.add({ title: '保存に失敗しました', color: 'error', icon: 'i-lucide-alert-triangle' });
  }
};
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
          <UCheckboxGroup
            variant="card"
            v-model="selectedToppings"
            :items="recommendation.toppings"
          />
        </div>
      </BaseSection>
      <UButton
        size="lg"
        class="w-full max-w-xs rounded-full font-bold"
        @click="saveRecommendation"
        trailing-icon="i-lucide-pin"
      >
        <span class="block w-full text-center">保存する</span>
      </UButton>
    </UCard>
  </UContainer>
</template>
