<template>
  <div class="container">
    <PayManageNav />
    <div class="payment_detail_container">
      <div class="amount">+300,000원</div>
      <div class="row_container">
        <div>거래유형</div>
        <div>계좌이체</div>
      </div>
      <div class="row_container">
        <div>메모</div>
        <div>메모 남기기</div>
      </div>
      <div class="row_container">
        <div>일시</div>
        <div>2024년 04월 13일 22:14</div>
      </div>
    </div>
    <div class="button">
      <RectangleTextButton text="확인" is-fulls="true" back-color="#7535FF" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import PayManageNav from '@/components/commons/navigation/PayManageNav.vue';
import RectangleTextButton from '@/components/resources/buttons/RectangleTextButton.vue';
import { PaymentDetail, PaymentListDetailApi } from '@/api/PaymentListApi';
const router = useRouter();
const id = router.currentRoute.value.query.id as string;
const paymentListApi = new PaymentListDetailApi();
const paymentDetailData = ref<PaymentDetail>();

const getPaymentDetail = async () => {
  const res = await paymentListApi.getPaymentDetail('12');
  console.log('응답데이터 출력', res.data);
};
onMounted(async () => {
  await getPaymentDetail();
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: relative;
  //justify-content: space-between;
}
.payment_detail_container {
  display: flex;
  flex-direction: column;
  padding: unit(38) unit(42);
  font-size: unit(15);
  font-weight: 600;
  gap: unit(18);
}
.row_container {
  display: flex;
  justify-content: space-between;
}
.amount {
  font-size: unit(26);
  font-weight: 600;
  margin: unit(14) 0;
}
.button {
  width: 100%;
  padding: 0 unit(20);
  position: absolute;
  bottom: unit(19);
}
</style>
