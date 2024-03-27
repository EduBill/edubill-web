<template>
  <HomeNav />

  <div class="page-content">

    <div>
      <strong>{{ userName }}</strong>님,<br />반갑습니다.
    </div>
    <SendBillToast />
  
  </div>
</template>

<script lang="ts" setup>
import HomeNav from '@/components/commons/navigation/HomeNav.vue';
import SendBillToast from '@/components/molecules/SendBillToast.vue';
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
