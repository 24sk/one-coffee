<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

defineProps<{
  collapsed?: boolean;
}>();

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      type: 'label',
      label: user.value?.user_metadata.name,
      avatar: {
        src: user.value?.user_metadata.avatar_url,
        alt: user.value?.user_metadata.name,
      },
    },
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user',
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card',
    },
    {
      label: 'Settings',
      icon: 'i-lucide-settings',
    },
  ],
  [
    {
      label: 'Log out',
      icon: 'i-lucide-log-out',
      onClick: logOut,
    },
  ],
]);

// ログアウト処理
const logOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    router.push('/login');
  } else {
    console.error('ログアウトエラー:', error.message);
  }
};
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      v-bind="{
        name: user?.user_metadata.name,
        avatar: {
          src: user?.user_metadata.avatar_url,
          alt: user?.user_metadata.name,
        },
        label: collapsed ? undefined : user?.user_metadata.name,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :ui="{
        trailingIcon: 'text-dimmed',
      }"
    />

    <template #chip-leading="{ item }">
      <span
        :style="{ '--chip': `var(--color-${(item as any).chip}-400)` }"
        class="ms-0.5 size-2 rounded-full bg-(--chip)"
      />
    </template>
  </UDropdownMenu>
</template>
