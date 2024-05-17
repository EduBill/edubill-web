<template>
  <div class="sendbill" @click="onClickSendBill">
    <div>이번 달 청구서를 발송할 때가 되었어요!</div>
    <svg-icon name="arrow_white" />
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import SvgIcon from '@/plugins/svg-icon/lib/SvgIcon.vue';

async function onClickSendBill() {
  router.push({
    name: 'Home',
  });
}
</script>

<style lang="scss" scoped>
.sendbill {
  width: 100%;
  height: unit(44);
  padding: unit(0) unit(20);
  margin-top: unit(36);

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: unit(10);
  background: var(
    --Primary-Gradient,
    linear-gradient(90deg, #4600dd 0%, #7535ff 100%)
  );

  div {
    color: #fff;
    font-size: unit(16);
    font-style: normal;
    font-weight: 600;
    line-height: unit(28); /* 175% */
  }
}
</style>
