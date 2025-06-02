<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { userMenuItems } from '~/shared/constants';

const user = useSupabaseUser();

/** ナビゲーションメニュー用アイテム */
const userNavigationItems = computed<NavigationMenuItem[]>(() =>
  userMenuItems.map(({ key, label, to, icon }) => {
    return { key, label, to, icon };
  })
);
</script>

<template>
  <div>
    <!-- 上部ヘッダー -->
    <UHeader mode="slideover" to="/">
      <template #title>
        <div class="flex items-center gap-3">
          <UAvatar
            :src="user?.user_metadata.avatar_url"
            :alt="`${user?.user_metadata.name} Icon`"
          />
          <h1>
            {{ user?.user_metadata.name ?? 'ゲスト' }}
          </h1>
        </div>
      </template>

      <template #right>
        <UNavigationMenu :items="userNavigationItems" variant="link" class="hidden lg:block" />
      </template>

      <template #body>
        <UNavigationMenu :items="userNavigationItems" orientation="vertical" class="-mx-2.5" />
      </template>
    </UHeader>
  </div>
</template>
