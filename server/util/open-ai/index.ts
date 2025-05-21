/**
 * OpenAIに渡すのプロンプト生成
 * @param moods
 * @param preferences
 * @returns
 */
export const buildPrompt = (moods: string[], preferences: string[] = []) => {
  const moodList = moods.join(', ');
  const preferenceText = preferences.length > 0 ? preferences.join(', ') : '特になし';

  return `
  あなたはプロのバリスタです。
  お客様の気分と好みに合わせて最適なコーヒーを提案してください。
  
  ### 入力情報
  - 気分タグ: ${moodList}
  - 好み: ${preferenceText}
  
  ### 出力形式（日本語、JSON形式で返答してください）
  
  {
    "coffeeName": "〇〇ブレンド",
    "beans": [
      { "origin": "エチオピア", "ratio": 60 },
      { "origin": "モカ", "ratio": 40 }
    ],
    "roast": "中浅煎り",
    "toppings": ["アーモンドミルク", "はちみつ"],
    "comment": "やさしい香りと味わいで、心を穏やかにしてくれるブレンドです。"
  }
  
  ### 注意点
  - **beans** の合計比率は必ず 100% にしてください。
  - コメントは丁寧で、やさしい語り口で 2～3 行程度にまとめてください。
  - 出力は上記の JSON オブジェクトのみ。文章や補足は不要です。
  `;
};
