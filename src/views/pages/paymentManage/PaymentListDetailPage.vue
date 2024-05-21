<template>
  <div class="container">
    <PayManageNav />
    <div class="payment_detail_container">
      <div class="amount">+{{ paymentDetailData?.paidAmount }}원</div>
      <div class="row_container">
        <div>거래유형</div>
        <div>{{ paymentDetailData?.paymentTypeDescription }}</div>
      </div>
      <div class="row_container">
        <div>메모</div>
        <div>{{ paymentDetailData?.memo }}</div>
      </div>
      <div class="row_container">
        <div>일시</div>
        <div>{{ paymentDetailData?.depositDate }}</div>
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
import { PaymentDetail, PaymentApi } from '@/api/PaymentApi';
const router = useRouter();
const id = router.currentRoute.value.query.id as string;
const paymentListApi = new PaymentApi();
const paymentDetailData = ref<PaymentDetail>();

const formatDate = originalDate => {
  const year = originalDate?.getFullYear();
  const month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
  const day = ('0' + originalDate.getDate()).slice(-2);
  const hours = ('0' + originalDate.getHours()).slice(-2);
  const minutes = ('0' + originalDate.getMinutes()).slice(-2);

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
};
const getPaymentDetail = async () => {
  const res = await paymentListApi.getPaymentDetail(id);
  console.log('응답데이터 출력', res.data);
  res.data.depositDate = formatDate(new Date(res.data.depositDate));
  paymentDetailData.value = { ...res.data };
  // console.log(paymentDetailData.value?.depositDate);
};
onMounted(async () => {
  await getPaymentDetail();
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
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
