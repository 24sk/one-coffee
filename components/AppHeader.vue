<script setup lang="ts">
const route = useRoute();

const pageMessages: Record<string, string> = {
  '/user': '今日の気分をおしえてください',
  '/user/recommend': 'おすすめのコーヒーはこちら！',
  '/user/adjust': 'もっと細かく調整したい？',
};

const message = computed(() => pageMessages[route.path] ?? '');

const items = computed(() => [
  {
    label: 'Top',
    to: '/user',
    icon: 'i-lucide-coffee',
  },
  {
    label: 'recommend',
    icon: 'i-lucide-heart',
  },
  {
    label: 'adjust',
    icon: 'i-lucide-heart-plus',
  },
]);
</script>

<template>
  <div>
    <!-- 上部ヘッダー -->
    <UHeader mode="slideover" to="/">
      <template #title>
        <h1 class="text-xl font-bold text-gray-900">One Coffee</h1>
      </template>

      <template #right>
        <UNavigationMenu :items="items" variant="link" class="hidden lg:block" />
      </template>

      <template #body>
        <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
        <div class="absolute bottom-0 left-0 w-full border-t border-gray-200 bg-white p-2">
          <UserMenu />
        </div>
      </template>
    </UHeader>

    <!-- バリスタ犬の吹き出しエリア -->
    <div class="flex items-start gap-2 px-4 pt-4">
      <!-- 犬アイコン -->
      <UAvatar
        src="/images/one_coffee_icon.png"
        alt="One Coffee Icon"
        class="h-12 w-12 rounded-full border border-gray-300 shadow-sm"
      />

      <!-- 吹き出し -->
      <div
        class="text-brown-800 relative max-w-xs rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm shadow-md"
      >
        <span class="text-base font-semibold">{{ message }}</span>
        <!-- 吹き出しの三角形 -->
        <div
          class="absolute top-3 left-0 -translate-x-full border-y-[10px] border-r-[14px] border-y-transparent border-r-amber-50"
        />
        <div
          class="absolute top-3 left-0 -z-10 -translate-x-full border-y-[11px] border-r-[15px] border-y-transparent border-r-amber-200"
        />
      </div>
    </div>
  </div>
</template>
