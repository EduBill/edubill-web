<template>
  <li class="toast-item" :class="type" :style="{ ...itemPosition }">
    <div class="container">
      <svg-icon name="info-bang" />
      <p class="toast-body">
        {{ message }}
      </p>
      <button class="close" @click="removeItem">
        {{ '닫기' }}
      </button>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import type { PropType } from 'vue';
import { useToastModule } from '..';
import { ToastItem, ToastType } from '../types';
import { useLayoutStore } from '@/stores/modules/layout';

const toastModule = useToastModule();
const layout = useLayoutStore();

const props = defineProps({
  data: {
    type: Object as PropType<ToastItem>,
    default: () => {},
  },
});
const type = ref((props.data.type ?? ToastType.ALERT).toLowerCase());
const message = computed(() => {
  const e = props.data.message as any;

  if (e) {
    if (typeof e === 'string') {
      return e;
    } else if (e.data && e.data.error) {
      return e.data.error;
    } else if (e.error_msg) {
      return e.error_msg;
    } else if (e.details) {
      return e.details;
    } else if (typeof e === 'object') {
      return e.toString();
    }
  }

  return 'Unknown Message';
});
const itemPosition = computed(() => {
  return {
    bottom: toastModule?.margin?.bottom
      ? `${layout.unit(toastModule?.margin?.bottom)}px`
      : null,
    top: toastModule?.margin?.top
      ? `${layout.unit(toastModule?.margin?.top)}px`
      : null,
    left: toastModule?.margin?.left
      ? `${layout.unit(toastModule?.margin?.left)}px`
      : null,
    right: toastModule?.margin?.right
      ? `${layout.unit(toastModule?.margin?.right)}px`
      : null,
  };
});

onMounted(() => {
  if (props.data.duration !== null) {
    setTimeout(removeItem, props.data?.duration ?? 3500);
  }
});

function removeItem() {
  toastModule.hide(props.data);
}
</script>

<style lang="scss" scoped>
.toast-item {
  @include fsf;
  top: auto;
  max-width: $max-content-width;
  width: 100%;
  margin: unit(16) auto;
  z-index: 1700;
  overflow: visible;

  & .container {
    @include flexbox(start);
    @include shadow-level(shadow2);
    position: relative;
    margin: 0 $page-side-margin;
    padding: 0 unit(16);
    min-height: unit(40);
    border-radius: $border-radius-medium;
    background-color: #fff;
    .svg-icon {
      font-size: unit(24);
    }

    button {
      @include text-variant(caption, $color-gray-120);
      margin-left: auto;
      min-width: unit(21);
    }
  }

  .toast-body {
    @include text-variant(body4);
  }

  & {
    color: #292a2b;
  }

  &.error {
    color: $color-state-error;
  }

  &.success {
    color: $color-state-success;
  }
}
</style>
