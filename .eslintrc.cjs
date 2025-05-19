module.exports = {
    root: true,
    env: {
      browser: true,
      node: true,
      es2021: true,
    },
    // VueとTypeScriptを正しく解析するためのパーサ設定
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      sourceType: 'module',
      ecmaVersion: 2020,
      extraFileExtensions: ['.vue'], // .vueファイルも対象に含める
      ecmaFeatures: { jsx: false }, // JSXを使わない場合
      // project: './tsconfig.json',  // ※型チェックを伴うルール用。必要に応じて有効化
    },
    // 推奨設定を拡張
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended', // Vue3標準のルールセット
      'plugin:nuxt/recommended', // Nuxt公式推奨ルール（vue3-essential等を内包）
      'plugin:@typescript-eslint/recommended', // TypeScript推奨ルール
      'plugin:prettier/recommended', // Prettier連携（eslint-config-prettier + plugin）
    ],
    plugins: ['vue', '@typescript-eslint', 'import'],
    rules: {
      // 型専用importは import type を使うことを強制
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports', // 常に`import type`を使用
        },
      ],
      // import文の順序とグループ分けを統一
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // 組み込みモジュール（fs, path等）
            'external', // 外部ライブラリ（node_modules）
            'internal', // 自分のプロジェクト内のモジュール
            'parent', // 親ディレクトリからの相対パス
            'sibling', // 同じディレクトリ内
            'index', // indexファイル
            'object', // オブジェクトimport（構文的にはrareケース）
            'type', // 型のみのimport
          ],
          'newlines-between': 'always', // グループ間は空行を挿入
          alphabetize: { order: 'asc', caseInsensitive: true }, // 各グループ内はアルファベット順:contentReference[oaicite:12]{index=12}
        },
      ],
      // 未使用の変数・importを警告/削除するルール
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['error', { args: 'after-used', argsIgnorePattern: '^_' }],
    },
  };
  