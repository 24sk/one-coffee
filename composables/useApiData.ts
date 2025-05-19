import type { ApiData } from '~/types';

/**
 * APIデータを取得するためのカスタムコンポーザブル
 * @param key - データのキー
 * @param url - APIのURL
 * @param opts - オプション
 * @returns データ、ローディング状態、エラー、更新関数
 */
export const useApiData = <T>(apiData: ApiData) => {
  const { key, url, opts } = apiData;
  const fetcher = async (): Promise<T> => {
    try {
      const response = await $fetch<T>(url);
      return response as T;
    } catch (error) {
      console.error(`API取得に失敗しました: ${url}`, error);
      throw error;
    }
  };

  const { data, pending, error, refresh } = useAsyncData<T>(key, fetcher, {
    server: opts?.server ?? true,
    lazy: opts?.immediate === false,
  });

  return { data, pending, error, refresh };
};
