<template>
  <template v-if="state.error">
    <launch-error :error="state.error" />
  </template>

  <template v-else>
    <template>
      <launch-loading class="launch-loading" />
    </template>
  </template>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LaunchError from '@/components/resources/launch/LaunchError.vue';
import LaunchLoading from '@/components/resources/launch/LaunchLoading.vue';
import { useSessionStore } from '@/stores/modules/session';

const props = defineProps(['state']);
const emit = defineEmits(['initialize']);

const route = useRoute();
const router = useRouter();
const session = useSessionStore();
// eslint-disable-next-line vue/no-dupe-keys
const state = reactive({
  error: '',
  properties: {},
});

function isNetworkError(e) {
  return e.message === 'Network Error';
}
</script>

<style lang="scss" scoped>
.launch-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // width: 100%;
  // height: 100%;
  z-index: 1;
  background-color: $color-gray-254;
}
</style>
