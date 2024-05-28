<template>
  <div class="currentPay">
    <div class="currentPay_header">
      <p class="currentPay_title">{{ title }}</p>
      <svg-icon class="icon" name="payment" />
    </div>
    <PaymentProgressBar :percent="state.paymentPercent" />
    <div class="currentPay_content">
      <p>총 {{ state.paidCount }}명이 납부를 완료했습니다.</p>
      <p>바로가기></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue';
import PaymentProgressBar from './PaymentProgressBar.vue';
import SvgIcon from '@/plugins/svg-icon/lib/SvgIcon.vue';
import { PaymentApi } from '@/api/PaymentApi';

const state = reactive({
  year: 0,
  month: 0,
  paidCount: 0,
  unpaidCount: 0,
  paymentPercent: 0,
});

const paymentApi = new PaymentApi();

onMounted(() => {
  getPaymentStatus();
});

const title = computed(() => {
  return `${state.year}년 ${state.month}월 납부 현황`;
});

async function getPaymentStatus() {
  // 현재 날짜 가져오기
  const date = new Date();
  state.year = date.getFullYear();
  state.month = date.getMonth() + 1;
  console.log(state.year);
  console.log(state.month);

  // 현재 날짜를 YYYY-MM 형태로 만듦
  let formatDate = '';
  // month가 한자리 수일 경우 앞에 0 붙이기
  if (state.month < 10) {
    formatDate = `${state.year}-0${state.month}`;
  } else {
    formatDate = `${state.year}-${state.month}`;
  }
  console.log(formatDate);

  // 현재 날짜 전달하여 납부 현황 가져오기
  const res = await paymentApi.getPaymentStatus(formatDate);
  state.paidCount = res.data.paidCount;
  state.unpaidCount = res.data.unpaidCount;

  // 납부 percent 계산
  const allCount = state.paidCount + state.unpaidCount;
  state.paymentPercent = Math.floor((state.paidCount / allCount) * 100);
  console.log(state.paymentPercent);
}
</script>

<style lang="scss">
.currentPay {
  flex: 1;
  background-color: #ffffff;
  border-radius: unit(10);
  box-shadow: 0 0 unit(16) 0 rgba(0, 0, 0, 0.1);
  padding: unit(21) unit(16);
  &_header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: unit(2);
    margin-bottom: unit(8);

    .icon {
      width: unit(37);
      height: unit(25);
    }
  }
  &_title {
    color: #19171a;
    font-size: unit(18);
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  }
  &_content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: unit(9);
    p {
      color: #9f9f9f;
      font-size: unit(12);
      font-style: normal;
      font-weight: 500;
      line-height: 120%;
    }
  }
}
</style>
