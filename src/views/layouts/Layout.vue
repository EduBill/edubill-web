<template>
  <div id="wrapper" :style="state.styles">
    <router-view v-slot="{ Component }" :key="$route.fullPath">
      <!-- <transition>
        <component :is="Component" />
      </transition> -->
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from 'vue';
import { useLayoutStore } from '@/stores/modules/layout';
import { useWNInterface } from '@/plugins/vue-wni';
import { useRoute } from 'vue-router';

const route = useRoute();
const layoutStore = useLayoutStore();
const wni = useWNInterface();

const state = reactive({
  keyboard_height: computed(() => layoutStore.keyboardHeight),
  styles: computed(() => {
    if (
      !wni.isAndroid ||
      route.name === 'Coupon' ||
      route.name === 'AddPayment' ||
      route.name === 'ReserveLuggage'
    ) {
      return;
    }

    return { '--keyboard-height': `${state.keyboard_height}px` };
  }),
});

watch(
  () => state.keyboard_height,
  () => {
    if (wni.isAndroid && state.keyboard_height > 0) {
      if (route.name === 'Coupon') {
        return;
      }

      setTimeout(() => {
        window.scrollBy({ top: state.keyboard_height - 120 });
      }, 300);
    }
  }
);
</script>
<style lang="scss">
body {
  background-color: #fafafa;
}
#wrapper {
  width: 100%;
  min-height: -webkit-fill-available;
  min-height: $device-height;
  // display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  &::after {
    content: '';
    display: block;
    height: var(--keyboard-height);
  }

  > .page {
    width: 100vw;
    max-width: $max-content-width;
    background-color: $color-white;
    box-sizing: content-box;

    &::before {
      content: ' ';
      position: fixed;
      z-index: -1;
      background-color: $color-white;
      top: 0;
      left: auto;
      right: auto;
      width: 100vw;
      max-width: $max-content-width;

      min-height: -webkit-fill-available;
      min-height: $device-height;
    }
  }
}

#app {
  margin: 0 auto;
  height: 100%;
  max-width: $max-content-width;
  background-color: #fefefe;
}

.app-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fefefe;

  &::before {
    content: '';
    display: block;
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: #fefefe;
    z-index: -1;
  }
}

.page-content {
  position: relative;
  // background-color: $color-page-background;

  width: 100%;
  min-height: 100%;
  // padding!
  // padding: $page-side-margin;
  // padding-top: $page-header-height;

  &.fixed {
    max-width: $max-content-width;
  }

  &:not(.has-actions).has-bottom-tabbar {
    padding-bottom: unit(118);
  }

  &:not(.has-bottom-tabbar).has-actions {
    padding-bottom: unit(148);
  }

  &.has-actions.has-bottom-tabbar {
    padding-bottom: unit(198);
  }
}
</style>
