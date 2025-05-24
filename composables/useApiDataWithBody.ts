import type { ApiDataWithBody } from '~/types';

export const useApiDataWithBody = <T, B = unknown>(apiData: ApiDataWithBody<B>) => {
  const { key, url, opts, body } = apiData;

  const fetcher = async (): Promise<T> => {
    try {
      const res = await $fetch(url, {
        method: 'POST',
        body: body as any,
      });
      return res as T;
    } catch (error) {
      console.error(`API取得に失敗しました: ${url}`, error);
      throw error;
    }
  };

  const { data, pending, error, refresh, execute } = useAsyncData<T>(key, fetcher, {
    server: opts?.server ?? false,
    lazy: opts?.immediate === false,
  });

  return { data, pending, error, refresh, execute };
};
