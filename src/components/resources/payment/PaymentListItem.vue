<template>
  <div class="payment_container">
    <div v-if="!paymentStatusStore.isExcelUploaded">
      <FileUpload />
    </div>
    <div v-else>
      <div
        v-for="(paymentListData, index) in paymentData"
        :key="index"
        class="list_container"
      >
        <div
          class="list"
          @click="() => handleListClick(paymentListData.paymentHistoryId)"
        >
          <div class="row_container">
            <div>{{ paymentListData.studentName }}</div>
            <div>+{{ paymentListData.paidAmount }}</div>
          </div>
          <div class="timestamp">{{ paymentListData.paidDateTime }}</div>
        </div>
      </div>
    </div>
    <div id="target" className="targetRef"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import FileUpload from './FileUpload.vue';
import { PaymentApi, PaymentData } from '@/api/PaymentApi';
import router from '@/router';
import { useFormatDate } from '@/composable/formatDate';

import { usePaymentStatusStore } from '@/stores/modules/payment';
const paymentStatusStore = usePaymentStatusStore();

const paymentListApi = new PaymentApi();
const paymentData = ref<PaymentData[]>([]);
const props = defineProps({
  year: {
    type: Number,
    default: 0,
  },
  month: {
    type: Number,
    default: 0,
  },
});

let page = 0;
let hasMoreData = true;

onMounted(async () => {
  await fetchData();
});

//api 호출
const fetchData = async () => {
  // 전달받은 날짜를 YYYY-MM 형태로 만듦
  const date = useFormatDate(props.year, props.month);

  const res = await paymentListApi.getPaymentList({
    yearMonth: date,
    page,
    size: 12,
  });

  // 받은 데이터를 paymentData에 저장
  if (Array.isArray(res.data.content)) {
    if (res.data.content.length === 0) {
      hasMoreData = false;
      page = 0;
    }
    paymentData.value = [...paymentData.value, ...res.data.content];
  }

  console.log('액셀데이터 불러옴: ' + paymentData.value);
};

//무한스크롤
const observer = new IntersectionObserver(
  async entries => {
    if (hasMoreData && entries[0].isIntersecting) {
      page++; // 페이지 증가
      await fetchData();
    }
  },
  { root: null, rootMargin: '0px', threshold: 0.5 }
);

onMounted(() => {
  const targetElement = document.getElementById('target');
  if (targetElement) {
    observer.observe(targetElement);
  }
});

function handleListClick(id: number) {
  router.push(`/payManage/payDetail?id=${id}`);
}
</script>

<style scoped lang="scss">
.payment_container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: unit(17);
  gap: unit(4);
  margin: unit(16) 0;
}
.list_container {
  display: flex;
  flex-direction: column;
  gap: unit(4);
}
.list {
  padding: unit(16) 0;
}
.row_container {
  display: flex;
  justify-content: space-between;
  font-size: unit(18);
  font-weight: 600;
}
.timestamp {
  font-size: unit(14);
  font-weight: 500;
}
.targetRef {
  height: 10px;
}
</style>
