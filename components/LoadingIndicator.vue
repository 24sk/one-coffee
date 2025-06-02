<script setup lang="ts">
defineProps<{
  message: string;
  image: string;
}>();
</script>

<template>
  <div class="py-10 text-center text-sm text-gray-500">
    <div>
      <span
        v-for="(char, index) in message.split('')"
        :key="index"
        class="animate-fade-in inline-block"
        :style="{ animationDelay: `${index * 0.05}s` }"
      >
        {{ char }}
      </span>
    </div>

    <img :src="image" alt="ローディング中" class="mx-auto mt-6 h-32 w-auto" />
  </div>
</template>

<style scoped>
@keyframes fade-in {
  0% {
    color: #111827; /* 黒 */
    opacity: 1;
  }
  100% {
    color: #d1d5db; /* 灰色 (text-gray-300) */
    opacity: 0.5;
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-in-out infinite alternate;
}
</style>
