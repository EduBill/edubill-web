<template>
  <teleport to="#teleport-area">
    <div v-if="props.useModal" class="modal-bg" @click="closeModal">
      <div class="modal-content" @click.stop>
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
const props = defineProps({
  useModal: {
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits(['close']);
function closeModal() {
  setTimeout(() => {
    emits('close');
  }, 10);
}
</script>

<style lang="scss" scoped>
.modal-bg {
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
