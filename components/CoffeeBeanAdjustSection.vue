<script setup lang="ts">
import CoffeeBeanPieChart from '~/components/CoffeeBeanPieChart.vue';
import { BEAN_COLORS } from '../shared/constants';
import type { Bean } from '~/types';

const props = defineProps<{
  beans: Bean[];
}>();

const emit = defineEmits<{
  (e: 'update:beans', value: Bean[]): void;
}>();

const localBeans = reactive<Bean[]>(JSON.parse(JSON.stringify(props.beans)));

const totalPercent = computed(() => localBeans.reduce((sum, b) => sum + b.ratio, 0));

watch(
  () => localBeans.map((b) => b.ratio), // ratioのみを監視
  () => {
    const total = totalPercent.value;
    if (total !== 100) {
      const last = localBeans.at(-1);
      if (last) {
        last.ratio = Math.max(0, Math.min(100, last.ratio - (total - 100)));
      }
    }

    // 親へ通知
    emit('update:beans', JSON.parse(JSON.stringify(localBeans)));
  },
  { deep: true, immediate: true }
);

// カラー取得（fallback付き）
const getBeanColor = (index: number) => BEAN_COLORS[index % BEAN_COLORS.length];
</script>

<template>
  <!-- 円グラフ -->
  <CoffeeBeanPieChart :beans="localBeans" />

  <!-- 調整スライダー -->
  <div class="mt-4 grid gap-4">
    <div v-for="(bean, index) in localBeans" :key="bean.origin">
      <div class="mb-1 flex justify-between text-sm">
        <span>{{ bean.origin }}</span>
        <span class="text-gray-500">{{ bean.ratio }}%</span>
      </div>

      <div class="relative">
        <div
          class="pointer-events-none absolute top-1/2 left-0 h-2 w-full -translate-y-1/2 rounded"
          :style="{ backgroundColor: getBeanColor(index), opacity: 0.25 }"
        ></div>

        <!-- ✅ ratio を toRef で正しく渡す -->
        <USlider
          v-model="localBeans[index].ratio"
          :min="0"
          :max="100"
          :step="1"
          class="relative z-10"
        />
      </div>
    </div>
  </div>

  <p
    class="mt-2 text-right text-sm"
    :class="totalPercent !== 100 ? 'text-red-500' : 'text-gray-500'"
  >
    合計: {{ totalPercent }}%
    <span v-if="totalPercent !== 100">（100%に調整してください）</span>
  </p>
</template>
