export const WAN_COFFEE = 'Wan Coffee' 

/** ストアキーのprefix */
export const PINIA = 'pinia';

/** コーヒー豆毎のチャート配色 */
export const BEAN_COLORS = [
  '#C0D6DF', // 青
  '#AEC3B0', // 緑
  '#FFD6A5', // オレンジ
  '#FFADAD', // 赤
  '#CAFFBF', // ライトグリーン
  '#B5EAEA', // 水色
];

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
      key: 'adjust',
      label: '調整',
      to: '/user/adjust',
      icon: 'i-lucide-coffee',
    },
  ] as const;
  
