/** ストアキーのprefix */
export const PINIA = 'pinia';

/** 共通のメニュー定義 */
export const baseItems = [
    {
      key: 'mood',
      label: '今日の気分',
      to: '/user',
      icon: 'i-lucide-smile',
    },
    {
      key: 'recommend',
      label: 'おすすめ',
      to: '/user/recommend',
      icon: 'i-lucide-bean',
    },
    {
      key: 'customize',
      label: 'カスタマイズ',
      to: undefined,
      icon: 'i-lucide-coffee',
    },
  ] as const;
  
