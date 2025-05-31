import { defineStore } from 'pinia';
import { PINIA } from '~/shared/constants';
import type { RecommendResponse } from '~/types/recommend';

/** ローカルストレージのキー */
export const RECOMMEND_LOCAL_STORAGE_KEY = `${PINIA}-recommendation`;

export const useRecommendStore = defineStore('recommend', {
  state: (): { recommendation: RecommendResponse | null } => ({
    recommendation: null,
  }),

  actions: {
    setRecommendation(data: RecommendResponse) {
      this.recommendation = data;
    },
    clear() {
      this.recommendation = null;
    },
  },

  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
    key: RECOMMEND_LOCAL_STORAGE_KEY,
  },
});
