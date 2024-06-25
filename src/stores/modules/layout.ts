import { defineStore } from 'pinia';
import { reactive } from 'vue';

interface LayerState {
  setKeyboardHeight?: Function;
}

interface LayoutState {
  keyboardHeight: number;
  screen: { width: number; height: number };
}

export const useLayoutStore = defineStore('layout', () => {
  const state = reactive({
    keyboardHeight: 0,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
    },
  });

  return {
    ...state,
  };
});
