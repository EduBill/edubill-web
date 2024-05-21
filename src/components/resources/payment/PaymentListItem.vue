<template>
  <div class="payment_container">
    <div v-if="!isExcelUploaded">
      <FileUpload @update:excel-uploaded="excelUploaded" />
    </div>
    <div v-else class="date">{{ props.year }}월 {{ props.month }}일</div>
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
import FileUpload from './FileUpload.vue';
import { PaymentListApi, PaymentData } from '@/api/PaymentListApi';

import router from '@/router';

const emit = defineEmits(['update:excelUploaded']);
const paymentListApi = new PaymentListApi();
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
  isExcelUploaded: {
    type: Boolean,
    default: false,
  },
});

let page = 0;
let hasMoreData = true;

onMounted(async () => {
  await fetchData();
});

function formatDate() {
  let formatDate = '';
  // month가 한자리 수일 경우 앞에 0 붙이기
  if (props.month < 10) {
    formatDate = `${props.year}-0${props.month}`;
  } else {
    formatDate = `${props.year}-${props.month}`;
  }
  console.log('현재 날짜' + formatDate);
  return formatDate;
}

//api 호출
const fetchData = async () => {
  // 전달받은 날짜를 YYYY-MM 형태로 만듦
  const date = formatDate();

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

function excelUploaded() {
  console.log('paymentList에 반영 - 엑셀 업로드되었습니다.');
  emit('update:excelUploaded');
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
  height: 10px;
}
</style>
