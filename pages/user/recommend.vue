<script setup lang="ts">
import type { RecommendResponse } from '~/types/recommend';
import BaseSection from '~/components/BaseSection.vue';

// 状態管理
const moodStore = useMoodStore();
const recommendStore = useRecommendStore();

// コンポーザブル
const toast = useToast();
const router = useRouter();
const { addFavorite } = useFavorite();

/** トッピングセクションの参照 */
const toppingSectionRef = ref<HTMLElement | null>(null);
/** インターセクションオブザーバー */
const observer = ref<IntersectionObserver | null>(null);
/** トースト表示フラグ */
const hasShownToast = ref(false);
/** お気に入りフラグ */
const isFavorite = ref(false);

/** スライダー表示項目 */
const sliderItems = useTasteSliderItems(computed(() => recommendation.value));

const {
  data: recommendation,
  pending: isLoading,
  error,
} = useApiDataWithBody<RecommendResponse, { moods: string[]; freeText: string }>({
  key: 'recommendation',
  url: '/api/recommend',
  body: {
    moods: moodStore.moods || [],
    freeText: moodStore.freeText || '',
  },
  opts: { immediate: true, server: false },
});

watch(recommendation, (value) => {
  if (value) recommendStore.setRecommendation(value);
});

/** 相性の良いトッピングセクションが表示されたらフィードバックを表示 */
watchEffect(() => {
  if (recommendation.value && toppingSectionRef.value && !hasShownToast.value) {
    observer.value = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 2秒後にToast表示
          setTimeout(() => {
            showFeedbackToast();
            hasShownToast.value = true;
            observer.value?.disconnect();
          }, 3000);
        }
      },
      { threshold: 0.5 }
    );
    observer.value.observe(toppingSectionRef.value);
  }
});

onBeforeUnmount(() => {
  observer.value?.disconnect();
});

/**
 * フィードバックを送信
 * @param rating 評価
 */
const sendFeedback = async (rating: number) => {
  if (!recommendation.value) return;

  try {
    await $fetch('/api/feedback', {
      method: 'POST',
      body: {
        recommendation: recommendation.value,
        moods: moodStore.moods,
        freeText: moodStore.freeText || '',
        rating,
      },
    });

    toast.add({
      title: 'ありがとうございます！',
      description: 'フィードバックを受け取りました ☕',
      color: 'success',
      icon: 'i-lucide-smile',
    });
  } catch (err) {
    toast.add({
      title: '送信に失敗しました',
      description: 'もう一度お試しください',
      color: 'error',
      icon: 'i-lucide-alert-triangle',
    });
  }
};

/** フィードバックトーストを表示 */
const showFeedbackToast = () => {
  toast.add({
    id: 'feedback',
    title: '今日の気分にピッタリでしたか？',
    description: 'バリスタの仕事を評価してください',
    color: 'primary',
    icon: 'i-lucide-message-square-heart',
    actions: [
      {
        icon: 'i-lucide-laugh',
        label: 'ぴったり',
        color: 'primary',
        variant: 'outline',
        onClick: async (e) => {
          e?.stopPropagation();
          await sendFeedback(3);
        },
      },
      {
        icon: 'i-lucide-meh',
        label: 'まあまあ',
        color: 'neutral',
        variant: 'outline',
        onClick: async (e) => {
          e?.stopPropagation();
          await sendFeedback(2);
        },
      },
      {
        icon: 'i-lucide-frown',
        label: 'あわない',
        color: 'warning',
        variant: 'outline',
        onClick: async (e) => {
          e?.stopPropagation();
          await sendFeedback(1);
        },
      },
    ],
  });
};

/** お気に入りボタンをクリック */
const handleFavorite = async () => {
  if (!recommendation.value) return;

  try {
    await addFavorite({
      recommendation: recommendation.value,
      moods: moodStore.moods || [],
      freeText: moodStore.freeText || '',
    });
    // 保存完了ページへリダイレクト
    router.push('/user/saved');
  } catch (err) {
    toast.add({
      title: 'お気に入りに追加に失敗しました',
      description: 'もう一度お試しください',
    });
  }
};
</script>

