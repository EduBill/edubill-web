<template>
  <div class="container">
    <PayManageNav
      :title="paymentStatus.currentUserInfo.name"
      :plus-btn="false"
      :click-back-btn="'PayManage'"
    />
    <div class="payment_detail_container">
      <div class="payment_info_container">
        <div class="row_container">
          <div class="category">거래유형</div>
          <div class="content">
            <input
              v-model="manualInputData.paymentTypeString"
              class="input_box"
              placeholder="메모입력(최대 20글자)"
            />
          </div>
        </div>
        <div class="row_container">
          <div class="category">거래금액</div>
          <div class="content paid_amount">
            <input
              v-model="manualInputData.paidAmount"
              class="input_box"
              placeholder="메모입력(최대 20글자)"
            />
          </div>
        </div>
        <div class="row_container">
          <div class="category">증빙서류</div>
          <div class="content paid_amount">
            <input
              id="supportingDocuments"
              class="input_box"
              type="file"
              @change="handleFileUpload"
            />
          </div>
        </div>
        <div class="row_container">
          <div class="category">메모</div>
          <div class="content paid_amount">
            <input
              v-model="manualInputData.memo"
              class="input_box"
              placeholder="메모입력(최대 20글자)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="button">
      <RectangleTextButton
        text="확인"
        is-fulls="true"
        back-color="#7535FF"
        @click="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import PayManageNav from '@/components/commons/navigation/PayManageNav.vue';
import RectangleTextButton from '@/components/resources/buttons/RectangleTextButton.vue';
import { PaymentDetail, PaymentApi } from '@/api/PaymentApi';
import { formatFullDate, formatYearMonthDate } from '@/utils/formatDate';
import {
  usePaymentDateStore,
  usePaymentStatusStore,
} from '@/stores/modules/payment';
const router = useRouter();
const paymentListApi = new PaymentApi();
const paymentDate = usePaymentDateStore();
const paymentStatus = usePaymentStatusStore();
const date = formatYearMonthDate(paymentDate.year, paymentDate.month);
const id = router.currentRoute.value.query.studentId as string;
//수납 내역 데이터를 저장하는 변수
const manualInputData = ref({
  paidAmount: '',
  paymentTypeString: '',
  memo: '',
  studentId: id,
  yearMonth: date,
});
const manualInputFormData = new FormData();

const handleFileUpload = (event: any) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  manualInputFormData.append('file', file);
};

const handleSubmit = () => {
  manualInputFormData.append(
    'paymentTypeString',
    manualInputData.value.paymentTypeString
  );
  manualInputFormData.append('paidAmount', manualInputData.value.paidAmount);
  manualInputFormData.append('memo', manualInputData.value.memo);
  manualInputFormData.append('studentId', id);
  manualInputFormData.append('yearMonth', date);

  try {
    paymentListApi.putManualInput(manualInputFormData);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  position: relative;
  padding: unit(20);
  //justify-content: space-between;
}
.payment_detail_container {
  display: flex;
  flex-direction: column;
  padding: unit(20) unit(20);
  font-size: unit(15);
  font-weight: 600;
  gap: unit(18);
}

.payment_info_container {
  display: flex;
  flex-direction: column;
  gap: unit(8);
  border-top: unit(1) solid #f1f1f1;
  border-bottom: unit(1) solid #f1f1f1;
  padding: unit(16) 0;
  font-size: 15px;
  font-weight: 400;

  .category {
    color: #737373;
  }
  .content {
    color: #000;
  }
  .paid_amount {
    color: #7535ff;
    font-weight: 600;
  }
}
.row_container {
  display: flex;
  justify-content: space-between;
}

.search_container {
  display: flex;
  justify-content: space-between;
  text-decoration: underline;
  color: #737373;
  font-weight: 400;
}

.button {
  width: 100%;
  padding: 0 unit(20);
  box-sizing: border-box;
  position: absolute;
  bottom: unit(19);
  left: 0;
}

.chevron {
  color: #737373;
}
.input_box {
  width: 100%;
  border-radius: unit(10);
  border: unit(1) solid #f1f1f1;
  padding: unit(4);
  font-size: unit(15);
  font-weight: 600;
  textarea {
    width: 100%;
  }
}
</style>
