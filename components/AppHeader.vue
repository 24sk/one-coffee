<script setup lang="ts">
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
  <UHeader mode="slideover" to="/">
    <template #title>
      <div class="flex items-center gap-2">
        <UAvatar
          src="/images/one_coffee_icon.png"
          alt="One Coffee"
          class="h-12 w-12 rounded-full"
        />
        <h1 class="flex justify-center text-2xl">One Coffee</h1>
      </div>
    </template>

    <template #right>
      <UNavigationMenu :items="items" variant="link" class="hidden lg:block" />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />

      <div
        class="absolute bottom-0 left-0 w-full bg-white p-2"
        style="border-top: 1px solid oklch(0.92 0.004 286.32)"
      >
        <UserMenu />
      </div>
    </template>
  </UHeader>
</template>
