<template>
  <div class="chart">
    <canvas class="chart_canvas" ref="chartCanvas"></canvas>
    <div class="chart_Label">
      <PaymentChartLabel
        ellipseName="purpleEllipse"
        title="납입완료"
        :dataNum="paidCount"
        :amount="totalPaidAmount"
      />
      <PaymentChartLabel
        ellipseName="yellowEllipse"
        title="미납입"
        :dataNum="unpaidCount"
        :amount="totalUnpaidAmount"
      />
      <PaymentChartLabel
        ellipseName="pinkEllipse"
        title="청구서 미확인"
        :dataNum="10"
        :amount="111111"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';
import PaymentChartLabel from './PaymentChartLabel.vue';

const props = defineProps({
  // 은행데이터 첨부 전 도넛차트 default로 보여줘야 하므로 default에 임의의 값을 주었음.
  paidCount: {
    type: Number,
    default: 0,
  },
  unpaidCount: {
    type: Number,
    default: 0,
  },
  totalPaidAmount: {
    type: Number,
    default: 0,
  },
  totalUnpaidAmount: {
    type: Number,
    default: 0,
  },
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
      data: [props.paidCount, props.unpaidCount, props.unConfirmed],
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
  if (!chartCanvas.value) return;
  else {
    console.log('chart - paidCount ' + props.paidCount);
    console.log('chart - unpaidCount ' + props.unpaidCount);
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
