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
import { formatYearMonthDate } from '@/utils/formatDate';

import { usePaymentDateStore } from '@/stores/modules/payment';
const paymentDate = usePaymentDateStore();

const state = reactive({
  paidCount: 0,
  unpaidCount: 0,
  uncheckedCount: 0,
  paymentPercent: 0,
});

const paymentApi = new PaymentApi();

onMounted(() => {
  // 현재 날짜로 세팅
  paymentDate.year = paymentDate.currentYear;
  paymentDate.month = paymentDate.currentMonth;
  getPaymentStatus();
});

const title = computed(() => {
  return `${paymentDate.year}년 ${paymentDate.month}월 납부 현황`;
});

async function getPaymentStatus() {
  // 현재 날짜를 YYYY-MM 형태로 만듦
  const formatDate = formatYearMonthDate(paymentDate.year, paymentDate.month);

  // 현재 날짜 전달하여 납부 현황 가져오기
  const res = await paymentApi.getPaymentStatus(formatDate);
  state.paidCount = res.data.paidCount;
  state.unpaidCount = res.data.unpaidCount;
  state.uncheckedCount = res.data.uncheckedCount;
  //console.log('납입완료: ' + state.paidCount);
  //console.log('미납입: ' + state.unpaidCount);

  // 납부 percent 계산
  const allCount = state.paidCount + state.unpaidCount;
  state.paymentPercent = Math.floor((state.paidCount / allCount) * 100);
  //console.log('납입 현황 percent' + state.paymentPercent);
}
</script>

<style lang="scss" scoped>
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
