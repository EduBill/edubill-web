import { defineStore } from 'pinia';

interface LayerState {
  setKeyboardHeight?: Function;
}

interface LayoutState {
  keyboardHeight: number;
  screen: { width: number; height: number };
}

export const useLayoutStore = defineStore({
  id: 'layout',
  state: (): LayoutState => ({
    keyboardHeight: 0,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
    },
  }),
  getters: {},
  actions: {
    initialize() {
      window.addEventListener('resize', this.updateHeightSize);
      setTimeout(() => {
        this.updateHeightSize();
      }, 0);
    },
    updateHeightSize() {
      window.document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      );
    },
    unit(size) {
      const unitRatio = 0.0625;

      let unitSize = 16;

      if (this.screen.width >= 568) {
        unitSize = 20;
      } else if (this.screen.width >= 425) {
        unitSize = 18;
      } else if (this.screen.width >= 375) {
        unitSize = 16;
      } else if (this.screen.width >= 0) {
        unitSize = 14;
      }
      return unitSize * unitRatio * size;
    },
    setKeyboardHeight(height) {
      this.keyboardHeight = height;
    },
  },
});
