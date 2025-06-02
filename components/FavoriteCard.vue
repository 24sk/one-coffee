<script setup lang="ts">
import type { FavoriteWithParsedRecommendation } from '~/types';

const props = defineProps<{
  favorite: FavoriteWithParsedRecommendation;
}>();

const emit = defineEmits<{
  (e: 'deleted', id: string): void;
}>();

const { removeFavorite } = useFavorite();
const toast = useToast();

const isDialogOpen = ref(false);

const formatDate = (date: string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/** お気に入りを削除する */
const confirmDelete = async () => {
  try {
    await removeFavorite({ recommendationId: props.favorite.recommendation.id! });
    // 親で一覧を更新したい場合に使用
    emit('deleted', props.favorite.id);
    toast.add({
      title: '削除しました',
      icon: 'i-lucide-heart-minus',
      color: 'primary',
    });
  } catch (e) {
    toast.add({
      title: '削除に失敗しました',
      icon: 'i-lucide-alert-triangle',
      color: 'error',
    });
  } finally {
    isDialogOpen.value = false;
  }
};
</script>

<template>
  <UCard
    class="group relative rounded-xl shadow-sm transition-shadow duration-200 hover:shadow-md"
    :ui="{ body: 'cursor-pointer' }"
    @click="
      navigateTo({
        path: `/user/menu/favorite/${favorite.recommendation.id}`,
        query: {
          favorite: encodeURIComponent(JSON.stringify(favorite)),
        },
      })
    "
  >
    <!-- アクションアイコン（ホバー時に表示） -->
    <!-- 編集・削除ボタン（PCではhover時、スマホでは常時表示） -->
    <div
      class="absolute top-2 right-2 flex gap-2 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
    >
      <UButton
        icon="i-lucide-square-pen"
        size="xs"
        color="primary"
        variant="ghost"
        @click="navigateTo({ path: `/user/menu/favorite/${favorite.recommendation.id}/edit` })"
      />
      <UButton
        @click="isDialogOpen = true"
        icon="i-lucide-heart-minus"
        size="xs"
        color="neutral"
        variant="ghost"
      />
    </div>

    <div class="space-y-2">
      <!-- 日付 -->
      <div class="text-xs text-gray-400">
        {{ formatDate(favorite.created_at) }}
      </div>

      <!-- コーヒー名 -->
      <h3 class="truncate text-lg font-semibold text-gray-900">
        {{ favorite.recommendation.coffeeName }}
      </h3>

      <!-- 説明 -->
      <p class="comment text-sm break-words whitespace-pre-line text-gray-700">
        {{ favorite.recommendation.comment }}
      </p>

      <!-- タグ -->
      <div class="flex flex-wrap gap-1 pt-1">
        <UBadge
          v-for="(mood, index) in favorite.moods"
          :key="index"
          color="primary"
          class="rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white"
        >
          {{ `# ${mood}` }}
        </UBadge>
      </div>
    </div>
  </UCard>

  <!-- 削除確認ダイアログ -->
  <UModal
    v-model:open="isDialogOpen"
    :title="`「${favorite.recommendation.coffeeName}」をお気に入りから削除しますか？`"
    :close="false"
  >
    <template #footer>
      <div class="flex w-full justify-end gap-2">
        <UButton label="キャンセル" color="neutral" variant="ghost" @click="isDialogOpen = false" />
        <UButton label="はい" color="primary" @click="confirmDelete" />
      </div>
    </template>
  </UModal>
</template>

<style scoped>
.comment {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 最大3行 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-break: strict; /* 文節で改行しやすくする（日本語） */
  word-break: break-word; /* 英単語の途中で折り返し可（必要に応じて） */
}
</style>
