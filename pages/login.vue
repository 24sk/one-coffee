<script setup lang="ts">
definePageMeta({
  layout: 'minimal',
});

const supabase = useSupabaseClient();
const isLoading = ref(false);
const toast = useToast();
const { baseUrl } = useRuntimeConfig().public;

/** 利用規約に同意したかどうか */
const agreedToTerms = useLocalStorage('agreedToTerms', false);
/** 利用規約モーダルを開いているかどうか */
const isTermsModalOpen = ref(false);

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
      <h1 class="text-2xl" style="font-family: 'Lobster', cursive">One Coffeeへようこそ</h1>
      <p class="text-xs whitespace-nowrap text-gray-500">
        愛犬バリスタと一緒に、今日のコーヒーを選びましょう。
      </p>
    </div>

    <!-- 利用規約に同意するチェックボックス -->
    <UCheckbox
      v-model="agreedToTerms"
      size="md"
      class="flex items-center"
      icon="i-lucide-paw-print"
    >
      <template #label>
        <span
          class="cursor-pointer text-sm font-medium text-gray-700 underline underline-offset-4 hover:text-gray-900"
          @click="isTermsModalOpen = true"
        >
          利用規約に同意する
        </span>
      </template>
    </UCheckbox>

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

    <!-- 利用規約ダイアログ -->
    <UModal
      v-model:open="isTermsModalOpen"
      title="利用規約"
      description="本サービスをご利用いただくにあたり、以下の事項にご同意いただく必要があります。"
      close-icon="i-lucide-paw-print"
    >
      <template #body>
        <div class="space-y-6 text-sm text-gray-700">
          <ul class="list-outside list-disc space-y-4 pl-5 leading-loose">
            <li>ユーザーが選択・入力した内容は、AIによるコーヒー提案のために使用されます。</li>
            <li>収集されたデータは、AIの学習・分析・提案精度の向上に活用されます。</li>
            <li>個人を特定できる情報（氏名、連絡先など）は一切取得・使用しません。</li>
            <li>利用者の同意なく、第三者にデータを提供することはありません。</li>
          </ul>
        </div>
      </template>
    </UModal>
  </UContainer>
</template>
