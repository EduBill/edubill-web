<template>
  <div class="container_currentPay">
    <div class="header_currentPay">
      <p class="title_currentPay">{{ title }}</p>
      <img class="paymentImg" src="@/assets/icons/png/payment.png" />
    </div>
    <PaymentProgressBar :percent="progressPercent" />
    <div class="content_currentPay">
      <p>총 {{ completeNum }}명이 납부를 완료했습니다.</p>
      <p>바로가기></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import PaymentProgressBar from './PaymentProgressBar.vue';

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
.container_currentPay {
  flex: 1;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.1);
  padding: 21px 16px;
}
.header_currentPay {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
  margin-bottom: 8px;
}
.title_currentPay {
  color: #19171a;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
}
.paymentImg {
  height: 25px;
}
.content_currentPay {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 9px;
}
.content_currentPay p {
  color: #9f9f9f;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
}
</style>
