<template>
  <Modal :use-modal="props.useModal" @close="props.handleModalClick">
    <div class="modal_frame_container">
      <header class="modal-frame-header">
        <div class="close-btn">x</div>
        <div class="header-text">이렇게 입력하시겠어요?</div>
      </header>
      <div class="modal-body">
        <ul class="class-info-container">
          <li>
            <div>수업명</div>
            <div></div>
          </li>
          <li>
            <div>학교</div>
            <div></div>
          </li>
          <li>
            <div>학년</div>
            <div></div>
          </li>
          <li>
            <div>학년</div>
            <div></div>
          </li>
          <li>
            <div>수업 시간</div>
            <div></div>
          </li>
        </ul>
      </div>
      <footer class="modal-footer">
        <Buttons
          class="btn-text"
          variants="long"
          :disabled="false"
          :color="'selected'"
          :text="'정확해요'"
        />
      </footer>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Buttons from '../buttons/Buttons.vue';

import Modal from '@/components/modules/modal/Modal.vue';
const props = defineProps({
  useModal: {
    type: Boolean,
    required: true,
  },
  handleModalClick: {
    type: Function,
    required: true,
  },
});

function handleSubmit() {}
</script>

<style lang="scss" scoped>
.modal_frame_container {
  width: 89%;
  border-radius: 20px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 54%;
  padding: unit(17.5) unit(17.5);
  .modal-frame-header {
    width: 100%;

    .close-btn {
      width: 100%;
      text-align: right;
    }
    .header-text {
      width: 100%;
      margin-top: unit(5.51);
      text-align: center;
    }
  }

  .modal-body {
    margin-top: unit(20);
    background-color: #f1f1f1;
    width: unit(295);
    height: unit(272);
    padding: unit(30) unit(30);

    .class-info-container {
    }
  }

  .modal-footer {
    width: 100%;
    margin-top: unit(8);
  }
}
</style>
