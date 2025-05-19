<script setup lang="ts">
definePageMeta({
  layout: 'minimal',
});

const user = useSupabaseUser();
const router = useRouter();

watchEffect(() => {
  if (user.value) {
    router.replace('/user');
  }
});
</script>

<
<template>
  <div class="flex min-h-screen flex-col items-center justify-center space-y-6 bg-white">
    <!-- アイコン（アスペクト比保持） -->
    <img
      src="/images/login_icon.png"
      alt="ログイン中アイコン"
      class="h-auto w-32 max-w-xs object-contain"
    />

    <!-- 打ち込み風アニメーションテキスト -->
    <p class="typewriter text-sm whitespace-nowrap text-gray-600">コーヒーを準備しています...</p>
  </div>
</template>

<style scoped>
/* 打ち込みアニメーション */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}

.typewriter {
  width: 20ch; /* テキスト幅に合わせて調整 */
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #ccc;
  animation:
    typing 2.5s steps(20, end),
    blink 0.8s step-end infinite;
}
</style>
