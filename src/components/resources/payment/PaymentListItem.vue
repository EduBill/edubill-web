<template>
  <div class="payment_container">
    <div v-if="paymentData.length === 0">데이터가 없습니다.</div>
    <div
      v-for="(paymentListData, index) in paymentData"
      :key="index"
      class="list_container"
    >
      <div class="list-item">
        <div v-if="index === 0" class="date">
          {{ formatDate(new Date(paymentListData.paidDateTime), 'monthDay') }}
        </div>
        <div
          v-else-if="
            index !== 0 &&
            isDifferentDate(
              paymentListData.paidDateTime,
              paymentData[index - 1].paidDateTime
            )
          "
          class="date"
        >
          {{ formatDate(new Date(paymentListData.paidDateTime), 'monthDay') }}
        </div>

        <PaymentItem
          :payment-history-id="paymentListData.paymentHistoryId"
          :student-name="paymentListData.studentName"
          :paid-amount="paymentListData.paidAmount"
          :paid-date-time="paymentListData.paidDateTime"
          :handle-click="
            () => handlePaymentClick(paymentListData.paymentHistoryId)
          "
        />
      </div>
    </div>
  </div>
  <div id="target" className="targetRef"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, onUnmounted } from 'vue';
import FileUpload from './FileUpload.vue';
import PaymentItem from './PaymentItem.vue';
import { PaymentApi, PaymentData } from '@/api/PaymentApi';
import { formatDate, formatYearMonthDate } from '@/utils/formatDate';
import router from '@/router';
import { intersectionObserver } from '@/utils/intersectionObserver';

import { useFormatDate } from '@/composable/formatDate';

import {
  usePaymentDateStore,
  usePaymentStatusStore,
} from '@/stores/modules/payment';
const emit = defineEmits(['update:excelUploaded']);
const paymentDate = usePaymentDateStore();
const paymentStatusStore = usePaymentStatusStore();

const paymentListApi = new PaymentApi();
const paymentData = ref<PaymentData[]>([]);

const page = ref(0);
const date = ref('');
const hasMoreData = ref(true);

//api 호출
const fetchData = async () => {
  // 전달받은 날짜를 YYYY-MM 형태로 만듦
  date.value = formatYearMonthDate(paymentDate.year, paymentDate.month);

  const res = await paymentListApi.getPaymentList({
    yearMonth: date.value,
    page: page.value,
    size: 6,
  });
  console.log('응답', res.data.content);

  // 받은 데이터를 paymentData에 저장
  if (Array.isArray(res.data.content)) {
    if (res.data.content.length === 0) {
      hasMoreData.value = false;
    }
    paymentData.value = [...paymentData.value, ...res.data.content];
    page.value++;
  }

  console.log('액셀데이터 불러옴: ' + paymentData.value);
};

const observer = intersectionObserver(hasMoreData, page, fetchData);

onMounted(async () => {
  await fetchData();
  const targetElement = document.getElementById('target');
  if (targetElement) {
    observer.observe(targetElement);
  }
});

onUnmounted(() => {
  observer.disconnect();
});

function excelUploaded() {
  console.log('paymentList에 반영 - 엑셀 업로드되었습니다.');
  emit('update:excelUploaded');
}

function handlePaymentClick(id: number) {
  router.push(`/payManage/payDetail?id=${id}`);
}

function isDifferentDate(
  currentDate: string,
  prevDate: string | null
): boolean {
  if (prevDate === null) {
    return false;
  }
  const current = formatDate(new Date(currentDate), 'monthDay');
  const prev = formatDate(new Date(prevDate), 'monthDay');
  if (current === prev) {
    return false;
  } else {
    return true;
  }
}
</script>

<style scoped lang="scss">
.payment_container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: unit(16);
  height: 100%;
}
.list_container {
  display: flex;
  flex-direction: column;
  gap: unit(4);
}

.targetRef {
  height: 10px;
}
.date {
  margin-bottom: unit(20);
}
</style>
