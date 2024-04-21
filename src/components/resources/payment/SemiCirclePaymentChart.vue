<template>
  <div class="chart">
    <canvas class="chart_canvas" ref="chartCanvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  paidCount: {
    type: Number,
    default: 0,
  },
  unpaidCount: {
    type: Number,
    default: 0,
  },
});

const chartCanvas = ref<HTMLCanvasElement | null>(null);
const chartData = ref({
  datasets: [
    {
      label: 'Payment Status',
      // 청구서 미확인 우선 10으로 처리
      data: [props.paidCount, props.unpaidCount, 10],
      backgroundColor: ['#7535FF', '#ff7581', '#FFBA33'],
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
