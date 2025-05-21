import { defineStore } from 'pinia';

export const useMoodStore = defineStore('mood', {
  state: () => ({
    selected: [] as string[],
  }),

  actions: {
    setSelectedMoods(moods: string[]) {
      this.selected = moods;
      localStorage.setItem('selectedMoods', JSON.stringify(moods));
    },
    loadFromStorage() {
      const stored = localStorage.getItem('selectedMoods');
      if (stored) {
        this.selected = JSON.parse(stored);
      }
    },
    clear() {
      this.selected = [];
      localStorage.removeItem('selectedMoods');
    },
  },
});
