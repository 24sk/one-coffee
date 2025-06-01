<script setup lang="ts">
import type { RecommendResponse } from '~/types';

const props = defineProps<{
  recommendation: RecommendResponse;
}>();

const moodStore = useMoodStore();
const { addFavorite, removeFavorite } = useFavorite();

const toast = useToast();
const isFavorite = ref(false);
const recommendation = computed(() => props.recommendation);

onMounted(async () => {
  try {
    const res = await $fetch<{ favorite: boolean }>(`/api/favorite/${props.recommendation.id}`);
    isFavorite.value = res.favorite;
  } catch (e) {
    toast.add({
      title: 'エラー',
      description: (e as Error)?.message ?? 'お気に入り取得に失敗しました',
      icon: 'i-lucide-alert-triangle',
      color: 'error',
    });
  }
});

/** お気に入りボタンをクリック */
const toggleFavorite = async () => {
  const original = isFavorite.value;
  isFavorite.value = !original;

  try {
    if (isFavorite.value) {
      await addFavorite({
        recommendation: recommendation.value!,
        moods: moodStore.moods || [],
        freeText: moodStore.freeText || '',
      });
    } else {
      await removeFavorite({
        recommendationId: recommendation.value!.id!,
      });
    }

    toast.add({
      title: isFavorite.value ? 'お気に入りに追加しました' : 'お気に入りから削除しました',
      icon: isFavorite.value ? 'i-lucide-heart-plus' : 'i-lucide-heart-minus',
      color: isFavorite.value ? 'error' : 'neutral',
    });
  } catch (err) {
    // 失敗時は状態を元に戻す
    isFavorite.value = original;

    toast.add({
      title: 'エラー',
      description: (err as Error)?.message ?? 'お気に入り登録に失敗しました',
      icon: 'i-lucide-alert-triangle',
      color: 'error',
    });
  }
};
</script>
<template>
  <div class="relative space-y-2 text-center">
    <UButton
      size="md"
      variant="ghost"
      color="neutral"
      :icon="isFavorite ? 'i-lucide-heart' : 'i-lucide-heart-plus'"
      @click="toggleFavorite"
      class="absolute top-0 right-0"
      :class="{ 'text-red-500': isFavorite }"
    />

    <!-- コーヒー名 -->
    <h2 class="text-xl font-bold text-gray-900 sm:text-2xl">
      {{ recommendation.coffeeName }}
    </h2>

    <!-- ローストラベル -->
    <UBadge color="primary" variant="outline" class="rounded-full font-bold">
      {{ recommendation.roast }} / ホット / アイス
    </UBadge>
  </div>
</template>
