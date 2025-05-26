<script setup lang="ts">
import type { MoodList } from '~/types';

const router = useRouter();
const moodStore = useMoodStore();

const { data: moods } = useApiData<MoodList>({
  key: 'moods',
  url: '/api/mood',
  opts: {
    immediate: true,
  },
});

/** 今日の気分 */
const selectedMoods = ref<Set<string>>(new Set());
/** 自由入力欄 */
const freeText = ref('');

/**
 * マウント時に気分タグと自由入力欄を初期化する
 * @remarks storeはサーバーサイドでは取得できないため、hydrationエラーを防ぐためにマウント時に初期化する
 */
onMounted(() => {
  selectedMoods.value = new Set(moodStore.moods);
  freeText.value = moodStore.freeText || '';
});

/**
 * 気分タグを選択する
 * @param value 気分タグの値
 */
const toggleMood = (value: string) => {
  if (selectedMoods.value.has(value)) {
    selectedMoods.value.delete(value);
  } else {
    selectedMoods.value.add(value);
  }
};

/** 気分タグを選択した後、次のページに遷移する */
const goToNext = () => {
  if (selectedMoods.value.size > 0) {
    // 選択した気分タグをストアに保存
    moodStore.setSelectedMoods(Array.from(selectedMoods.value));
    moodStore.setSelectedFreeText(freeText.value.trim());
    router.push({
      path: '/user/recommend',
    });
  }
};
</script>

<template>
  <div class="space-y-6 p-6">
    <!-- 気分タグ -->
    <div class="flex flex-wrap gap-3">
      <UBadge
        v-for="mood in moods"
        :key="mood.id"
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

    <!-- フリー入力欄 -->
    <div>
      <label for="free-text" class="free-text-label block text-sm font-medium text-gray-700">
        気分や好みを自由に入力
      </label>
      <UTextarea
        id="free-text"
        v-model="freeText"
        placeholder="例: 午後にリラックスしたい気分。ミルク系が好きです。"
        autoresize
        class="min-h-[120px] w-full rounded-md"
      />
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
      <span class="block w-full text-center">おすすめを見る</span>
    </UButton>
  </div>
</template>
<style scoped>
.instagram-tag {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
}
.free-text-label {
  margin-bottom: -15px;
}
</style>
