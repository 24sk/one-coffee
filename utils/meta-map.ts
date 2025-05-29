export interface PageMetaInfo {
    title: string;
    description?: string;
    ogImage?: string;
  }
  
  export const pageMetaMap: Record<string, PageMetaInfo> = {
    '/': {
    title: 'One Coffee - 今日の気分でコーヒーを提案',
    description: '愛犬バリスタが今日の気分にぴったりのコーヒーを提案してくれるアプリ「One Coffee」',
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
    title: 'カスタマイズ',
    description: 'さらに好みに合わせてカスタマイズしましょう。',
  },
  };
  