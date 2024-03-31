<template>
  <HomeNav />

  <div class="page-content">
    <div>
      <strong>{{ userName }}</strong
      >님,<br />반갑습니다.
    </div>
    <SendBillToast />
    <div>
      <CurrentPaymentStatus
        title="xx년 xx월 납부 현황"
        :progressPercent="60"
        :completeNum="22"
        iconImg="payment"
      />
    </div>
    <div>
      <RectangleMenuButton
        title="납부 관리"
        content="시간별 납부 내역 확인"
        iconImg="wallet"
        backColor="#EEF5FF"
      />
      <RectangleMenuButton
        title="원생 관리"
        content="시간별 납부 내역 확인"
        iconImg="chart"
        backColor="#F3F3FF"
      />
    </div>
    <div>
      <RectangleMenuButton
        title="서비스 안내"
        content="에듀빌만의 서비스"
        backColor="#F4F4F7"
      />
      <RectangleMenuButton
        title="고객센터"
        content="고객센터 안내"
        backColor="#F4F4F7"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import HomeNav from '@/components/commons/navigation/HomeNav.vue';
import SendBillToast from '@/components/molecules/SendBillToast.vue';
import RectangleMenuButton from '@/components/resources/buttons/RectangleMenuButton.vue';
import CurrentPaymentStatus from '@/components/resources/payment/CurrentPaymentStatus.vue';
import { ref } from 'vue';

// 사용자 이름
const userName = ref('이름이름(학원학원학원)');
</script>

<style lang="scss" scoped>
.page-content {
  padding: unit(20);
  // padding-top: unit(20);
  white-space: pre-wrap;

  div {
    padding-top: 1rem;
    color: #000;

    /* Title/Title Strong */
    font-size: 1.625rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 2.275rem */
  }
}
</style>
