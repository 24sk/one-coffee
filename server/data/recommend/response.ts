import { RecommendResponse } from '~/types/recommend';

export const recommend: RecommendResponse = {
  id: '17b4bf9a-df91-423d-a399-f41f2577d9f4',
  coffeeName: 'テスト ブレンド',
  subtitle: 'テストしたいあなたへ',
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
