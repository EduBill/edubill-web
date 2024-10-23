<template>
  <div
    :class="{
      payManage_calendarChart: true,
      blur: !paymentStatus.firstExcelUploaded,
    }"
  >
    <div class="payManage_calendarHeader">
      <PaymentCalendarHeader
        v-if="paymentDate.year != 0"
        @update:calendar-date="changeChart"
      />
    </div>
    <SemiCirclePaymentChart :key="props.chartKey" />
  </div>
</template>

<script lang="ts" setup>
import SemiCirclePaymentChart from './SemiCirclePaymentChart.vue';
import PaymentCalendarHeader from './PaymentCalendarHeader.vue';
import {
  usePaymentDateStore,
  usePaymentStatusStore,
} from '@/stores/modules/payment';
const props = defineProps({
  chartKey: {
    type: Number,
    default: 10,
  },
});

const paymentDate = usePaymentDateStore();
const paymentStatus = usePaymentStatusStore();

function changeChart({ year, month }) {
  //차트의 좌우 버튼을 클릭했을 때 paymentDate 를 변경해준다.
  paymentDate.year = year;
  paymentDate.month = month;
}
</script>

<style lang="scss" scoped>
.payManage {
  &_calendarChart {
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
.blur {
  background: rgba(217, 217, 217, 0.3);
  filter: blur(5px);
  // pointer-events: none;
}
</style>
