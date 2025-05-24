<template>
  <div class="space-y-4 rounded-xl bg-white p-4">
    <div class="flex items-center gap-2">
      <UIcon v-if="icon" :name="icon" class="text-primary h-5 w-5" />
      <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  icon?: string;
}>();
</script>
