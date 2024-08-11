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
            hasDateChanged(
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
          :is-click-detail="true"
        />
      </div>
    </div>
  </div>
  <div id="target" className="targetRef"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, onUnmounted } from 'vue';
import PaymentItem from './PaymentItem.vue';
import { PaymentApi, PaymentData } from '@/api/PaymentApi';
import { formatDate, formatYearMonthDate } from '@/utils/formatDate';
import router from '@/router';
import { intersectionObserver } from '@/utils/intersectionObserver';
import { usePaymentDateStore } from '@/stores/modules/payment';
import { hasDateChanged } from '@/utils/hasDateChanged';
const emit = defineEmits(['update:excelUploaded']);
const paymentDate = usePaymentDateStore();
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

  // 받은 데이터를 paymentData에 저장
  if (Array.isArray(res.data.content)) {
    if (res.data.content.length === 0) {
      hasMoreData.value = false;
    }
    paymentData.value = [...paymentData.value, ...res.data.content];
    page.value++;
  }
};

//무한스크롤
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

//납부 내역을 클릭하면 상세페이지로 이동
// function handlePaymentClick(id: number): any {
//   router.push(`/payManage/payDetail?id=${id}`);
// }
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
