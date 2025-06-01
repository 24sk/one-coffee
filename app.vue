<script setup lang="ts">
import { useRoute } from 'vue-router';
import { WAN_COFFEE } from '~/shared/constants';

const route = useRoute();

const defaultMeta = {
  title: `${WAN_COFFEE} - 今日の気分でコーヒーを提案`,
  description: `愛犬バリスタが今日の気分にぴったりのコーヒーを提案してくれるアプリ「${WAN_COFFEE}」`,
  ogImage: 'https://one-coffee-honyo.vercel.app/images/ogp.jpg',
};

const currentMeta = computed(() => pageMetaMap[route.path] ?? defaultMeta);

// metaタグを生成しつつ、undefined をフィルタ
const metaTags = computed(
  () =>
    [
      { name: 'description', content: currentMeta.value.description },
      { property: 'og:title', content: currentMeta.value.title },
      { property: 'og:description', content: currentMeta.value.description },
      { property: 'og:image', content: currentMeta.value.ogImage },
      { property: 'og:url', content: `https://one-coffee-honyo.vercel.app${route.path}` },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: currentMeta.value.title },
      { name: 'twitter:description', content: currentMeta.value.description },
      { name: 'twitter:image', content: currentMeta.value.ogImage },
    ].filter((tag) => !!tag?.content) // ここで無効なタグを除外
);

useHead({
  title: `${currentMeta.value.title} | ${WAN_COFFEE}`,
  meta: metaTags.value,
  link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }],
});
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
