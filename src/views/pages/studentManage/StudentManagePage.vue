<template>
  <div class="container">
    studentManagePage
    <div @click="handleModalClick">클릭해봐</div>
    <Modal :use-modal="useModal" @close="handleModalClick">
      <div class="modal-content">모달ㅇ디지롱</div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '../../../components/modules/modal/Modal.vue';
const useModal = ref(false);

function handleModalClick() {
  useModal.value = !useModal.value;
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  position: relative;
  padding: unit(20) unit(42);
  font-size: unit(15);
  font-weight: 600;
  gap: unit(20);
}
.modal-content {
  width: 200px;
  height: 200px;
  background-color: white;
}
</style>
