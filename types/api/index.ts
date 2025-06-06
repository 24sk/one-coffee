/**  APIオプション */
export interface APIOption {
  immediate?: boolean;
  server?: boolean;
}

/** APIデータ */
export interface ApiData {
  key: string;
  url: string;
  opts?: APIOption;
  default?: unknown;
}

/** APIデータ（ボディ付き） */
export interface ApiDataWithBody<B = unknown> extends ApiData {
  body: B;
}
