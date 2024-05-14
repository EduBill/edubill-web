<template>
  <div class="payment_container">
    <div class="date">{{ dateState.month }}월 {{ dateState.date }}일</div>
    <div v-if="paymentData.length === 0">데이터가 없습니다.</div>
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
    <div id="target" className="targetRef"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { PaymentListApi, PaymentData } from '@/api/PaymentListApi';

import router from '@/router';

const paymentListApi = new PaymentListApi();
const paymentData = ref<PaymentData[]>([]);
const dateState = reactive({
  year: '',
  month: '',
  date: '',
});

let page = 0;
let hasMoreData = true;

onMounted(async () => {
  await fetchData();
});

//api 호출
const fetchData = async () => {
  //날짜 조회
  const date = new Date();
  dateState.year = date.getFullYear().toString();
  dateState.month = (date.getMonth() + 1).toString().padStart(2, '0');
  dateState.date = date.getDate().toString().padStart(2, '0');
  const formatDate = `${dateState.year}-${dateState.month}`;
  const res = await paymentListApi.getPaymentList({
    yearMonth: '2024-04',
    page,
    size: 10,
  });

  // 받은 데이터를 paymentData에 저장
  if (Array.isArray(res.data.content)) {
    if (res.data.content.length === 0) {
      hasMoreData = false;
      page = 0;
    }
    paymentData.value = [...paymentData.value, ...res.data.content];
  }
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
.date {
  font-size: unit(14);
  font-weight: 500;
}
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
  height: 100px;
}
</style>
