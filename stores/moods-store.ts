import { defineStore } from 'pinia';
import { PINIA } from '~/shared/constants';
import type { RecommendRequest } from '~/types/recommend';

/** ローカルストレージのキー */
export const MOOD_LOCAL_STORAGE_KEY = `${PINIA}-moods`;

export const useMoodStore = defineStore('mood', {
  state: (): RecommendRequest => ({
    moods: [],
    freeText: '',
  }),

  actions: {
    setSelectedMoods(moods: string[]) {
      this.moods = moods;
    },
    setSelectedFreeText(text: string) {
      this.freeText = text;
    },
    clear() {
      this.moods = [];
      this.freeText = '';
    },
  },
  persist: {
    // pinia-plugin-persistedstate のローカルストレージを指定
    storage: piniaPluginPersistedstate.localStorage(),
    key: MOOD_LOCAL_STORAGE_KEY,
  },
});
