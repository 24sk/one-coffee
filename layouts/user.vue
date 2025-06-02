<template>
  <div class="bg-background text-foreground flex min-h-screen flex-col">
    <!-- ヘッダー -->
    <UserHeader />

    <!-- メイン -->
    <UMain class="flex-1 p-4">
      <slot />
    </UMain>
  </div>
</template>
