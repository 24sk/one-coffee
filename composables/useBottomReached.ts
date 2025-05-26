/**
 * ページの下部に到達したかどうかを返す
 * @param offset 下部に到達したとみなすためのオフセット
 * @returns ページの下部に到達したかどうか
 */
import { ref, onMounted, onBeforeUnmount } from 'vue';

export const useBottomReached = (offset = 100) => {
  /** ページの下部に到達したかどうか */
  const isBottomReached = ref(false);

  // デバウンス（例: 100ms）
  let timeout: number | null = null;
  const check = () => {
    if (timeout) clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      isBottomReached.value = scrollY + windowHeight + offset >= documentHeight;
    }, 100);
  };

  onMounted(() => {
    if (import.meta.server) return;
    check();
    window.addEventListener('scroll', check);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', check);
    if (timeout) clearTimeout(timeout);
  });

  return { isBottomReached };
};
