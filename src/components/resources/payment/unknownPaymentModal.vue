<template>
  <div>
    <Modal :use-modal="props.useModal" @click="props.handleModalClick">
      <div class="modal_frame_container">
        <div class="modal_content_container">
          <div class="text">
            입금자가 확인되지 않은 내역 중<br />{{ props.name }} 학생의 납입
            내역으로<br />선택하시겠습니까?
          </div>
          <div class="button_container">
            <Buttons
              variants="short"
              text="네"
              color="selected"
              @click="navigateToUnknownList"
            />
            <Buttons
              variants="long"
              text="아니요 수동입력할게요"
              color="disabled"
              @click="navigateToManualInput"
            />
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Modal from '@/components/modules/modal/Modal.vue';
import Buttons from '@/components/resources/buttons/Buttons.vue';
import router from '@/router';
import {
  usePaymentDateStore,
  usePaymentStatusStore,
} from '@/stores/modules/payment';
import { formatYearMonthDate } from '@/utils/formatDate';

const props = defineProps({
  useModal: {
    type: Boolean,
    required: true,
  },
  handleModalClick: {
    type: Function,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});
const paymentDate = usePaymentDateStore();
const formatDate = formatYearMonthDate(paymentDate.year, paymentDate.month);
const paymentStatus = usePaymentStatusStore();

function navigateToUnknownList() {
  setCurrentStudentInfo();
  router.push(`/payManage/unknownList?yearMonth=${formatDate}`);
}
function navigateToManualInput() {
  setCurrentStudentInfo();
  router.push(`/payManage/manualInput?studentId=${props.id}`);
}

function setCurrentStudentInfo() {
  paymentStatus.currentUserInfo = { name: props.name, id: props.id };
}
</script>

<style scoped lang="scss">
.modal_frame_container {
  width: 100%;
  border-radius: unit(10);
  background: #fff;
  width: unit(300);
  height: unit(188);
  padding: unit(20);
}

.modal_content_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  height: 100%;
  width: 100%;
  text-align: center;
  gap: unit(20);
}
.button_container {
  display: flex;
  width: 100%;
  align-items: space-between;
  justify-content: space-between;
  gap: unit(8);
}
.text {
  font-size: unit(18);
  font-weight: 600;
  line-height: unit(25.2);
}
</style>
