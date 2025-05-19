<script setup lang="ts">
import type { MoodList } from '~/types';

const router = useRouter();

const { data: moods } = useApiData<MoodList>({
  key: 'moods',
  url: '/api/mood',
  opts: {
    immediate: true,
  },
});

const selectedMoods = ref<Set<string>>(new Set());

const toggleMood = (value: string) => {
  if (selectedMoods.value.has(value)) {
    selectedMoods.value.delete(value);
  } else {
    selectedMoods.value.add(value);
  }
};

const goToNext = () => {
  if (selectedMoods.value.size > 0) {
    router.push({
      path: '/user/recommend',
      query: {
        moods: Array.from(selectedMoods.value).join(','),
      },
    });
  }
};
</script>

<template>
  <div class="space-y-6 p-6">
    <!-- ヘッダー -->
    <header class="text-2xl font-bold">今日の気分は？</header>

    <!-- 気分タグ -->
    <div class="flex flex-wrap gap-3">
      <UBadge
        v-for="mood in moods"
        :key="mood.value"
        class="cursor-pointer font-bold transition-all duration-200"
        :class="
          selectedMoods.has(mood.value)
            ? 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white'
            : 'bg-gray-200 text-gray-700'
        "
        @click="toggleMood(mood.value)"
      >
        {{ `# ${mood.label}` }}
      </UBadge>
    </div>

    <!-- 次へボタン -->
    <UButton
      size="lg"
      color="primary"
      :disabled="selectedMoods.size === 0"
      class="w-full max-w-xs rounded-full font-bold"
      @click="goToNext"
      trailing-icon="i-lucide-arrow-right"
    >
      <span class="block w-full text-center">次へ</span>
    </UButton>
  </div>
</template>
<style scoped>
.instagram-tag {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
}
</style>
