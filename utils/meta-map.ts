import { WAN_COFFEE } from '../shared/constants';

export interface PageMetaInfo {
  title: string;
  description?: string;
  ogImage?: string;
}

export const pageMetaMap: Record<string, PageMetaInfo> = {
  '/': {
    title: `${WAN_COFFEE} - 今日の気分でコーヒーを提案`,
    description: `愛犬バリスタが今日の気分にぴったりのコーヒーを提案してくれるアプリ「${WAN_COFFEE}」`,
    ogImage: 'https://one-coffee-honyo.vercel.app/images/ogp.jpg',
  },
  '/login': {
    title: 'ログイン',
    description: 'あなたにぴったりのコーヒーを見つけよう！',
  },
  '/user': {
    title: '今日の気分を選ぶ',
    description: 'あなたの気分を選んで、バリスタにぴったりのコーヒーを提案してもらおう！',
  },
  '/user/recommend': {
    title: 'おすすめコーヒー',
    description: '気分にぴったりのコーヒーをご紹介します。',
  },
  '/user/adjust': {
    title: '調整',
    description: '好みに合わせて調整しましょう。',
  },
};
