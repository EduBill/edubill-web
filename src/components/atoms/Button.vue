<template>
  <button
    ref="refBtn"
    type="button"
    class="atom ui-button"
    :class="{ round: round, shadow: shadow, disabled: disabled }"
    :disabled="disabled"
    @click.stop="createRipple"
    @mousedown.stop="createTouchEffect"
    @mousemove.stop="removeTouchEffect"
    @mouseup.stop="removeTouchEffect"
    @touchstart.passive.stop="createTouchEffect"
    @touchmove.passive.stop="removeTouchEffect"
    @touchend.passive.stop="removeTouchEffect"
  >
    <span
      v-if="isRipple"
      v-show="ripple.animation"
      class="ripple-effect"
      :style="rippleStyle"
    ></span>
    <span
      v-if="isTouchEffect"
      v-show="touchEffect.animation"
      class="touch-effect"
    ></span>
    <template v-if="loading">
      <ui-loader :size="0.5" />
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </button>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import UiLoader from './Loader.vue';

const props = defineProps({
  ripple: {
    type: Boolean,
    default: false,
  },
  touchEffect: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
  shadow: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const isRipple = ref(props.ripple);
const isTouchEffect = ref(props.touchEffect);

const refBtn = ref(null);

const ripple = reactive({
  animation: false,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
});

const touchEffect = reactive({
  animation: false,
});

const rippleStyle = computed(() => ({
  top: `${ripple.y}px`,
  left: `${ripple.x}px`,
  width: `${ripple.width}px`,
  height: `${ripple.height}px`,
}));

function createRipple(e) {
  if (!refBtn.value || ripple.animation) {
    return;
  }

  const rect = refBtn.value?.getBoundingClientRect() || {};
  const diameter = Math.max(rect.width, rect.height) / 2;
  const { clientX } = e;
  const { clientY } = e;
  const offsetTop = rect.top; // + window.pageYOffset
  const offsetLeft = rect.x;

  ripple.x = clientX - offsetLeft;
  ripple.y = clientY - offsetTop;
  ripple.width = diameter;
  ripple.height = diameter;
  ripple.animation = true;

  setTimeout(() => {
    ripple.animation = false;
  }, 300);
}

function createTouchEffect(e) {
  if (!refBtn.value || touchEffect.animation) {
    return;
  }
  touchEffect.animation = true;
  setTimeout(() => {
    touchEffect.animation = false;
  }, 200);
}

function removeTouchEffect(e) {
  if (!refBtn.value || touchEffect.animation) {
    return;
  }

  touchEffect.animation = false;
}
</script>

<style lang="scss" scoped>
.atom.ui-button {
  position: relative;
  display: flex;
  justify-content: center;
  height: unit(60);
  align-items: center;
  font-family: inherit;
  font-size: inherit;
  line-height: 1;
  cursor: pointer;
  @include overflow-hidden;

  .touch-effect {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.1);
    animation: touchEffect 0.2s linear;
  }

  @keyframes touchEffect {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .ui-loader {
    width: 100%;
    height: 100%;
  }

  .ripple-effect {
    position: absolute;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    transform: translate3d(-50%, -50%, 0);
    animation: rippleEffect 0.3s ease-out;
  }

  &.round {
    border-radius: unit(10);
  }

  &.shadow {
    box-shadow: unit(0) unit(0) unit(15) unit(0) rgba(70, 70, 70, 0.1);
  }

  &.disabled {
    cursor: pointer;
    pointer-events: none;
    background-color: rgba(235, 235, 235);
  }

  @keyframes rippleEffect {
    to {
      transform: translate3d(-50%, -50%, 0) scale(4);
      opacity: 0;
    }
  }
}
</style>
