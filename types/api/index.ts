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
}
