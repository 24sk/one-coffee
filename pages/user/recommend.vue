<script setup lang="ts">
import type { RecommendResponse } from '~/types/recommend';

const moodStore = useMoodStore();

// Composableを使用したPOST呼び出し
const {
  data: recommendation,
  pending: isLoading,
  error,
} = useApiDataWithBody<RecommendResponse, { moods: string[] }>({
  key: 'recommendation',
  url: '/api/recommend',
  body: { moods: moodStore.selected },
  opts: {
    immediate: true,
    server: false,
  },
});
</script>

<template>
  <div class="space-y-6 p-6">
    <div v-if="isLoading">
      <p class="text-gray-500">バリスタがコーヒーを準備中です...</p>
    </div>

    <div v-else-if="error">
      <p class="text-red-600">
        {{ (error.data as any)?.message ?? 'コーヒーの提案取得に失敗しました' }}
      </p>
    </div>

    <div v-else-if="recommendation" class="space-y-4 rounded border p-4 shadow">
      <h2 class="text-xl font-semibold">{{ recommendation.coffeeName }}</h2>

      <div>
        <strong>豆の配合:</strong>
        <ul class="list-disc pl-6">
          <li v-for="bean in recommendation.beans" :key="bean.origin">
            {{ bean.origin }}: {{ bean.ratio }}%
          </li>
        </ul>
      </div>

      <p><strong>焙煎度:</strong> {{ recommendation.roast }}</p>

      <p v-if="recommendation.toppings.length">
        <strong>トッピング:</strong>
        {{ recommendation.toppings.join(', ') }}
      </p>

      <p class="text-gray-600 italic">"{{ recommendation.comment }}"</p>
    </div>
  </div>
</template>