<template>
  <UContainer>
    <UCard v-if="recommendation" class="mx-auto max-w-2xl space-y-6 rounded-2xl shadow-lg">
      <template #header>
        <CoffeeDetailHeader :recommendation="recommendation" />
      </template>

      <!-- 説明 -->
      <BaseSection title="説明" icon="i-lucide-message-square-text">
        <h4 class="mb-1 text-center text-base font-semibold text-gray-800">
          {{ recommendation.subtitle }}
        </h4>
        <p class="text-left text-sm leading-relaxed text-gray-700">
          {{ recommendation.comment }}
        </p>
      </BaseSection>

      <!-- コーヒー豆のブレンド比率 -->
      <BaseSection title="コーヒー豆のブレンド比率" icon="i-lucide-bean">
        <CoffeeBeanPieChart :beans="recommendation.beans" />
      </BaseSection>

      <!-- 味わいの特徴 -->
      <BaseSection title="味わいの特徴" icon="i-lucide-clipboard-list">
        <!-- スライダー項目 -->
        <div class="grid gap-5">
          <div v-for="item in sliderItems" :key="item.label">
            <h4 class="mb-1 text-sm font-semibold text-gray-800">
              {{ item.label }}
            </h4>
            <div class="flex items-center gap-x-2">
              <span class="w-8 text-left text-xs text-gray-500">1</span>
              <USlider
                :model-value="getStepValues(item.value)"
                :min="1"
                :max="5"
                class="flex-1"
                disabled
                :min-steps-between-thumbs="1"
                tooltip
              />
              <span class="w-8 text-right text-xs text-gray-500">5</span>
            </div>
            <div class="mt-1 flex justify-between text-xs text-gray-500">
              <span>{{ item.minLabel }}</span>
              <span>{{ item.maxLabel }}</span>
            </div>
          </div>
        </div>
      </BaseSection>

      <!-- トッピング -->
      <BaseSection
        v-if="recommendation.toppings.length"
        title="相性の良いトッピング"
        icon="i-lucide-coffee"
      >
        <div ref="toppingSectionRef" class="grid gap-3">
          <div
            v-for="(topping, index) in recommendation.toppings"
            :key="index"
            class="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm"
          >
            {{ topping }}
          </div>
        </div>
      </BaseSection>

      <!-- 調整・保存ボタン -->
      <div class="flex flex-col items-center gap-4">
        <UButton
          size="lg"
          class="w-full max-w-xs rounded-full font-bold"
          @click="router.push('/user/adjust')"
          trailing-icon="i-lucide-arrow-right"
        >
          <span class="block w-full text-center">自分好みに調整する</span>
        </UButton>

        <UButton
          size="lg"
          class="w-full max-w-xs rounded-full font-bold"
          :class="'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white'"
          color="primary"
          variant="solid"
          @click="handleFavorite"
          trailing-icon="i-lucide-heart"
        >
          <span class="block w-full text-center">お気に入りに保存する</span>
        </UButton>
      </div>
    </UCard>

    <div v-else-if="isLoading" class="py-10 text-center text-sm text-gray-500">
      <LoadingIndicator
        message="バリスタがコーヒーを準備中です..."
        image="/images/honyo_pc_search.gif"
      />
    </div>

    <div v-else-if="error" class="py-10 text-center text-red-600">
      {{ (error.data as any)?.message ?? 'コーヒーの提案取得に失敗しました' }}
    </div>
  </UContainer>
</template>

<style scoped>
@keyframes waveFade {
  0%,
  100% {
    opacity: 0.2;
    transform: translateY(2px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-wave {
  animation: waveFade 1.5s ease-in-out infinite;
}
</style>
