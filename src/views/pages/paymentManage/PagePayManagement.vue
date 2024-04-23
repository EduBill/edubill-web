<template>
  <div class="payManage">
    <PayManageNav />
    <div class="payManage_calendar">
      <div class="payManage_calendarHeader">
        <PaymentCalendarHeader
          v-if="state.year != 0"
          :currentYear="state.year"
          :currentMonth="state.month"
        />
      </div>
      <SemiCirclePaymentChart
        v-if="state.paidCount > 0"
        :paidCount="state.paidCount"
        :unpaidCount="state.unpaidCount"
        :totalPaidAmount="state.totalPaidAmount"
        :totalunPaidAmount="state.totalunPaidAmount"
      />
    </div>
    <!-- 수납내역/미확인내역 들어갈 자리 -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import PaymentCalendarHeader from '@/components/resources/payment/PaymentCalendarHeader.vue';
import SemiCirclePaymentChart from '@/components/resources/payment/SemiCirclePaymentChart.vue';
import SvgIcon from '@/plugins/svg-icon/lib/SvgIcon.vue';
import { PaymentApi } from '@/api/PaymentApi';
import PayManageNav from '@/components/commons/navigation/PayManageNav.vue';

const state = reactive({
  year: 0,
  month: 0,
  paidCount: 0,
  unpaidCount: 0,
  totalPaidAmount: 0,
  totalunPaidAmount: 0,
});

const paymentApi = new PaymentApi();

onMounted(() => {
  getPaymentStatus();
});

async function getPaymentStatus() {
  // 현재 날짜 가져오기
  const date = new Date();
  state.year = date.getFullYear();
  state.month = date.getMonth() + 1;

  // 현재 날짜를 YYYY-MM 형태로 만듦
  let formatDate = '';
  // month가 한자리 수일 경우 앞에 0 붙이기
  if (state.month < 10) {
    formatDate = `${state.year}-0${state.month}`;
  } else {
    formatDate = `${state.year}-${state.month}`;
  }
  console.log('현재 날짜' + formatDate);

  // 현재 날짜 전달하여 납부 현황 가져오기
  const res = await paymentApi.getPaymentStatus(formatDate);
  state.paidCount = res.data.paidCount;
  state.unpaidCount = res.data.unpaidCount;
  state.totalPaidAmount = res.data.totalPaidAmount;
  state.totalunPaidAmount = res.data.totalunPaidAmount;
  console.log('paymentManagement - 납입완료: ' + state.paidCount);
  console.log('paymentManagement - 미납입: ' + state.unpaidCount);
  console.log('paymentManagement - 납입완료 금액: ' + state.totalPaidAmount);
  console.log('paymentManagement - 미납입 금액: ' + state.totalunPaidAmount);
}
</script>

<style lang="scss" scoped>
.payManage {
  margin: unit(20);

  &_calendar {
    border-radius: 10px;
    background: var(--White, #fff);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.1);
    padding-left: unit(24);
    padding-right: unit(24);
    padding-bottom: unit(16);
    padding-top: unit(23);
    margin-top: unit(16);
  }

  &_calendarHeader {
    margin-bottom: unit(13);
  }
}
</style>
