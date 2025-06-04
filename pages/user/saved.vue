<script setup lang="ts">
import { WAN_COFFEE } from '~/shared/constants';

definePageMeta({
  layout: 'minimal',
});

const router = useRouter();
</script>

<template>
  <UContainer class="flex min-h-screen flex-col items-center justify-center gap-4">
    <!-- ロゴ -->
    <UAvatar src="/images/ogp.jpg" :alt="`${WAN_COFFEE} Icon`" class="h-32 w-32" />
    <h2>おすすめコーヒーをお気に入りに保存しました</h2>

    <UButton
      size="lg"
      class="w-full max-w-xs rounded-full font-bold"
      @click="router.push('/user')"
      trailing-icon="i-lucide-arrow-right"
    >
      <span class="block w-full text-center">今日の気分から選ぶ</span>
    </UButton>
    <UButton
      size="lg"
      class="w-full max-w-xs rounded-full font-bold"
      :class="'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white'"
      @click="router.push('/user/menu/favorite')"
      trailing-icon="i-lucide-heart"
      variant="solid"
    >
      <span class="block w-full text-center">お気に入り一覧を見る</span>
    </UButton>
  </UContainer>
</template>
