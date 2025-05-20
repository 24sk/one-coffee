<script setup lang="ts">
useHead({
  title: 'One Coffee - 今日の気分でコーヒーを提案',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      name: 'description',
      content: '愛犬バリスタが今日の気分にぴったりのコーヒーを提案してくれるアプリ「One Coffee」',
    },

    // Open Graph（Facebook や LINE 向け）
    { property: 'og:title', content: 'One Coffee - 気分で選ぶコーヒー提案アプリ' },
    {
      property: 'og:description',
      content: '愛犬バリスタがあなたの気分に合わせてコーヒーを提案します。',
    },
    { property: 'og:image', content: 'https://one-coffee-honyo.vercel.app/images/ogp.jpg' },
    { property: 'og:url', content: 'https://one-coffee-honyo.vercel.app/' },
    { property: 'og:type', content: 'website' },

    // Twitterカード
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'One Coffee - 気分で選ぶコーヒー提案アプリ' },
    { name: 'twitter:description', content: '愛犬バリスタが気分に合わせたコーヒーをおすすめ！' },
    { name: 'twitter:image', content: 'https://one-coffee-honyo.vercel.app/images/ogp.jpg' },
  ],
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
