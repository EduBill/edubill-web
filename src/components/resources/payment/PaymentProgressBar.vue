<template>
  <div class="progressBar_container">
    <div class="progress" :style="{ width: percent + '%' }">
      <p>{{ paymentRate }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted, computed } from 'vue';

interface Props {
  percent: number;
}

const props = defineProps<Props>();

const percent = ref(0);

onMounted(() => {
  animateProgressBar();
});

const animateProgressBar = () => {
  const goalPercent = props.percent;
  let currentPercent = 0;
  const duration = 500;

  const startTime = Date.now();

  const animate = () => {
    const elapsedTime = Date.now() - startTime; // 흐른 시간
    const progress = Math.min(1, elapsedTime / duration);
    currentPercent = progress * goalPercent;
    percent.value = currentPercent;

    // 진행률이 1보다 작은 동안 애니메이션 반복
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

const paymentRate = computed(() => {
  return `${props.percent}% 납입`;
});
</script>

<style lang="scss">
.progressBar_container {
  width: 100%;
  height: 24px;
  background-color: #f4f4f7;
  border-radius: 5px;
  padding: 0 !important;
}
.progress {
  height: 24px;
  padding: 0;
  display: flex;
  justify-content: right;
  align-items: center;
  background: linear-gradient(90deg, #4600dd 0%, #7535ff 100%);
  border-radius: 5px;
  color: #ffffff;
  transition: width 0.5s ease;
  p {
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    margin-right: 10px;
    white-space: nowrap;
  }
}
</style>
