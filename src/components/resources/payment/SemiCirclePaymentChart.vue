<template>
  <div class="chart">
    <canvas ref="chartCanvas" class="chart_canvas"></canvas>
    <div class="chart_Label">
      <PaymentChartLabel
        ellipse-name="purpleEllipse"
        title="납입완료"
        :data-num="paymentStatusStore.paidCount"
        :amount="paymentStatusStore.totalPaidAmount"
      />
      <PaymentChartLabel
        ellipse-name="yellowEllipse"
        title="미납입"
        :data-num="paymentStatusStore.unpaidCount"
        :amount="paymentStatusStore.totalUnpaidAmount"
      />
      <PaymentChartLabel
        ellipse-name="pinkEllipse"
        title="청구서 미확인"
        :data-num="10"
        :amount="111111"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';
import PaymentChartLabel from './PaymentChartLabel.vue';

import { usePaymentStatusStore } from '@/stores/modules/payment';
const paymentStatusStore = usePaymentStatusStore();

const props = defineProps({
  unConfirmed: {
    type: Number,
    default: 10,
  },
});

const chartCanvas = ref<HTMLCanvasElement | null>(null);
const chartData = ref({
  datasets: [
    {
      label: 'Payment Status',
      // 청구서 미확인 우선 10으로 처리
      data: [
        paymentStatusStore.paidCount,
        paymentStatusStore.unpaidCount,
        props.unConfirmed,
      ],
      backgroundColor: ['#7535FF', '#FFBA33', '#ff7581'],
      borderWidth: 1,
    },
  ],
});

let myChart: Chart<'doughnut'> | null = null;

onMounted(() => {
  createChart();
});

const createChart = () => {
  if (!chartCanvas.value) {
    return;
  } else {
    console.log('chart - paidCount ' + paymentStatusStore.paidCount);
    console.log('chart - unpaidCount ' + paymentStatusStore.unpaidCount);
    console.log('chart - unConfirmed ' + props.unConfirmed);

    const ctx = chartCanvas.value.getContext('2d');
    if (ctx) {
      myChart = new Chart(ctx, {
        type: 'doughnut',
        data: chartData.value,
        options: {
          layout: {
            // canvas에서 chart의 양쪽 여백 지움
            padding: -10,
          },
          rotation: -90,
          circumference: 180,
          responsive: false,
          maintainAspectRatio: false,
          aspectRatio: 2,
          cutout: '60%',
        },
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.chart {
  &_canvas {
    width: 100% !important;
    margin-bottom: unit(16);
  }
}
</style>
