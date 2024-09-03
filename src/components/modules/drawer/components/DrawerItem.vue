<template>
  <transition :name="transitionName">
    <li
      v-if="state.mounted"
      ref="background"
      class="drawer-item"
      :class="classNames"
      @mousedown="onMouseDown"
      @touchdown="onMouseDown"
    >
      <div ref="drawerRef" class="container" :style="styles" @click.stop="">
        <component
          :is="payload.component"
          :id="payload.id"
          v-model:data="payload.data"
          :events="payload.events"
          @close="onClose"
        />

        <div v-if="useCloseButton" class="drawer-backward-header">
          <div class="drawer-backward-header__container">
            <button
              class="drawer-backward-header__button"
              touch-effect
              @click="onClickClose"
            >
              <svg
                width="48"
                height="48"
                viewBox="-12 -12 48 48"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 5L19 19"
                  stroke="#C8C8C8"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 19L19 5"
                  stroke="#C8C8C8"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  </transition>
</template>

<script lang="ts" setup>
import {
  computed,
  nextTick,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  // eslint-disable-next-line import/named
  PropType,
  reactive,
  ref,
  watch,
} from 'vue';

import { useDrawerModule } from '..';
import {
  DrawerCloseButtonPosition,
  DrawerItem,
  DrawerPosition,
  DrawerSize,
  DrawerTransitionName,
} from '../types';
import { useLayoutStore } from '@/stores/modules/layout';
import { useWNInterface } from '@/plugins/vue-wni';

const wni = useWNInterface();
const drawerModule = useDrawerModule();
const background = ref(null);
const drawerRef = ref(null);
const layoutStore = useLayoutStore();

const props = defineProps({ payload: Object as PropType<DrawerItem> });
const state = reactive({
  mounted: false,
  keyboard_height: computed(() => layoutStore.keyboardHeight),
});

const payload = computed(() => props.payload as DrawerItem);
const styles = computed(() => {
  if (!wni.isAndroid) {
    return {
      'background-color': props.payload?.backgroundColor,
    };
  }

  return {
    '--keyboard-height': `${state.keyboard_height}px`,
    'background-color': props.payload?.backgroundColor,
  };
});

const classNames = computed(() => {
  const classes: any = {};

  if (props.payload?.noPadding) {
    classes['no-padding'] = true;
  }

  if (props.payload?.position === DrawerPosition.BOTTOM) {
    classes['position-bottom'] = true;
  } else if (props.payload?.position === DrawerPosition.CENTER) {
    classes['position-center'] = true;
  } else if (props.payload?.position === DrawerPosition.TOP) {
    classes['position-top'] = true;
  } else if (props.payload?.position === DrawerPosition.BOTTOM_NO_PADDING) {
    classes['position-bottom-no-padding'] = true;
  }

  if (props.payload?.closeButtonPosition === DrawerCloseButtonPosition.OUTER) {
    classes['close-button-outer'] = true;
  }

  if (props.payload?.size === DrawerSize.FULL) {
    classes.full = true;
  }

  if (props.payload?.useModal === true) {
    classes.modal = true;
  }
  return classes;
});

const useCloseButton = computed(() => props.payload?.useCloseButton === true);
const transitionName = computed(() => {
  if (props.payload?.animationName === DrawerTransitionName.DEFAULT) {
    if (props.payload?.position === DrawerPosition.TOP) {
      return DrawerTransitionName.SLIDE_DOWN;
    } else if (props.payload?.position === DrawerPosition.CENTER) {
      return DrawerTransitionName.SLIDE_UP;
    }

    return DrawerTransitionName.SLIDE_UP;
  }

  return props.payload?.animationName;
});

onMounted(async () => {
  await openDrawer();
  const body = document.querySelector('body');
  body.style.overflow = 'hidden';
});

async function openDrawer() {
  await nextTick();
  state.mounted = true;
}

async function closeDrawer() {
  state.mounted = false;
  await nextTick();
  const body = document.querySelector('body');
  body.style.overflow = 'auto';
  drawerModule.dismiss({ id: props.payload?.id });
}

async function onMouseDown(e) {
  if (props.payload?.canCloseForModal === true) {
    await nextTick();

    if (e.target == background.value && e.which === 1) {
      await closeDrawer();
    }
  }
}

// eslint-disable-next-line require-await
async function onClickClose(e) {
  setTimeout(() => {
    closeDrawer();
  }, 10);
}

async function onClose(e) {
  await closeDrawer();
}
</script>

<style lang="scss" scoped>
.drawer-item {
  z-index: 800;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  :deep() {
    .resource {
      overflow: hidden;
      border-radius: $border-radius-large;
    }
  }

  & > .container {
    /* padding-top: unit(20); */
    width: 100%;
    max-width: $max-content-width;

    min-height: unit(120);
    /* max-height: calc(100vh - #{unit(78)}); */

    // box-shadow: unit(0) unit(1) unit(5) #a9afb3;
    overflow: hidden;
    overscroll-behavior-y: contain;
    z-index: 1;
    position: relative;

    /* background-color: $color-white; */
    // padding: unit(16);
    &::after {
      content: '';
      display: block;
      height: var(--keyboard-height);
    }
  }

  & > .container {
    overflow: visible;
  }

  &.modal {
    @include fsf;
    @include column-flexbox();
    overflow-x: hidden;
    box-sizing: border-box;
    /* &::before {
      content: "";
      @include fsa;
      background-color: $color-shadow;
    } */
  }

  &.no-padding {
    & > .container {
      padding-top: 0;
    }
  }

  &.position-top {
    top: 0;

    & > .container {
      margin: 0 auto auto auto;
      border-radius: 0px 0px unit(24) unit(24);
    }
  }

  &.position-center {
    padding: 0 unit(24);
    & > .container {
      margin: auto;
      border-radius: $border-radius-large;
    }
  }

  &.position-bottom {
    bottom: 0;

    & > .container {
      margin: auto auto 0 auto;
      padding-bottom: env(safe-area-inset-bottom);
      border-radius: unit(24) unit(24) 0px 0px;
    }
  }

  &.position-bottom-no-padding {
    bottom: 0;

    & > .container {
      margin: auto auto 0 auto;
      border-radius: unit(24) unit(24) 0px 0px;
    }
  }

  &.full {
    background-color: $color-white;
    & > .container {
      @include fill-viewport-min-height;
      @include shadow-box;
      max-width: $max-content-width;
      margin: auto;
      background-color: $color-white;
    }

    .drawer-backward-header {
      &__button {
        svg {
          color: $color-black;
        }
      }
    }
  }

  .drawer-backward-header {
    width: unit(56);
    height: unit(56);

    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;

    &__container {
      display: flex;
    }

    &__button {
      width: unit(56);
      height: unit(56);

      svg {
        width: 100%;
        height: 100%;
        object-fit: contain;
        color: $color-gray-200;
      }
    }
  }

  &.close-button-outer {
    .drawer-backward-header {
      position: absolute;
      top: unit(-48);
      right: unit(-16);
    }
  }
}

.drawer-item {
  display: block;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 350ms cubic-bezier(0.45, 0, 0.55, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%) !important;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 250ms cubic-bezier(0.45, 0, 0.55, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 250ms cubic-bezier(0.45, 0, 0.55, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0.1;
}
</style>
