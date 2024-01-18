<template>
  <div id="app-container" ref="app" :class="appClassNames">
    <router-view />

    <template>
      <global-error />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
// import { useResizeObserver } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import GlobalError from '@/views/errors/Error.vue';

const app = ref(null);

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

onBeforeMount(() => {
  updateHeightSize();

  document.title = 'EduBill';
});
</script>

<style lang="scss">
#app-container {
  width: 100%;
}
</style>
