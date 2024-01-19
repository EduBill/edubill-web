<template>
  <div id="app-container" ref="app" :class="appClassNames">
    <!-- <svg-icon name="home" /> -->
    <router-view />

    <template>
      <global-error />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
// import { useResizeObserver } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import SvgIcon from '@/plugins/svg-icon/lib/SvgIcon.vue';
import GlobalError from '@/views/errors/Error.vue';
import { useWNInterface } from '@/plugins/vue-wni';
import { useLayoutStore } from '@/stores/modules/layout';

const app = ref(null);
const wni = useWNInterface();
const layoutStore = useLayoutStore();
const route = useRoute();

const state = reactive({
  isReady: false,
  error: null,
});

const androidExit = reactive({
  is_exit: false,
  timeout: null,
});

const appClassNames = computed(() => {
  return [];
});
const router = useRouter();

function updateHeightSize() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// useResizeObserver(app, (entries) => {
//   const entry = entries[0];
//   const { width, height } = entry.contentRect;

//   updateHeightSize();

// });
function initWNInterface() {
  return new Promise((resolve, reject) => {
    wni.onReady(e => {
      wni.onBack(() => {
        if (wni.isAndroid) {
          if (!history.state.back && route.name !== 'Home') {
            router.replace({ name: 'Home' });
            return;
          }

          if (!history.state.back && route.name === 'Home') {
            tryToExit();
            return;
          }

          router.back();
        }
      });

      wni.onKeyboard(data => {
        if (data.isVisibility === true) {
          layoutStore.setKeyboardHeight(data.height);
        } else {
          layoutStore.setKeyboardHeight(0);
        }
      });

      resolve(e);
    });
  });
}

function tryToExit() {
  if (androidExit.is_exit) {
    wni.execute('wnAppClose', {});
    androidExit.is_exit = false;
    return;
  }

  androidExit.is_exit = true;
  androidExit.timeout = setTimeout(() => {
    androidExit.timeout = null;
    androidExit.is_exit = false;
  }, 2000);
}
onBeforeMount(async () => {
  updateHeightSize();
  await initWNInterface();
  document.title = 'EduBill';
});
</script>

<style lang="scss">
#app-container {
  width: 100%;
}
</style>
