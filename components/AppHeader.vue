<script setup lang="ts">
import type { StepperItem, NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();

/**
 * ステップマップ
 *
 * パスに応じてステップの値を返す
 *
 * 例:
 * - /user の場合は 0
 * - /user/recommend の場合は 1
 * - /user/adjust の場合は 2
 */
const currentStepMaps: Record<string, number> = {
  '/user': 0,
  '/user/recommend': 1,
  '/user/adjust': 2,
};

/** 現在のステップ */
const currentStep = computed(() => currentStepMaps[route.path] ?? 0);

/** ナビゲーションメニューのアイテム */
const navigationItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Top',
    to: '/user',
    icon: 'i-lucide-coffee',
  },
  {
    label: 'recommend',
    to: '/user/recommend',
    icon: 'i-lucide-heart',
  },
  {
    label: 'adjust',
    icon: 'i-lucide-heart-plus',
  },
]);

/** ステッパーズアイテム */
const stepperItems = computed<StepperItem[]>(() => [
  {
    title: '今日の気分',
    icon: 'i-lucide-smile',
  },
  {
    title: 'おすすめ',
    icon: 'i-lucide-bean',
  },
  {
    title: 'カスタマイズ',
    icon: 'i-lucide-coffee',
  },
]);
</script>

<template>
  <div>
    <!-- 上部ヘッダー -->
    <UHeader mode="slideover" to="/">
      <template #title>
        <div class="flex items-center gap-3">
          <UAvatar
            src="/images/one_coffee_icon.png"
            alt="One Coffee Icon"
            class="h-12 w-12 rounded-full border border-gray-300 shadow-sm"
          />
          <h1 class="text-3xl" style="font-family: 'Lobster', cursive">One Coffee</h1>
        </div>
      </template>

      <template #right>
        <UNavigationMenu :items="navigationItems" variant="link" class="hidden lg:block" />
      </template>

      <template #body>
        <UNavigationMenu :items="navigationItems" orientation="vertical" class="-mx-2.5" />
        <div class="absolute bottom-0 left-0 w-full border-t border-gray-200 bg-white p-2">
          <UserMenu />
        </div>
      </template>
    </UHeader>

    <!-- ステッパー -->
    <div class="flex items-start gap-2 px-4 pt-4">
      <UStepper
        :items="stepperItems"
        class="w-full"
        size="sm"
        :model-value="currentStep"
        disabled
      />
    </div>
  </div>
</template>
