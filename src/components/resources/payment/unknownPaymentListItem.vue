<template>
  <div class="list_container">
    <div
      v-for="(paymentListData, index) in paymentList"
      :key="index"
      className="list_item_container"
    >
      <div class="list_content_box" @click="handleToggle(index)">
        <div>{{ paymentListData.studentName }}</div>
        <svg-icon
          :class="isToggleOpen[index] ? 'icon-down' : 'icon'"
          name="chevronRight"
        />
      </div>
      <div v-if="isToggleOpen[index]" class="list_toggle_box">
        <div class="button" @click="handleModalClick">완납 처리</div>
        <div class="button resend" @click="handleModalClick">청구서 재발송</div>
        <unknownPaymentModal
          :id="paymentListData.studentId"
          :use-modal="useModal"
          :handle-modal-click="handleModalClick"
          :name="paymentListData.studentName"
        ></unknownPaymentModal>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import unknownPaymentModal from './unknownPaymentModal.vue';
import { formatYearMonthDate } from '@/utils/formatDate';
import { PaymentApi, PaymentData } from '@/api/PaymentApi';
import {
  usePaymentDateStore,
  usePaymentStatusStore,
} from '@/stores/modules/payment';

const useModal = ref(false);
const paymentDate = usePaymentDateStore();
const paymentStatus = usePaymentStatusStore();
const date = formatYearMonthDate(paymentDate.year, paymentDate.month);

const paymentListApi = new PaymentApi();
const paymentList = ref([
  {
    studentId: paymentStatus.currentUserInfo.id,
    studentName: paymentStatus.currentUserInfo.name,
  },
]);

const isToggleOpen = ref<boolean[]>([]);

const handleToggle = index => {
  isToggleOpen.value[index] = !isToggleOpen.value[index];
};
const fetchData = async () => {
  const res = await paymentListApi.getUnpaidStudents(date);
  if (Array.isArray(res.data)) {
    if (res.data.length === 0) {
      console.log('데이터가없습니다.');
    }
    paymentList.value = [...res.data];
  }
};

onMounted(async () => {
  await fetchData();
});

// watch(
//   () => [paymentDate.year, paymentDate.month],
//   async ([newYear, newMonth]) => {
//     date = formatYearMonthDate(newYear, newMonth);
//     await fetchData();
//   }
// );

function handleModalClick() {
  useModal.value = !useModal.value;
}
</script>

<style scoped lang="scss">
.list_container {
  display: flex;
  flex-direction: column;
  //margin: unit(16) 0;
  gap: unit(16);
  height: 100%;
}
.list_item_container {
  width: 100%;
  padding: unit(4) unit(14);
  gap: unit(4);

  font-weight: 600;
  cursor: pointer;
}

.list_content_box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.list_toggle_box {
  display: flex;
  flex-direction: row;
  gap: unit(11);
  width: 100%;
  justify-content: center;
  padding-top: unit(16);
}
.button {
  width: 100%;
  padding: unit(5) unit(30);
  //height: unit(32);
  font-size: unit(15);
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  border-radius: unit(6);
  background: #2f2f2f;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 500;
  border-radius: unit(10);
}
.resend {
  background-color: #737373;
}

.icon-down {
  transform: rotate(90deg);
}
</style>
