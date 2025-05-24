import { RecommendResponse } from '~/types/recommend';

export const recommend: RecommendResponse = {
  coffeeName: 'カーミング ブレンド',
  subtitle: 'リラックスしたいあなたへ',
  beans: [
    {
      origin: 'ブラジル',
      ratio: 50,
    },
    {
      origin: 'コロンビア',
      ratio: 50,
    },
  ],
  roast: '中煎り',
  roastLevel: 3,
  acidity: 2,
  body: 3,
  toppings: ['生クリーム', 'カカオ'],
  comment:
    '落ち着きのあるブラジル産とフルーティーなコロンビア産のバランスが取れたブレンド。加えたトッピングがさらなるリラクゼーションをもたらします。',
};
