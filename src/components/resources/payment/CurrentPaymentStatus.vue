<template>
  <div class="currentPay">
    <div class="currentPay_header">
      <p class="currentPay_title">{{ title }}</p>
      <svg-icon class="icon" name="payment" />
    </div>
    <PaymentProgressBar :percent="progressPercent" />
    <div class="currentPay_content">
      <p>총 {{ completeNum }}명이 납부를 완료했습니다.</p>
      <p>바로가기></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import PaymentProgressBar from './PaymentProgressBar.vue';
import SvgIcon from '@/plugins/svg-icon/lib/SvgIcon.vue';

interface Props {
  title: string;
  progressPercent: number;
  completeNum: number;
  iconImg: string;
}

const props = defineProps<Props>();

console.log(props.title);
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
