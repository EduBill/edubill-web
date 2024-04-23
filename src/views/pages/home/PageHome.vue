<template>
  <HomeNav />

  <div class="home">
    <div class="home_title">
      <strong>{{ userName }}</strong
      >님,<br />반갑습니다.
    </div>
    <SendBillToast v-if="isPaymentDay" />
    <div>
      <CurrentPaymentStatus iconImg="payment" />
    </div>
    <div class="home_grid">
      <RectangleMenuButton
        @click="onClickPayManage"
        title="납부 관리"
        content="시간별 납부 내역 확인"
        iconName="wallet"
        backColor="#EEF5FF"
      />
      <RectangleMenuButton
        title="원생 관리"
        content="시간별 납부 내역 확인"
        iconName="chart"
        backColor="#F3F3FF"
      />
    </div>
    <div class="home_grid">
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
    <div class="home_blank">더 많은 서비스를 기대해주세요!</div>
  </div>
</template>

<script lang="ts" setup>
import HomeNav from '@/components/commons/navigation/HomeNav.vue';
import SendBillToast from '@/components/molecules/SendBillToast.vue';
import RectangleMenuButton from '@/components/resources/buttons/RectangleMenuButton.vue';
import CurrentPaymentStatus from '@/components/resources/payment/CurrentPaymentStatus.vue';
import { ref, onMounted } from 'vue';
import router from '@/router';

// 사용자 이름
const userName = ref('이름이름(학원학원학원)');

const isPaymentDay = ref(false);

onMounted(() => {
  const today = new Date();
  const day = today.getDate();
  isPaymentDay.value = day === day; // 결제일
});

async function onClickPayManage() {
  router.push({
    name: 'PayManage',
  });
}
</script>

<style lang="scss" scoped>
.home {
  padding: unit(20);
  white-space: pre-wrap;
  min-height: -webkit-fill-available;

  > div {
    margin: unit(16) unit(0);
  }

  &_title {
    padding-top: unit(16);
    color: #000;

    /* Title/Title Strong */
    font-size: unit(26);
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 2.275rem */
  }

  &_grid {
    display: grid;
    grid-template-columns: 0.8fr 0.8fr;
    grid-gap: unit(15.04);
  }

  &_blank {
    color: var(--Gray40, #bcbcbc);
    text-align: center;
    margin-top: unit(32);

    font-family: Pretendard;
    font-size: unit(14);
    font-style: normal;
    font-weight: 500;
    line-height: 130%; /* 1.1375rem */
  }
}
</style>
