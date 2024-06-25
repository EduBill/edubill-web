import { useLayoutStore } from '@/stores/modules/layout';
const layoutStore = useLayoutStore();

export function initialize() {
  window.addEventListener('resize', updateHeightSize);
  setTimeout(() => {
    updateHeightSize();
  }, 0);
}

export function updateHeightSize() {
  window.document.documentElement.style.setProperty(
    '--vh',
    `${window.innerHeight * 0.01}px`
  );
}
export function unit(size) {
  const unitRatio = 0.0625;

  let unitSize = 16;

  if (layoutStore.screen.width >= 568) {
    unitSize = 20;
  } else if (layoutStore.screen.width >= 425) {
    unitSize = 18;
  } else if (layoutStore.screen.width >= 375) {
    unitSize = 16;
  } else if (layoutStore.screen.width >= 0) {
    unitSize = 14;
  }
  return unitSize * unitRatio * size;
}
export function setKeyboardHeight(height) {
  layoutStore.keyboardHeight = height;
}
