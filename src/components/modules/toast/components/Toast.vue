<template>
  <teleport to="#teleport-area">
    <div
      class="toast-container"
      :class="{
        'has-actions': toastModule.hasActions,
        'has-action-box': toastModule.hasActionBox,
      }"
    >
      <transition-group tag="ul" name="toast">
        <toast-item v-for="(item, i) in items" :key="item.id" :data="item" />
      </transition-group>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useToastModule } from '..';
import ToastItem from './ToastItem.vue';

const toastModule = useToastModule();
const items = computed(() => toastModule.items);
</script>

<style lang="scss" scoped>
// .toast-container {
//   display: block;

//   &.has-actions {
//     .toast-item {
//       bottom: unit(80);
//     }
//   }

//   &.has-action-box {
//     .toast-item {
//       bottom: unit(120);
//     }
//   }
// }
.toast-container {
  display: block;

  .toast-move,
  .toast-enter-active,
  .toast-leave-active {
    transition: all 0.5s ease;
  }

  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .toast-leave-active {
    position: absolute;
  }
}
</style>
