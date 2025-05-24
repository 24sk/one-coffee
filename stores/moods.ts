import { defineStore } from 'pinia';
import { PINIA } from '~/shared/constants';

/** ローカルストレージのキー */
export const MOOD_LOCAL_STORAGE_KEY = `${PINIA}-moods`;

export const useMoodStore = defineStore('mood', {
  state: () => ({
    selectedMoods: [] as string[],
  }),

  actions: {
    setSelectedMoods(moods: string[]) {
      this.selectedMoods = moods;
    },
    clear() {
      this.selectedMoods = [];
    },
  },
  persist: {
    // pinia-plugin-persistedstate のローカルストレージを指定
    storage: piniaPluginPersistedstate.localStorage(),
    key: MOOD_LOCAL_STORAGE_KEY,
  },
});
