import type { RecommendRequest } from '~/types/recommend';

/**
 * OpenAIに渡すプロンプト生成
 * @param recommendRequest
 * @returns おすすめコーヒー情報
 */
export const buildPrompt = (recommendRequest: RecommendRequest): string => {
  const { moods, freeText } = recommendRequest;
  const moodList = moods?.join(', ') || '特になし';
  const freeTextFormatted = freeText?.trim() || '特になし';

  return `
あなたはプロのバリスタです。
お客様の気分・好み・自由なご要望を参考に、最適なコーヒーを提案してください。

### 入力情報
- 気分タグ: ${moodList}
- フリーテキスト: ${freeTextFormatted}

### 出力形式

{
  "coffeeName": "〇〇ブレンド",
  "subtitle": "〇〇な気分のあなたに",
  "beans": [
    { "origin": "エチオピア", "ratio": 60 },
    { "origin": "モカ", "ratio": 40 }
  ],
  "roast": "中浅煎り",
  "roastLevel": 3,
  "acidity": 4,
  "body": 2,
  "toppings": ["アーモンドミルク", "はちみつ"],
  "comment": "やさしい香りと味わいで、心を穏やかにしてくれるブレンドです。"
}

### 注意点
- 必ず recommendCoffee 関数を呼び出し、**全フィールドを正確に埋めてください**。
- **beans** の合計比率は必ず 100% にしてください。
- **subtitle** は「このコーヒーが誰に向いているか」を簡潔に **15文字程度** で表現してください（例: 軽やかな風味のエスプレッソを楽しみたい方に）。
- **roastLevel**, **acidity**, **body** はそれぞれ 1〜5 の整数値で記述してください。
  - 1 = 軽め／控えめ、5 = 強め／深め
- **toppings** は最低1つ以上提案してください（例: ミルク、シナモン、はちみつなど）
- コメントは丁寧で、やさしい語り口で 2～3 行程度にまとめてください。
- 文章や補足は不要です。
- 出力は**日本語**で返答してください。
`;
};
