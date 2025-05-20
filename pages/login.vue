<script setup lang="ts">
definePageMeta({
  layout: 'minimal',
});

const supabase = useSupabaseClient();
const isLoading = ref(false);
const toast = useToast();
const { baseUrl } = useRuntimeConfig().public;

/** 利用規約に同意したかどうか */
const agreedToTerms = ref(false);

/** Googleログイン */
const loginWithGoogle = async () => {
  isLoading.value = true;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${baseUrl}/auth/callback`,
    },
  });

  if (error) {
    toast.add({ title: 'ログイン失敗', description: error.message, color: 'error' });
    isLoading.value = false;
  }
};
</script>

<template>
  <UContainer class="flex min-h-screen flex-col items-center justify-center space-y-6 text-center">
    <!-- ロゴ -->
    <UAvatar
      src="/images/one_coffee_icon.png"
      alt="One Coffee"
      class="h-32 w-32 rounded-full border border-gray-300"
    />

    <!-- 見出しと説明文 -->
    <div class="space-y-2">
      <h1 class="text-2xl font-bold">One Coffeeへようこそ</h1>
      <p class="text-xs whitespace-nowrap text-gray-500">
        愛犬バリスタと一緒に、今日のコーヒーを選びましょう。
      </p>
    </div>

    <!-- 利用規約に同意するチェックボックス -->
    <UTooltip arrow text="データはAIの学習目的で活用されます" class="max-w-xs text-left">
      <UCheckbox
        v-model="agreedToTerms"
        label="利用規約に同意する"
        class="text-sm text-gray-600"
        size="sm"
      />
    </UTooltip>

    <!-- Googleログインボタン -->
    <UButton
      size="lg"
      color="primary"
      icon="i-simple-icons-google"
      :loading="isLoading"
      @click="loginWithGoogle"
      :disabled="!agreedToTerms"
    >
      Googleでログイン
    </UButton>
  </UContainer>
</template>
