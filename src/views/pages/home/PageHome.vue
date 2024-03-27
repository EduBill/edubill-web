<template>
  <HomeNav />

  <div class="page-content">

    <div>
      <strong>이름이름(학원학원학원)</strong>님,<br />반갑습니다.
    </div>
    <SendBillToast />
  
  </div>
</template>

<script lang="ts" setup>
import HomeNav from '@/components/commons/navigation/HomeNav.vue';
import SendBillToast from '@/components/molecules/SendBillToast.vue';
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
