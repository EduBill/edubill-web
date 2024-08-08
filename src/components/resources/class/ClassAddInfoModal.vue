<template>
  <Modal :use-modal="props.useModal" @close="props.handleModalClick">
    <div class="modal_frame_container">
      <header class="modal-frame-header">
        <div class="close-btn">
          <svg-icon name="purpleClose" />
        </div>
        <div class="header-text">이렇게 입력하시겠어요?</div>
      </header>
      <div class="modal-body">
        <ul class="class-info-container">
          <li>
            <div class="class-info-key">수업명</div>
            <div class="class-info-value">기초반</div>
          </li>
          <li>
            <div class="class-info-key">학교</div>
            <div class="class-info-value">영어 유치원</div>
          </li>
          <li>
            <div class="class-info-key">학년</div>
            <div class="class-info-value">없음</div>
          </li>
          <li>
            <div class="class-info-key">학년</div>
            <div class="class-info-value">없음</div>
          </li>
          <li>
            <div class="class-info-key">수업 시간</div>
            <ul class="class-info-timeList">
              <li>월 | 14:00 ~ 18:00</li>
              <li>월 | 14:00 ~ 18:00</li>
            </ul>
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
import SvgIcon from '@/plugins/svg-icon/lib/SvgIcon.vue';
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
  padding: unit(17.5) unit(19) unit(40) unit(17.5);

  .modal-frame-header {
    width: 100%;
    color: #2f2f2f;
    font-weight: 600;
    font-size: unit(18);
    .close-btn {
      width: 100%;
      text-align: right;
    }
    .header-text {
      width: 100%;
      margin-top: unit(5.51);
      text-align: center;
      line-height: 25.5px;
    }
  }

  .modal-body {
    margin-top: unit(20);
    background-color: #f1f1f1;

    border-radius: 10px;
    padding: unit(30) unit(30);

    .class-info-container {
      :deep() {
        li {
          display: flex;
          width: 100%;
          justify-content: space-between;
          font-size: unit(15);
          line-height: 21px;
          .class-info-key {
            color: $color-gray-500;
            font-weight: 600;
          }
          .class-info-value {
            color: #2f2f2f;
            font-weight: 600;
          }
        }
        li:not(:first-child) {
          margin-top: unit(20);
        }

        .class-info-timeList {
          font-size: unit(15);
          font-weight: 400;
          color: #2f2f2f;

          li:not(:first-child) {
            margin-top: unit(6);
          }
        }
      }
    }
  }

  .modal-footer {
    width: 100%;
    margin-top: unit(8);
  }
}
</style>
