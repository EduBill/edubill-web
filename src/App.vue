<template>
  <div ref="refApp" class="app-container">
    <template v-if="canUseRouter">
      <router-view />
    </template>

    <template v-if="!canUseRouter">
      <page-launch :state="state.appStatus" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
// import { useResizeObserver } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import SvgIcon from '@/plugins/svg-icon/lib/SvgIcon.vue';
import GlobalError from '@/views/errors/Error.vue';
import PageLaunch from '@/views/pages/launch/PageLaunch.vue';
import { useWNInterface } from '@/plugins/vue-wni';
import { NativeInterceptor } from '@/plugins/native-interceptor';
import { useLayoutStore } from '@/stores/modules/layout';
import { useSessionStore } from '@/stores/modules/session';

const app = ref(null);
const wni = useWNInterface();
const layoutStore = useLayoutStore();
const route = useRoute();
const session = useSessionStore();
const nativeInterceptor = new NativeInterceptor();

const state = reactive({
  appStatus: 'LAUNCHED',
  error: null as any,
});

const canUseRouter = computed(() => {
  return state.appStatus === 'LAUNCHED' || state.appStatus === 'EXTERNAL';
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

async function initApp() {
  await session.init();
}

function initWNInterface() {
  return new Promise((resolve, reject) => {
    wni.onReady(e => {
      wni.onAppear(e => {
        onDarkMode();
        onSetBadgeNumber();
      });
      wni.onBack(() => {
        if (wni.isAndroid) {
          if (!history.state.back && route.name !== 'Home') {
            router.replace({ name: 'Home' });
            return;
          }

          if (nativeInterceptor.isShowNativeComponents) {
            nativeInterceptor.closeNativeComponents();
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

      resolve(wni);
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

function onDarkMode() {}

function onResize(e) {
  updateHeightSize();
}

function onSetBadgeNumber(number = 0) {
  wni.execute('wnPushBadgeNumber', {
    number,
  });
}

onBeforeMount(() => {
  updateHeightSize();
  initApp();
  initWNInterface();
  document.title = 'EduBill';
});
</script>

<style lang="scss">
.app-container {
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
}
</style>
