<script setup lang="ts">
import FavoriteCard from '~/components/FavoriteCard.vue';
import { useApiData } from '~/composables/useApiData';
import type { FavoriteWithParsedRecommendation } from '~/types';

definePageMeta({ layout: 'user' });

const {
  data: favorites,
  pending,
  error,
  refresh,
} = useApiData<FavoriteWithParsedRecommendation[]>({
  key: 'favorites',
  url: '/api/favorite',
  opts: { immediate: true, server: false },
});

/** お気に入りを更新する */
const refreshFavorites = async () => {
  await refresh();
};
</script>

<template>
  <div>
    <!-- ローディング -->
    <div v-if="pending">
      <LoadingIndicator message="お気に入りを読み込んでいます..." image="/images/ogp.jpg" />
    </div>

    <template v-else-if="favorites?.length === 0">
      <div class="space-y-4 py-10 text-center text-gray-500">
        <UIcon name="i-lucide-heart-off" class="mx-auto text-4xl text-gray-400" />
        <p class="text-lg font-semibold">お気に入りはまだ登録されていません</p>
        <p class="text-sm">今日の気分であなただけのコーヒーを見つけましょう</p>
        <UButton @click="navigateTo('/user')" color="primary" icon="i-lucide-smile"
          >気分を選ぶ
        </UButton>
      </div>
    </template>

    <!-- エラー -->
    <div v-else-if="error" class="text-center text-red-500">お気に入りの取得に失敗しました。</div>

    <!-- 一覧表示 -->
    <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <FavoriteCard
        v-for="favorite in favorites"
        :key="favorite.id"
        :favorite="favorite"
        @deleted="refreshFavorites"
      />
    </div>
  </div>
</template>
